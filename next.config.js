const withOptimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins(
  [
    [
      withOptimizedImages,
      {
        optimizeImagesInDev: true,
      },
    ],
  ],
  {
    images: {
      disableStaticImages: true,
    },
  }
);
