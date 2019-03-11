// require('dotenv').config({ path: '../.env' });
const express = require('express');
const slugify = require('slugify');
const Works = require('./models/works');
const Orders = require('./models/orders');
const sendMail = require('./mail');
const { check, oneOf, validationResult } = require('express-validator/check');

require('dotenv').config();
const sendPurchaseEmail = require('./sendPurchaseEmail');
const { shippingPrice } = require('../util/globals');
const serverUtils = require('../util/serverHelper');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    wrapAsync(async function(req) {
      const works = await Works.find((err, data) => {
        if (err) return console.error(err);
      });

      return works;
    })
  );

  router.get(
    '/single',
    wrapAsync(async function(req) {
      const id = req.query.id;

      const works = await Works.findById(id, (err, data) => {
        if (err) return console.error(err);
      });
      return works;
    })
  );

  router.delete(
    '/delete',
    wrapAsync(async function(req) {
      const id = req.query.id;

      // const works = await Works.findByIdAndDelete(id, (err, data) => {
      const works = await Works.findOneAndRemove({ id }, (err, data) => {
        if (err) return console.error(err);
      });
      console.log('deleted works', works);

      return works;

      // todo: delete photos from disk
    })
  );

  router.patch('/update', upload.array('photos[]', 10), async (req, res) => {
    const imageSizes = { big: 900, medium: 300, thumb: 92 };

    const update = {
      ...req.body,
      slug: slugify(req.body.name),
      group: req.body.collection
    };

    // user adds new images
    if (req.files.length > 0) {
      const images = req.files.map(image => {
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

      update.$push = {
        images: { $each: images }
      };
    }

    if (req.body.imagesToRemove.length > 0) {
      const imagesToRemove = req.body.imagesToRemove.split(',');
      //  remove image links from DB
      update.$pull = {
        images: {
          thumb: { $in: imagesToRemove }
        }
      };

      // remove photos from disk
      serverUtils.removeImagesFromDisk(imagesToRemove);
    }

    const work = await Works.findOneAndUpdate({ _id: req.body._id }, update, {
      new: true
    });

    const error = work.validateSync();

    if (error) {
      // remove already uploaded images (not elegant but rarely will happen irl)
      if (req.files.length > 0) {
        serverUtils.removeImagesFromDisk(images);
      }

      return res.json(error);
    }

    if (req.files.length > 0) {
      let sizes = req.files.map(obj => {
        return [
          { path: obj.path, size: imageSizes.big },
          { path: obj.path, size: imageSizes.medium },
          { path: obj.path, size: imageSizes.thumb }
        ];
      });

      let files = sizes.map(photo =>
        photo.map(photo => serverUtils.writeFile(photo.path, photo.size))
      );

      Promise.all(files)
        .then(val => console.log(val))
        .catch(err => console.log(err));
    }

    res.json({
      msg: 'Work has been updated',
      work,
      error
    });
  });

  router.post('/update', upload.array('photos[]', 10), async (req, res) => {
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

    const images = req.files.map(image => {
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
      available: available == 'available'
    };

    const work = new Works(piece);

    const error = work.validateSync();

    if (error) {
      // remove already uploaded images (not elegant but rarely will happen irl
      serverUtils.removeImagesFromDisk(images);

      return res.json(error);
    }

    await db.collection('works').insertOne(work);

    let sizes = req.files.map(obj => {
      return [
        { path: obj.path, size: imageSizes.big },
        { path: obj.path, size: imageSizes.medium },
        { path: obj.path, size: imageSizes.thumb }
      ];
    });

    let files = sizes.map(photo =>
      photo.map(photo => serverUtils.writeFile(photo.path, photo.size))
    );

    Promise.all(files)
      .then(val => console.log(val))
      .catch(err => console.log(err));

    res.json({
      msg: 'Work has been added',
      work,
      error
    });
  });

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
        console.log(errors.array());
        return res.status(422).json({ errors: errors.array() });
      }

      sendMail({ email, subject, message })
        .then(() => {
          return res.json({
            msg: 'Email has been sent.'
          });
        })
        .catch(err => {
          console.log(err);
          return res.json({ msg: err.message });
        });
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
      console.log(req.body);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        // return res.status(422).json({ errors: errors.array() });
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

      if (boughtFrom == 'buyItNow') {
        const amountFromBackend = await Works.findById(
          _id,
          'price',
          (err, data) => {
            if (err) return console.error(err);
          }
        );

        amount =
          price === amountFromBackend.price
            ? amountFromBackend.price * quantity + shippingPrice
            : false;
      } else {
        // bought from cart - might be multiple
        const items = req.body.additional.purchaseDetails.selectedItems.map(
          item => {
            return {
              id: item._id,
              price: item.price
            };
          }
        );

        const pricePromises = items.map(async item => {
          const price = await Works.findById(item.id, 'price', (err, data) => {
            if (err) return console.error(err);
          });
          return price;
        });

        const backendPrices = await Promise.all(pricePromises);

        const amountFromBackend = backendPrices.reduce(
          (acc, item) => acc + item.price,
          0
        );

        // cumulative price from frontend
        const amountFromFrontEnd = items.reduce((acc, item) => {
          return acc + item.price;
        }, 0);

        amount =
          amountFromFrontEnd === amountFromBackend
            ? totalPrice + shippingPrice // totalPrice includes quantity multipliers (checked in validation)
            : false;
      }

      // if frontend price doesn't match with backend's throw an error
      if (!amount) {
        return { errors: [{ param: '_error', msg: 'Invalid amount.' }] };
      }

      try {
        let { status } = await stripe.charges.create({
          amount: amount * 100, // stripe needs cents
          currency: 'gbp',
          description: `Charge for purchase at dovilejewellery.com`,
          source: req.body.token
        });

        // send confirmation email to seller
        await sendPurchaseEmail(req.body);

        // TODO send confirmation email to buyer

        const { payload, additional } = req.body;
        // save order to db
        const order = new Orders({
          payload,
          additional
        });

        await db.collection('orders').insertOne(order);

        return status;
      } catch (err) {
        res.json({ err });
      }
    })
  );

  // router.post('/', wrapAsync(async function (req) {
  //   const book = new BookType(req.body)
  //   await db.collection('Book').insertOne(book)
  //   return { book }
  // }))

  // router.delete('/:id', wrapAsync(async function (req) {
  //   const { result } = await db.collection('Book').deleteOne({
  //     _id: Archetype.to(req.params.id, ObjectId)
  //   })
  //   return { result }
  // }))

  return router;
};
