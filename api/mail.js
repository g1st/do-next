const nodemailer = require('nodemailer');

// send mail with defined transport object
const sendMail = ({ email, subject, message }) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_API_USER, // generated ethereal user
      pass: process.env.MAIL_API_PASS // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Dovile Jewellery" <hello@dovilejewellery.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text: `${message} From: ${email}`, // plain text body
    html: message // html body
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return resolve(info);
    });
  });
};

module.exports = sendMail;
