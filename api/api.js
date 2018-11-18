const express = require('express');
const slugify = require('slugify');
const Works = require('./models/works');
const sendMail = require('./mail');
const fs = require('fs');
const { promisify } = require('util');
const asyncUnlink = promisify(fs.unlink);

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

  router.post('/update', upload.array('photos[]', 10), async (req, res) => {
    const {
      title,
      description,
      collection,
      materials,
      size,
      price,
      category,
      available
    } = req.body;

    const images = req.files.map(image => image.filename);

    const piece = {
      name: title,
      slug: slugify(title),
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
      // remove already uploaded images (not elegant but rarelly will happen irl)
      images.forEach(async image => {
        await asyncUnlink(`static/uploads/${image}`);
      });

      return res.json(error);
    }

    await db.collection('works').insertOne(work);

    res.json({ msg: 'Work has been added/updated', error });
  });

  router.post('/send', (req, res) => {
    const { email, subject, message } = req.body;

    sendMail({ email, subject, message })
      .then(() => {
        return res.json({
          msg: 'Email has been sent'
        });
      })
      .catch(err => {
        console.log(err);
        return res.json({ msg: err.message });
      });
  });

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
