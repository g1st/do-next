const nodemailer = require('nodemailer');

// send mail with defined transport object
const sendMail = ({ email, subject, message }) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
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

  let output = `
    <p>You have a new message</p>
    <h3>Message Details</h3>
    <ul>
      <li>From email: ${email}</li>
      <li>Subject: ${subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
  `;

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Dovile Jewellery" <hello@dovilejewellery.com>', // sender address
    to: 'gintstan@gmail.com', // list of receivers
    subject: `Dovile Jewellery, Subject: ${subject}`, // Subject line
    text: `${message} From: ${email}`, // plain text body
    html: output // html body
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
