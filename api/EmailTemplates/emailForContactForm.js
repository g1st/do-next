const emailTemplate = require('./emailTemplate');

module.exports = function emailForContactForm(message, email, subject) {
  const title = 'Message from contact form';
  const body = `
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Someone just contacted you through contact form.</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; Margin-left: 15px;">Topic: ${subject}</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; Margin-left: 15px;">Email: ${email}</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; Margin-left: 15px;">Message: ${message}</p>
  `;

  return emailTemplate(body, title);
};
