const mongoose = require('mongoose');
const body = require('body-parser');
const express = require('express');
const next = require('next');
const multer = require('multer');
const cors = require('cors');
const compression = require('compression');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

const api = require('./api/api');
const getUrls = require('./util/getUrls');

const { MONGO_URL } = process.env;
const PORT = process.env.PORT || 3000;
let sitemap;

const storage = multer.memoryStorage();

const upload = multer({ storage });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(async () => {
    console.log(`Connecting to ${MONGO_URL}`);
    const { connection: db } = await mongoose
      .connect(MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .catch((err) => console.log('err', err));

    const server = express();

    server.use(compression());
    server.use(cors());
    server.use(
      body.json({
        verify(req, res, buf) {
          if (req.originalUrl.startsWith('/api/webhook')) {
            req.rawBody = buf.toString();
          }
        },
      })
    );
    server.use((req, res, next) => {
      // Also expose the MongoDB database handle so Next.js can access it.
      req.db = db;
      next();
    });
    server.use('/api', api(db, upload));

    // make clean URL's possible from server
    server.get('/piece/:slug', (req, res) => {
      const actualPage = '/piece';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/piece', (req, res) => {
      const actualPage = '/gallery';
      app.render(req, res, actualPage);
    });

    server.get('/edit/:slug', (req, res) => {
      const actualPage = '/edit';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/gallery/:collection', (req, res) => {
      const actualPage = '/gallery';
      const queryParams = { collection: req.params.collection.toLowerCase() };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/robots.txt', (req, res) => {
      res.status(200).sendFile('robots.txt', {
        root: `${__dirname}/public/`,
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        },
      });
    });

    server.get('/sitemap.xml', async (req, res) => {
      res.header('Content-Type', 'application/xml');
      res.header('Content-Encoding', 'gzip');
      // if we have a cached entry send it
      if (sitemap) {
        res.send(sitemap);
        return;
      }
      try {
        const smStream = new SitemapStream({
          hostname: process.env.NEXT_PUBLIC_APP_URL,
        });
        const pipeline = smStream.pipe(createGzip());

        const urls = await getUrls();

        for (const obj of Object.values(urls)) {
          const { page, lastModified } = obj;
          if (Object.prototype.hasOwnProperty.call(obj, 'images')) {
            const { caption, title, images } = obj;
            smStream.write({
              url: page,
              lastmod: lastModified,
              img: images.map((imgObj) => ({
                url: `${process.env.NEXT_PUBLIC_AWS_BUCKET}/photos/${imgObj.big}`,
                caption,
                title,
                license: 'https://creativecommons.org/licenses/by/4.0/',
              })),
            });
          } else {
            smStream.write({ url: page, lastmod: lastModified }); // changefreq: 'weekly',  priority: 0.5
          }
        }
        smStream.end();

        // cache the response
        streamToPromise(pipeline).then((sm) => (sitemap = sm));
        // stream the response
        pipeline.pipe(res).on('error', (e) => {
          throw e;
        });
      } catch (e) {
        console.error(e);
        res.status(500).end();
      }
    });

    server.get(['/favicon.ico', '*/static/images/*'], (req, res) => {
      res.setHeader('Cache-Control', 'public,max-age=31536000,immutable');
      return handle(req, res);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
