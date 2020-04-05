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

exports.fileFilter = filesArray =>
  // returns true when there are at least one wrong mimetype
  filesArray.some(arr =>
    arr.some(
      ({ mimetype }) => mimetype !== 'image/jpeg' && mimetype !== 'image/png'
    )
  );

exports.writeFileToS3 = (fileName, size, file, mimetype) => {
  let quality = 80;
  if (size === 300) {
    quality = 100;
  }
  if (size === 900) {
    quality = 90;
  }
  console.log('inside writeFileToS3, before sharp');
  return sharp(file)
    .jpeg({ quality, progressive: true })
    .resize(size, size)
    .toBuffer()
    .then(data => {
      console.log('putting object :', fileName);
      return s3
        .putObject({
          Bucket: 'dovileko',
          Key: fileName,
          ContentType: mimetype,
          Body: data,
          ACL: 'public-read',
          ServerSideEncryption: 'AES256'
        })
        .promise();
    })
    .catch(err => console.log('Image processing error in sharp: ', err));

  // .toBuffer(async function(err, buffer) {
  //   console.log('buffer inside sharp :', buffer);
  //   if (err) throw err;
  //   return s3
  //     .putObject(
  //       {
  //         Bucket: 'dovileko',
  //         Key: fileName,
  //         ContentType: mimetype,
  //         Body: buffer,
  //         ACL: 'public-read',
  //         ServerSideEncryption: 'AES256'
  //       }
  // ,
  // function(err, data) {
  //   if (err) {
  //     console.log(`Failed to upload to s3 bucket. Error: ${err}`);
  //     // reject(err);
  //     return err;
  //   }
  //   console.log('data :', data);
  //   console.log(`Images uploaded to s3. Path: /${fileName}`);
  //   // resolve(data);
  //   return data;
  // }
  //     )
  //     .promise();
  // });
};

// Try with promises
exports.putBatch = files => {
  console.log('inside putBatch');
  // console.log('files :', files);
  // Make all the putObject calls immediately
  // Will return rejected promise if any requests fail
  // const promises = Promise.all(
  //   files.map(photos =>
  //     photos.map(photo =>
  //       this.writeFileToS3(
  //         photo.path,
  //         photo.dimensions,
  //         photo.buffer,
  //         photo.mimetype
  //       )
  //     )
  //   )

  // files.map(function(photos) {
  //   const params = {
  //     Bucket: 'dovileko',
  //     Key: file.key,
  //     Body: file.stream
  //   };
  //   return s3.putObject(params).promise();
  // })
  // );

  const fileName = files[0][0].path;
  const data = files[0][0].buffer;
  // const fileName = files[0].photo.path
  // const fileName = files[0].photo.path

  console.log('data :', data);
  console.log('fileName :', fileName);

  return s3
    .putObject({
      Bucket: 'dovileko',
      Key: fileName,
      // ContentType: mimetype,
      Body: data,
      ACL: 'public-read',
      ServerSideEncryption: 'AES256'
    })
    .promise();

  // console.log('promises :', promises);
  // return promises;
};

exports.deleteObjectFromS3 = fileName => {
  s3.deleteObject({ Bucket: 'dovileko', Key: fileName }, function(err, data) {
    if (err) {
      console.log('error occured while deleting');
    } else {
      console.log('deleted successfully');
      console.log('data :', data);
    }
  });
};
