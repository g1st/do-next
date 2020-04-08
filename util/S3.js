const sharp = require('sharp');
const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-2',
});

const s3 = new aws.S3();

exports.fileFilter = (filesArray) =>
  // returns true when there are at least one wrong mimetype
  filesArray.some((arr) =>
    arr.some(
      ({ mimetype }) => mimetype !== 'image/jpeg' && mimetype !== 'image/png'
    )
  );

exports.uploadFiles = (files) => {
  const promisesArray = files.reduce((acc, photosArray) => {
    const result = photosArray.map(({ path, dimensions, buffer, mimetype }) => {
      let quality = 80;
      if (dimensions === 300) {
        quality = 100;
      }
      if (dimensions === 900) {
        quality = 90;
      }
      return sharp(buffer)
        .jpeg({ quality, progressive: true })
        .resize(dimensions, dimensions)
        .toBuffer()
        .then((data) =>
          s3
            .putObject({
              Bucket: 'dovileko',
              Key: `photos/${path}`,
              ContentType: mimetype,
              Body: data,
              ACL: 'public-read',
              ServerSideEncryption: 'AES256',
            })
            .promise()
        )
        .catch((err) => console.log('Sharp error while processing image', err));
    });
    return acc.concat(result);
  }, []);

  return Promise.all(promisesArray).catch((err) =>
    console.log('AWS S3 error while uploading files', err)
  );
};

exports.deleteObjectFromS3 = (fileName) =>
  s3.deleteObject({ Bucket: 'dovileko', Key: `photos/${fileName}` }).promise();
