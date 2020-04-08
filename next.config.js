require('dotenv').config();
const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  optimizeImagesInDev: true,
  env: {
    AUTH_URL: process.env.AUTH_URL,
    APP_URL: process.env.APP_URL,
    AWS_BUCKET: process.env.AWS_BUCKET,
    INSTAGRAM_TOKEN: process.env.INSTAGRAM_TOKEN,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  },
});
