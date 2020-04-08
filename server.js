const mongoose = require('mongoose');
const body = require('body-parser');
const co = require('co');
const express = require('express');
const next = require('next');
const multer = require('multer');
const cors = require('cors');
const compression = require('compression');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

const api = require('./api/api');
const getUrls = require('./util/getUrls');

const { MONGO_URL, APP_URL, AWS_BUCKET } = process.env;
const PORT = process.env.PORT || 3000;
let sitemap;

const storage = multer.memoryStorage();

const upload = multer({ storage });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// credits to http://thecodebarbarian.com/building-a-nextjs-app-with-mongodb.html
co(function* () {
  // Initialize the Next.js app
  yield app.prepare();

  console.log(`Connecting to ${MONGO_URL}`);
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  const db = yield mongoose.connection;

  // Configure express to expose a REST API
  const server = express();
  server.use(compression());
  server.use(cors());
  server.use(body.json());
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
      const smStream = new SitemapStream({ hostname: APP_URL });
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
              url: `${AWS_BUCKET}/photos/${imgObj.big}`,
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

  server.get('*', (req, res) => handle(req, res));

  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}).catch((error) => console.error(error.stack));
