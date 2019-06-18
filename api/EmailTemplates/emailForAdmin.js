/* eslint-disable camelcase */
const emailTemplate = require('./emailTemplate');

module.exports = function emailForClient(
  data,
  price,
  shippingCost,
  clientInfo
) {
  const {
    address1,
    additional_info,
    address2,
    city,
    full_country_name,
    email,
    first_name,
    last_name,
    postal_code,
    phone
  } = clientInfo;

  const title = 'Purchase @dovilejewellery.com';
  const body = `
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello Dovile,</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">a new order just have been placed!</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Order details:</p>
      ${data
        .map(
          item => `
            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">
              <a href=${item.link}>${item.name}</a>, ${
            item.quantity > 1 ? `quantity: ${item.quantity}, ` : ''
          }£${item.price}${item.ringSize ? `, size: ${item.ringSize}` : ''}
            </p>
            `
        )
        .join(' ')}
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Amount: £${price}</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Shipping cost: ${
      shippingCost === 0 ? 'Free' : `£${shippingCost}`
    }</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Total amount: £${price +
      shippingCost}</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; Margin-left: 15px;">
      Purchase time: ${new Date()}
    </p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px;">Client info:</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Name: ${first_name} ${last_name}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Email: ${email}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Phone: ${phone ||
        'Not provided'}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Address1: ${address1}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Address2: ${address2 ||
        'Not provided'}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">City: ${city}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">ZIP / Postal code: ${postal_code}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; Margin-left: 15px;">Country: ${full_country_name}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">Additional order information: ${additional_info ||
        'Not provided'}</p>
  `;

  return emailTemplate(body, title);
};
