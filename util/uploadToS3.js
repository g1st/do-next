const sharp = require('sharp');
const aws = require('aws-sdk');

// Set the region
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-2'
});

// Create S3 service object
const s3 = new aws.S3();
// const s3 = new aws.S3({apiVersion: '2006-03-01'});

// todo add this
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
//   }
// };

const writeFileToS3 = (fileName, size, file) => {
  let quality = 80;
  if (size === 300) {
    quality = 100;
  }
  if (size === 900) {
    quality = 90;
  }
  console.log('fileName :', fileName);
  return new Promise((resolve, reject) => {
    console.log('inside writeFileToS3, before sharp');
    sharp(file)
      .jpeg({ quality, progressive: true })
      .resize(size, size)
      .toBuffer(async function(err, buffer) {
        console.log('buffer inside sharp :', buffer);
        if (err) throw err;
        s3.putObject(
          {
            Bucket: 'dovileko',
            Key: fileName,
            Body: buffer
          },
          function(err, data) {
            console.log('inside s3.putObject');
            console.log('data :', data);
            if (err) {
              console.log(`Failed to resize image due to an error: ${err}`);
              reject(err);
            }
            console.log(`s3 image uploaded to /${fileName}`);
            resolve(data);
          }
        );
      });
  });
};

module.exports = writeFileToS3;
