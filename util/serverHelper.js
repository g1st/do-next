const sharp = require('sharp');
const fs = require('fs');
const { promisify } = require('util');

const asyncUnlink = promisify(fs.unlink);

module.exports = {
  writeFile: function writeFile(file, size) {
    // default image size
    const big = 900;
    return new Promise((resolve, reject) => {
      sharp(file)
        .resize(size, size)
        .toBuffer(async function(err, buffer) {
          const dot = file.indexOf('.');
          // overwrites original multers file
          if (size === big) {
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
  }
};
