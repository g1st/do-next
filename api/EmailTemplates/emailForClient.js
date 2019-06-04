/* eslint-disable camelcase */
const emailTemplate = require('./emailTemplate');

module.exports = function emailForClient(
  data,
  price,
  shippingCost,
  clientInfo
) {
  const {
    first_name,
    address1,
    address2,
    city,
    full_country_name
  } = clientInfo;

  // credits to email template to https://github.com/leemunroe/responsive-html-email-template

  const title = 'Purchase @dovilejewellery.com';
  const body = `
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello ${first_name},</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">THANK YOU for your purchase, this e-mail confirms your order.</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">You will be contacted when the order will be shipped providing you with a tracking number.</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">PLEASE NOTE, that <i>made to order</i> items producing times are indicated at each piece's description. Producing times and delivery options for commissions are discussed individually by e-mail.</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Delivery times will vary but usually, it is 1-2 days for UK, 3-7 days for Europe and 5-10 days worldwide. Delivery times may be extended during particularly busy periods such as Christmas.</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0;">Your order:</p>
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
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0;">Your address:</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">${address1}</p>
      ${
        address2
          ? `<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">
            ${address2}
          </p>`
          : ''
      }
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 8px; Margin-left: 15px;">${city}</p>
      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; Margin-left: 15px;">${full_country_name}</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">I strongly recommend you to read my jewellery <a href="https://www.dovilejewellery.com/care-guide">care guide</a>.</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Please do not hesitate to contact me, if you have any questions.</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 6px;">Many thanks,</p>
    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0;">Dovile</p>`;

  return emailTemplate(body, title);
};
