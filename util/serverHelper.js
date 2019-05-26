const sharp = require('sharp');
const fs = require('fs');
const { promisify } = require('util');

const {
  europeCountries,
  shippingPriceGB,
  shippingPriceEU,
  shippingPriceWorldwide
} = require('./globals');

const asyncUnlink = promisify(fs.unlink);

module.exports = {
  writeFile: function writeFile(file, size) {
    // default image size
    const big = 900;
    let sizeString = size;
    return new Promise((resolve, reject) => {
      sharp(file)
        .jpeg({ quality: 90, progressive: true })
        .resize(sizeString, sizeString)
        .toBuffer(async function(err, buffer) {
          const dot = file.indexOf('.');
          // overwrites original multers file
          if (sizeString === big) {
            // may be clearer to change to value of big
            sizeString = '';
          }
          fs.writeFile(
            file.substring(0, dot) + sizeString + file.substring(dot),
            buffer,
            err => {
              if (err) {
                reject(err);
              } else {
                resolve(file);
                console.log('file saved, size: ', size);
              }
            }
          );
        });
    });
  },
  removeImagesFromDisk: function removeImagesFromDisk(imagesToRemove) {
    imagesToRemove.forEach(async image => {
      // image comes as a thumb ...92.jpg
      // removes thumb image
      await asyncUnlink(`static/uploads/${image}`);
      // removes medium image 300x300
      await asyncUnlink(
        `static/uploads/${image.replace(/92(\.\w+)/, '300$1')}`
      );
      // removes big image 900x900, which will not have '92' in its file name
      await asyncUnlink(`static/uploads/${image.replace(/92(\.\w+)/, '$1')}`);
    });
  },
  postageForCountry: function postageForCountry(country) {
    if (country === 'GB') {
      return shippingPriceGB;
    }
    if (europeCountries.includes(country)) {
      return shippingPriceEU;
    }
    return shippingPriceWorldwide;
  }
};
