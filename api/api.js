require('dotenv').config();
const express = require('express');
const slugify = require('slugify');
const { check, oneOf, validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const axios = require('axios');

const Work = require('./models/works');
const Order = require('./models/orders');
const Client = require('./models/clients');
const Subscriber = require('./models/subscribers');
const Counter = require('./models/counters');
const sendMail = require('./mail');
const sendPurchaseEmail = require('./sendPurchaseEmail');
const serverUtils = require('../util/serverHelper');
const {
  extractFileNames,
  extractFileNamesFromGroup,
  formatFilesForUpload,
  getNamesOfAllSizes
} = require('../util/helpers');
const S3 = require('../util/S3');
const { filterCollections } = require('../util/helpers');
const { generatePaymentResponse, modifyFileName } = require('../util/helpers');
const emailForContactForm = require('./EmailTemplates/emailForContactForm');
const { promoCodes, findDiscountMultiplier } = require('../util/promoCodes');

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
    '/collections',
    wrapAsync(async function() {
      const data = await Work.find();
      return filterCollections(data, null);
    })
  );

  router.get(
    '/single',
    wrapAsync(async function(req) {
      const { slug } = req.query;

      return Work.findOne({ slug });
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
        const imagesToRemove = extractFileNames(works.images);
        imagesToRemove.forEach(image => S3.deleteObjectFromS3(image));

        return { deletedItem: works.name };
      }

      // deleting collection
      if (group) {
        const worksToBeDeleted = await Work.find({ group });
        await Work.deleteMany({ group });
        const imagesToRemove = extractFileNamesFromGroup(worksToBeDeleted);
        imagesToRemove.forEach(image => S3.deleteObjectFromS3(image));

        return { deletedCollection: group };
      }
    })
  );

  // editing existing item
  router.patch(
    '/update',
    upload.array('photos[]', 10),
    [
      check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required.'),
      check('description')
        .not()
        .isEmpty()
        .withMessage('Description is required.'),
      check('price')
        .not()
        .isEmpty()
        .withMessage('Price is required.'),
      check('price')
        // eslint-disable-next-line no-restricted-globals
        .custom(value => !isNaN(value))
        .withMessage('Price is has to be a number.'),
      check('collection')
        .not()
        .isEmpty()
        .withMessage('Collection is required.')
    ],
    wrapAsync(async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const equalizeErrors = errors.array().reduce((acc, err) => {
          acc[err.param] = { message: err.msg };
          return acc;
        }, {});

        return { error: equalizeErrors };
      }

      const {
        _id,
        name,
        description,
        materials,
        size,
        weight,
        collection,
        price,
        category,
        available,
        imageCount,
        imagesToRemove,
        frontImage,
        madeToOrder,
        display,
        oneOfAKind,
        silverFinish,
        producingTime,
        featured
      } = req.body;

      const { files } = req;

      const update = {
        name,
        description,
        materials,
        size,
        weight,
        price,
        category,
        available,
        slug: slugify(name),
        group: slugify(collection),
        frontImage,
        madeToOrder,
        display,
        oneOfAKind,
        silverFinish,
        producingTime,
        featured
      };

      let allImagesForRemoval;
      let formattedFiles;
      let newImages;

      // user adds new images
      if (files.length > 0) {
        formattedFiles = formatFilesForUpload(files);

        const images = formattedFiles.map(image => ({
          big: image[0].big,
          medium: image[1].medium,
          thumb: image[2].thumb
        }));

        newImages = {
          $push: {
            images: { $each: images }
          }
        };

        const fileFilter = S3.fileFilter(formattedFiles);

        if (fileFilter) {
          return {
            error: { message: 'Wrong file type. Only JPG and PNG allowed.' }
          };
        }
      }

      // there are images to remove
      if (imagesToRemove.length > 0) {
        const thumbsForRemoval = imagesToRemove.split(',');
        allImagesForRemoval = getNamesOfAllSizes(thumbsForRemoval);

        // current images + how many adding - how many deleting
        if (Number(imageCount) + files.length - thumbsForRemoval.length < 1) {
          return {
            error: { images: 'Piece must have at least one image.' }
          };
        }

        //  remove image paths from DB document
        update.$pull = {
          images: {
            thumb: { $in: thumbsForRemoval }
          }
        };
      }

      // cant add and remove images in the same call to db
      if (newImages) {
        await Work.findOneAndUpdate({ _id }, newImages);
      }

      const work = await Work.findOneAndUpdate({ _id }, update, {
        new: true
      });

      const error = work.validateSync();

      if (error) {
        console.log('error.errors :', error.errors);
        return { error: error.errors, work };
      }

      // upload images to S3
      if (formattedFiles) {
        formattedFiles.map(photos =>
          photos.map(photo =>
            S3.writeFileToS3(
              photo.path,
              photo.dimensions,
              photo.buffer,
              photo.mimetype
            )
          )
        );
      }

      // remove images from S3
      if (allImagesForRemoval) {
        allImagesForRemoval.forEach(image => S3.deleteObjectFromS3(image));
      }

      return {
        msg: 'Work has been updated',
        work,
        error
      };
    })
  );

  router.post(
    '/update-grid',
    wrapAsync(async (req, res) => {
      const { data, index } = req.body;

      const promises = data.map(item =>
        Work.findByIdAndUpdate(
          { _id: item._id },
          { $set: { [index]: item[index] } }
        )
      );

      await Promise.all(promises);

      return {
        msg: 'Updated'
      };
    })
  );

  // creating new item
  router.post(
    '/update',
    upload.array('photos[]', 10),
    wrapAsync(async (req, res) => {
      const {
        name,
        description,
        collection,
        materials,
        size,
        weight,
        price,
        category,
        available,
        madeToOrder,
        display,
        oneOfAKind,
        silverFinish,
        producingTime,
        featured
      } = req.body;

      const { files } = req;

      const formattedFiles = formatFilesForUpload(files);

      const images = formattedFiles.map(image => ({
        big: image[0].big,
        medium: image[1].medium,
        thumb: image[2].thumb
      }));

      const frontImage = images[0].medium;

      const getNextSequenceValue = async sequenceName => {
        const sequenceDocument = await Counter.findOneAndUpdate(
          { sequence_name: sequenceName },
          { $inc: { sequence_value: 1 } },
          { new: true }
        );

        return Number(sequenceDocument.sequence_value);
      };

      const galleryIndex = await getNextSequenceValue('galleryIndex');

      const piece = {
        name,
        slug: slugify(name),
        description,
        materials,
        group: slugify(collection),
        category,
        images,
        size,
        weight,
        price,
        available: available === 'available',
        frontImage,
        madeToOrder,
        display,
        oneOfAKind,
        silverFinish,
        producingTime,
        galleryIndex,
        collectionIndex: galleryIndex,
        featured
      };

      const work = new Work(piece);

      const error = work.validateSync();

      if (error) {
        return { error: error.errors, work };
      }

      const fileFilter = S3.fileFilter(formattedFiles);

      if (fileFilter) {
        return {
          error: { message: 'Wrong file type. Only JPG and PNG allowed.' },
          work
        };
      }

      await db.collection('works').insertOne(work);

      // const filesToSave = formattedFiles.map(photos =>
      //   photos.map(photo =>
      //     S3.writeFileToS3(
      //       photo.path,
      //       photo.dimensions,
      //       photo.buffer,
      //       photo.mimetype
      //     )
      //   )
      // );

      console.log('started');
      // Upload a list of files to an S3 bucket
      // await S3.putBatch(formattedFiles);
      await S3.putBatch(formattedFiles);

      console.log('finished');

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
      const { email, subject, message, contactForm } = req.body;

      const htmlMessage = contactForm
        ? emailForContactForm(message, email, subject)
        : null;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      sendMail({
        email,
        subject,
        message: htmlMessage || message,
        contactForm
      })
        .then(() =>
          res.json({
            msg: 'Email has been sent.'
          })
        )
        .catch(err => res.json({ msg: err.message }));
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
      check('additional.postal_code')
        .not()
        .isEmpty()
        .withMessage('Postal / ZIP code is required.')
    ],
    wrapAsync(async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return { errors: errors.array() };
      }

      const {
        totalPrice,
        boughtFrom,
        price,
        _id,
        quantity,
        promo
      } = req.body.additional.purchaseDetails;

      const { country: countryISO } = req.body.additional;
      const shippingPrice = serverUtils.postageForCountry(countryISO);

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

      if (promo.code) {
        const discountMultiplier = findDiscountMultiplier(promo.code);
        amount = Number((amount * discountMultiplier).toFixed(2));
      }

      // if frontend price doesn't match with backend's throw an error
      if (!amount) {
        return { errors: [{ param: '_error', msg: 'Invalid amount.' }] };
      }

      /* eslint-disable camelcase */
      let intent;
      if (req.body.payment_method_id) {
        intent = await stripe.paymentIntents.create({
          amount: amount * 100, // stripe needs cents
          currency: 'gbp',
          description: `Purchase at dovilejewellery.com`,
          payment_method: req.body.payment_method_id,
          confirmation_method: 'manual',
          confirm: true
        });
      } else if (req.body.payment_intent_id) {
        intent = await stripe.paymentIntents.confirm(
          req.body.payment_intent_id
        );
      }

      const paymentStatus = generatePaymentResponse(intent);
      paymentStatus.additional = { ...req.body.additional };

      if (paymentStatus.success === true) {
        if (process.env.NODE_ENV === 'production') {
          // send confirmation email to seller and buyer
          await sendPurchaseEmail(req.body);
        }
        const [
          { id, amount: amount_paid, receipt_url, payment_method: source }
        ] = intent.charges.data;

        if (boughtFrom === 'buyItNow') {
          const { madeToOrder } = req.body.additional.purchaseDetails;
          if (madeToOrder === false) {
            await Work.findByIdAndUpdate(
              { _id },
              { $set: { available: false } }
            );
          }
        } else {
          // bought from cart - might be multiple
          const ids = req.body.additional.purchaseDetails.selectedItems
            .filter(item => item.madeToOrder === false)
            .map(item => ({
              id: item._id
            }));

          const promises = ids.map(item =>
            Work.findByIdAndUpdate(
              { _id: item.id },
              { $set: { available: false } }
            )
          );

          await Promise.all(promises);
        }

        const {
          email,
          first_name,
          last_name,
          phone,
          address1,
          address2,
          city,
          additional_info,
          full_country_name,
          postal_code,
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
              country: full_country_name,
              postal_code
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
      }

      return paymentStatus;
    })
  );

  router.post(
    '/subscribe',
    wrapAsync(async function(req) {
      const { email } = req.body;
      const name = email.split('@')[0];

      const subscriber = new Subscriber({ email });

      // check if email already exists
      const existingEmail = await db
        .collection('subscribers')
        .findOne({ email: email.toLowerCase().trim() });

      if (existingEmail) {
        return {
          err: 'This email address is already subscribed.'
        };
      }

      const error = subscriber.validateSync();

      if (error) {
        return { err: error };
      }

      await db.collection('subscribers').insertOne(subscriber);

      axios
        .post(
          'https://api.sendgrid.com/v3/contactdb/recipients',
          [
            {
              email,
              first_name: name
            }
          ],
          {
            headers: {
              authorization: `Bearer ${process.env.MAIL_API_PASS}`,
              'content-type': 'application/json'
            }
          }
        )
        .catch(err => ({ err }));

      return {
        msg: 'Email has been added',
        email,
        err: error
      };
    })
  );

  router.get(
    '/promo',
    wrapAsync(async function(req, res) {
      const { code } = req.query;
      if (promoCodes.some(x => x.code === code)) {
        return { validCode: true };
      }
      return { validCode: false };
    })
  );

  return router;
};
