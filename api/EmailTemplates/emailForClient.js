/* eslint-disable camelcase */
const emailTemplate = require('./emailTemplate');

module.exports = function emailForClient(
  data,
  price,
  shippingCost,
  clientInfo
) {
  const { first_name, address1, address2, city, country } = clientInfo;

  // credits to email template to https://github.com/leemunroe/responsive-html-email-template

  const title = 'Purchase @dovilejewellery.com';
  const body = `
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello ${first_name},</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thank you for your purchase at dovilejewellery.com. Your order will be sent in 3 working days and you can find the details below. </p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">You have ordered:</p>
      ${data
        .map(
          item => `
            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">
              <a href=${item.link}>${item.name}</a>, ${
            item.quantity > 1 ? `quantity: ${item.quantity}, ` : ''
          }£${item.price}
            </p>
            `
        )
        .join(' ')}
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Amount: £${price}</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Shipping cost: ${
      shippingCost === 0 ? 'Free' : `£${shippingCost}`
    }</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; Margin-left: 15px;">Total amount: £${price +
      shippingCost}</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px;">Parcel will be sent to:</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Address1: ${address1}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Address2: ${address2 ||
        'Not provided'}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">City: ${city}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; Margin-left: 15px;">Country: ${country}</p>
    <p>If there are any mistakes in your order or address please contact me by replying to this email as soon as possible, thank you.</p>`;

  return emailTemplate(body, title);
};
