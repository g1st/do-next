require('dotenv').config();
const express = require('express');
const slugify = require('slugify');
const { check, oneOf, validationResult } = require('express-validator/check');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');

const Work = require('./models/works');
const Order = require('./models/orders');
const Client = require('./models/clients');
const sendMail = require('./mail');
const sendPurchaseEmail = require('./sendPurchaseEmail');
const { shippingPrice } = require('../util/globals');
const serverUtils = require('../util/serverHelper');

module.exports = (db, upload) => {
  const router = express.Router();

  const wrapAsync = handler => (req, res) =>
    handler(req)
      .then(result => res.json(result))
      .catch(error =>
        res.status(500).json({
          error: error.message
        })
      );

  router.get(
    '/',
    wrapAsync(async function() {
      return Work.find();
    })
  );

  router.get(
    '/single',
    wrapAsync(async function(req) {
      const { id } = req.query;

      return Work.findById(id);
    })
  );

  router.delete(
    '/delete',
    wrapAsync(async function(req, res) {
      const id = req.query._id;
      const group = req.query.collection;
      // deleting single item
      if (id) {
        const works = await Work.findOneAndRemove({ _id: id });

        // removeImagesFromDisk needs thumb as starter
        const imagesToRemove = works.images.map(img => img.thumb);
        // remove photos from disk
        serverUtils.removeImagesFromDisk(imagesToRemove);

        return { deletedItem: works.name };
      }
      // deleting collection
      if (group) {
        const worksToBeDeleted = await Work.find({ group });

        // delete in db
        await Work.deleteMany({ group });

        // removeImagesFromDisk needs thumb as starter
        const imagesToRemove = worksToBeDeleted.reduce((acc, currObj) => {
          const thumbArray = currObj.images.map(img => img.thumb);
          return acc.concat(thumbArray);
        }, []);

        // remove photos from disk
        serverUtils.removeImagesFromDisk(imagesToRemove);

        return { deletedCollection: group };
      }
    })
  );

  // editing existing item
  router.patch(
    '/update',
    upload.array('photos[]', 10),
    wrapAsync(async (req, res) => {
      const imageSizes = { big: 900, medium: 300, thumb: 92 };

      const {
        _id,
        name,
        description,
        materials,
        size,
        collection,
        price,
        category,
        available,
        imageCount,
        imagesToRemove,
        frontImage
      } = req.body;

      const { files } = req;

      const update = {
        name,
        description,
        materials,
        size,
        price,
        category,
        available,
        slug: slugify(name),
        group: collection,
        frontImage
      };

      let imagesToRemoveOnError;

      // user adds new images
      if (files.length > 0) {
        const images = files.map(image => {
          const dot = image.filename.indexOf('.');

          return {
            big: image.filename,
            medium:
              image.filename.substring(0, dot) +
              imageSizes.medium +
              image.filename.substring(dot),
            thumb:
              image.filename.substring(0, dot) +
              imageSizes.thumb +
              image.filename.substring(dot)
          };
        });

        const newImages = {
          $push: {
            images: { $each: images }
          }
        };

        await Work.findOneAndUpdate({ _id }, newImages, {
          new: true
        });

        imagesToRemoveOnError = images.map(image => image.thumb);
      }

      if (imagesToRemove.length > 0) {
        const imagesForRemoval = imagesToRemove.split(',');

        // current images + how many adding - how many deleting
        if (Number(imageCount) + files.length - imagesForRemoval.length < 1) {
          return {
            errors: { images: 'Piece must have at least one image.' }
          };
        }

        //  remove image paths from DB document
        update.$pull = {
          images: {
            thumb: { $in: imagesForRemoval }
          }
        };

        // remove images from disk
        serverUtils.removeImagesFromDisk(imagesForRemoval);
      }

      const work = await Work.findOneAndUpdate({ _id }, update, {
        new: true
      });

      const error = work.validateSync();

      if (error) {
        // remove already uploaded images (not elegant but rarely will happen irl)
        if (files.length > 0) {
          serverUtils.removeImagesFromDisk(imagesToRemoveOnError);
        }

        return error;
      }

      if (files.length > 0) {
        const sizes = files.map(obj => [
          { path: obj.path, size: imageSizes.big },
          { path: obj.path, size: imageSizes.medium },
          { path: obj.path, size: imageSizes.thumb }
        ]);

        const filesToSave = sizes.map(photos =>
          photos.map(photo => serverUtils.writeFile(photo.path, photo.size))
        );

        Promise.all(filesToSave)
          .then(val => console.log(val))
          .catch(err => console.log(err));
      }

      return {
        msg: 'Work has been updated',
        work,
        error
      };
    })
  );

  // creating new item
  router.post(
    '/update',
    upload.array('photos[]', 10),
    wrapAsync(async (req, res) => {
      // squared shape for better gallery experience
      const imageSizes = { big: 900, medium: 300, thumb: 92 };

      const {
        name,
        description,
        collection,
        materials,
        size,
        price,
        category,
        available
      } = req.body;

      const { files } = req;

      const images = files.map(image => {
        const dot = image.filename.indexOf('.');

        return {
          big: image.filename,
          medium:
            image.filename.substring(0, dot) +
            imageSizes.medium +
            image.filename.substring(dot),
          thumb:
            image.filename.substring(0, dot) +
            imageSizes.thumb +
            image.filename.substring(dot)
        };
      });

      const piece = {
        name,
        slug: slugify(name),
        description,
        materials,
        group: collection,
        category,
        images,
        size,
        price,
        available: available === 'available'
      };

      const work = new Work(piece);

      const error = work.validateSync();

      if (error) {
        // pass just thumb of every photo
        const imagesToRemoveOnError = images.map(image => image.thumb);

        // remove already uploaded images (not elegant but rarely will happen irl
        serverUtils.removeImagesFromDisk(imagesToRemoveOnError);

        return res.json(error);
      }

      await db.collection('works').insertOne(work);

      const sizes = files.map(obj => [
        { path: obj.path, size: imageSizes.big },
        { path: obj.path, size: imageSizes.medium },
        { path: obj.path, size: imageSizes.thumb }
      ]);

      const filesToSave = sizes.map(photos =>
        photos.map(photo => serverUtils.writeFile(photo.path, photo.size))
      );

      Promise.all(filesToSave)
        .then(val => console.log(val))
        .catch(err => console.log(err));

      return {
        msg: 'Work has been added',
        work,
        error
      };
    })
  );

  router.post(
    '/send',
    [
      check('email')
        .isEmail()
        .withMessage('Please enter a valid email address.'),
      check('subject')
        .not()
        .isEmpty()
        .withMessage('Please provide a subject.'),
      check('message')
        .not()
        .isEmpty()
        .withMessage('Please provide a message.')
    ],
    (req, res) => {
      const { email, subject, message } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // console.log(errors.array());
        return res.status(422).json({ errors: errors.array() });
      }
      if (process.env.NODE_ENV === 'production') {
        sendMail({ email, subject, message })
          .then(() =>
            res.json({
              msg: 'Email has been sent.'
            })
          )
          .catch(err => {
            console.log(err);
            return res.json({ msg: err.message });
          });
      } else {
        console.log('(fake) email (not) sent');
        return res.json({ msg: '(fake) Email (not) sent' });
      }
    }
  );

  router.post(
    '/charge',
    [
      oneOf(
        [
          [
            check('additional.purchaseDetails.available')
              .not()
              .exists(),
            check('additional.purchaseDetails.selectedItems.*.available')
              .isBoolean()
              .equals('true')
          ],
          [
            check('additional.purchaseDetails.available')
              .isBoolean()
              .equals('true'),
            check('additional.purchaseDetails.selectedItems.*.available')
              .not()
              .exists()
          ]
        ],
        'Sorry, item is not available.'
      ),
      oneOf(
        [
          [
            check('additional.purchaseDetails.quantity')
              .not()
              .exists(),
            check('additional.purchaseDetails.selectedItems.*.quantity').isInt({
              min: 1
            })
          ],
          [
            check('additional.purchaseDetails.quantity').isInt({ min: 1 }),
            check('additional.purchaseDetails.selectedItems.*.quantity')
              .not()
              .exists()
          ]
        ],
        'The quantity is invalid.'
      ),
      check('additional.first_name')
        .not()
        .isEmpty()
        .withMessage('First name is required.'),
      check('additional.last_name')
        .not()
        .isEmpty()
        .withMessage('Last name is required.'),
      check('additional.email')
        .isEmail()
        .withMessage('Please enter a valid Email address.'),
      check('additional.address1')
        .not()
        .isEmpty()
        .withMessage('Address field is required.'),
      check('additional.city')
        .not()
        .isEmpty()
        .withMessage('City is required.'),
      check('additional.country')
        .not()
        .isEmpty()
        .withMessage('Country is required.'),
      check('additional.purchaseDetails.shippingCost')
        .isFloat({ min: 0 })
        .equals(shippingPrice.toString()) // same as backend
        .withMessage('Shipping cost must be a positive number.')
    ],
    wrapAsync(async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // console.log(errors.array());
        return { errors: errors.array() };
      }

      const {
        totalPrice,
        boughtFrom,
        price,
        _id,
        quantity
      } = req.body.additional.purchaseDetails;

      let amount;

      if (boughtFrom === 'buyItNow') {
        const amountFromBackend = await Work.findById(_id, 'price');

        amount =
          price === amountFromBackend.price
            ? amountFromBackend.price * quantity + shippingPrice
            : false;
      } else {
        // bought from cart - might be multiple
        const items = req.body.additional.purchaseDetails.selectedItems.map(
          item => ({
            id: item._id,
            price: item.price
          })
        );

        const pricePromises = items.map(async item =>
          Work.findById(item.id, 'price')
        );

        const backendPrices = await Promise.all(pricePromises);

        const amountFromBackend = backendPrices.reduce(
          (acc, item) => acc + item.price,
          0
        );

        // cumulative price from frontend
        const amountFromFrontEnd = items.reduce(
          (acc, item) => acc + item.price,
          0
        );

        amount =
          amountFromFrontEnd === amountFromBackend
            ? totalPrice + shippingPrice // totalPrice includes quantity multipliers (checked in validation)
            : false;
      }

      // if frontend price doesn't match with backend's throw an error
      if (!amount) {
        return { errors: [{ param: '_error', msg: 'Invalid amount.' }] };
      }

      /* eslint-disable camelcase */
      let stripe_result;
      if (process.env.NODE_ENV === 'production') {
        stripe_result = await stripe.charges.create({
          amount: amount * 100, // stripe needs cents
          currency: 'gbp',
          description: `Charge for purchase at dovilejewellery.com`,
          source: req.body.token
        });
      } else {
        stripe_result = {
          status: 200,
          id: `paymentId${Date.now()}`,
          amount: amount * 100,
          source: `sourceToken${Date.now()}`,
          receipt_url: `receipt_url_${Date.now()}`
        };
      }
      const {
        status,
        id,
        amount: amount_paid,
        source,
        receipt_url
      } = stripe_result;

      // send confirmation email to seller and buyer
      await sendPurchaseEmail(req.body);

      const { client_ip } = req.body.payload.token;
      const {
        email,
        first_name,
        last_name,
        phone,
        address1,
        address2,
        city,
        additional_info,
        country,
        purchaseDetails
      } = req.body.additional;
      /* eslint-enable camelcase */

      let client;

      // check if client already exists
      client = await db
        .collection('clients')
        .findOne({ email: email.toLowerCase().trim() });

      // client exists
      if (client) {
        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          transaction_id: id,
          receipt_url,
          amount_paid,
          source,
          purchaseDetails,
          additional_info,
          client: client._id
        });

        await db.collection('orders').insertOne(order);

        await Client.findOneAndUpdate(
          { _id: client._id },
          { $push: { orders: order._id } }
        );
      } else {
        // new client
        const orderId = mongoose.Types.ObjectId();

        client = new Client({
          _id: mongoose.Types.ObjectId(),
          first_name,
          last_name,
          email,
          phone,
          address: {
            address1,
            address2,
            city,
            country,
            client_ip
          },
          orders: [orderId]
        });

        const order = new Order({
          _id: orderId,
          transaction_id: id,
          receipt_url,
          amount_paid,
          source,
          purchaseDetails,
          additional_info,
          client: client._id
        });

        await db.collection('orders').insertOne(order);
        await db.collection('clients').insertOne(client);
      }

      return status;
    })
  );

  return router;
};
