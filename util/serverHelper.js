const sharp = require('sharp');
const fs = require('fs');

module.exports = function writeFile(file, size) {
  // default image size
  const resized = 900;
  return new Promise((resolve, reject) => {
    sharp(file)
      .resize(size, size)
      .toBuffer(async function(err, buffer) {
        const dot = file.indexOf('.');
        // overwrites original multers file
        if (size === resized) {
          size = '';
        }
        fs.writeFile(
          file.substring(0, dot) + size + file.substring(dot),
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
};
