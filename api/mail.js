const nodemailer = require('nodemailer');

const {
  EMAIL,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_API_USER,
  MAIL_API_PASS,
} = process.env;

// send mail with defined transport object
const sendMail = ({ email, subject, message, contactForm }) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: MAIL_API_USER, // generated ethereal user
      pass: MAIL_API_PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Dovile Ko" <hello@dovilejewellery.com>', // sender address
    to: contactForm ? EMAIL : email, // list of receivers
    subject, // Subject line
    text: `${message} From: ${email}`, // plain text body
    html: message, // html body
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log(
        `Message sent ${
          contactForm ? `via contact form. From: ${EMAIL}` : `to ${email}`
        }`
      );
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return resolve(info);
    });
  });
};

module.exports = sendMail;
