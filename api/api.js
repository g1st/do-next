require('dotenv').config();
const express = require('express');
const slugify = require('slugify');
const { check, validationResult } = require('express-validator');
const axios = require('axios');

const Work = require('./models/works');
const Subscriber = require('./models/subscribers');
const Counter = require('./models/counters');
const sendMail = require('./mail');
const {
  extractFileNames,
  extractFileNamesFromGroup,
  formatFilesForUpload,
  getNamesOfAllSizes,
} = require('../util/helpers');
const S3 = require('../util/S3');
const { filterCollections } = require('../util/helpers');
const emailForContactForm = require('./EmailTemplates/emailForContactForm');
const createCheckoutSession = require('./routes/createCheckoutSession');
const checkoutSession = require('./routes/checkoutSession');
const webhook = require('./routes/webhook');

module.exports = (db, upload) => {
  const router = express.Router();

  const wrapAsync = (handler) => (req, res) =>
    handler(req)
      .then((result) => res.json(result))
      .catch((error) =>
        res.status(500).json({
          error: error.message,
        })
      );

  router.get(
    '/',
    wrapAsync(async function () {
      return Work.find();
    })
  );

  router.get(
    '/collections',
    wrapAsync(async function () {
      const data = await Work.find();
      return filterCollections(data, null);
    })
  );

  router.get(
    '/single',
    wrapAsync(async function (req) {
      const { slug } = req.query;

      return Work.findOne({ slug });
    })
  );

  router.delete(
    '/delete',
    wrapAsync(async function (req, res) {
      const id = req.query._id;
      const group = req.query.collection;

      // deleting single item
      if (id) {
        const works = await Work.findOneAndRemove({ _id: id });
        const imagesToRemove = extractFileNames(works.images);
        const promisesArray = imagesToRemove.map((image) =>
          S3.deleteObjectFromS3(image)
        );

        // remove images from s3
        await Promise.all(promisesArray).catch((err) =>
          console.log('Error while deleting from S3', err)
        );

        return { deletedItem: works.name };
      }

      // deleting collection
      if (group) {
        const worksToBeDeleted = await Work.find({ group });
        await Work.deleteMany({ group });
        const imagesToRemove = extractFileNamesFromGroup(worksToBeDeleted);
        const promisesArray = imagesToRemove.map((image) =>
          S3.deleteObjectFromS3(image)
        );

        // remove images from s3
        await Promise.all(promisesArray).catch((err) =>
          console.log('Error while deleting from S3', err)
        );

        return { deletedCollection: group };
      }
    })
  );

  // editing existing item
  router.patch(
    '/update',
    upload.array('photos[]', 10),
    [
      check('name').not().isEmpty().withMessage('Name is required.'),
      check('description')
        .not()
        .isEmpty()
        .withMessage('Description is required.'),
      check('price').not().isEmpty().withMessage('Price is required.'),
      check('price')
        // eslint-disable-next-line no-restricted-globals
        .custom((value) => !isNaN(value))
        .withMessage('Price is has to be a number.'),
      check('collection')
        .not()
        .isEmpty()
        .withMessage('Collection is required.'),
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
        featured,
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
        featured,
      };

      let allImagesForRemoval;
      let formattedFiles;
      let newImages;

      // user adds new images
      if (files.length > 0) {
        formattedFiles = formatFilesForUpload(files);

        const images = formattedFiles.map((image) => ({
          big: image[0].big,
          medium: image[1].medium,
          thumb: image[2].thumb,
        }));

        newImages = {
          $push: {
            images: { $each: images },
          },
        };

        const fileFilter = S3.fileFilter(formattedFiles);

        if (fileFilter) {
          return {
            error: { message: 'Wrong file type. Only JPG and PNG allowed.' },
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
            error: { images: 'Piece must have at least one image.' },
          };
        }

        //  remove image paths from DB document
        update.$pull = {
          images: {
            thumb: { $in: thumbsForRemoval },
          },
        };
      }

      // cant add and remove images in the same call to db
      if (newImages) {
        await Work.findOneAndUpdate({ _id }, newImages);
      }

      const work = await Work.findOneAndUpdate({ _id }, update, {
        new: true,
      });

      const error = work.validateSync();

      if (error) {
        console.log('error.errors :', error.errors);
        return { error: error.errors, work };
      }

      // upload images to S3
      if (formattedFiles) {
        await S3.uploadFiles(formattedFiles);
      }

      // remove images from S3
      if (allImagesForRemoval) {
        const promisesArray = allImagesForRemoval.map((image) =>
          S3.deleteObjectFromS3(image)
        );
        await Promise.all(promisesArray).catch((err) =>
          console.log('Error while deleting from S3', err)
        );
      }

      return {
        msg: 'Work has been updated',
        work,
        error,
      };
    })
  );

  router.post(
    '/update-grid',
    wrapAsync(async (req, res) => {
      const { data, index } = req.body;

      const promises = data.map((item) =>
        Work.findByIdAndUpdate(
          { _id: item._id },
          { $set: { [index]: item[index] } }
        )
      );

      await Promise.all(promises);

      return {
        msg: 'Updated',
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
        featured,
      } = req.body;

      const { files } = req;

      const formattedFiles = formatFilesForUpload(files);

      const images = formattedFiles.map((image) => ({
        big: image[0].big,
        medium: image[1].medium,
        thumb: image[2].thumb,
      }));

      const frontImage = images[0].medium;

      const getNextSequenceValue = async (sequenceName) => {
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
        featured,
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
          work,
        };
      }

      await db.collection('works').insertOne(work);

      // Upload images to an S3 bucket
      await S3.uploadFiles(formattedFiles);

      return {
        msg: 'Work has been added',
        work,
        error,
      };
    })
  );

  router.post(
    '/send',
    [
      check('email')
        .isEmail()
        .withMessage('Please enter a valid email address.'),
      check('subject').not().isEmpty().withMessage('Please provide a subject.'),
      check('message').not().isEmpty().withMessage('Please provide a message.'),
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
        contactForm,
      })
        .then(() =>
          res.json({
            msg: 'Email has been sent.',
          })
        )
        .catch((err) => res.json({ msg: err.message }));
    }
  );

  router.post('/create-checkout-session', createCheckoutSession);

  // Fetch the Checkout Session to display the JSON result on the success page
  router.get('/checkout-session', checkoutSession);

  router.post('/webhook', webhook);

  router.post(
    '/subscribe',
    wrapAsync(async function (req) {
      const { email } = req.body;
      const name = email.split('@')[0];

      const subscriber = new Subscriber({ email });

      // check if email already exists
      const existingEmail = await db
        .collection('subscribers')
        .findOne({ email: email.toLowerCase().trim() });

      if (existingEmail) {
        return {
          err: 'This email address is already subscribed.',
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
              first_name: name,
            },
          ],
          {
            headers: {
              authorization: `Bearer ${process.env.MAIL_API_PASS}`,
              'content-type': 'application/json',
            },
          }
        )
        .catch((err) => ({ err }));

      return {
        msg: 'Email has been added',
        email,
        err: error,
      };
    })
  );

  return router;
};
