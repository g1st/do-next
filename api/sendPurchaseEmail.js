/* eslint-disable camelcase */
const axios = require('axios');

const { appUrl } = require('../config');
const emailForClient = require('./EmailTemplates/emailForClient');
const emailForAdmin = require('./EmailTemplates/emailForAdmin');

module.exports = data => {
  const { boughtFrom } = data.additional.purchaseDetails;
  const baseUrl = `${appUrl}/piece/`;
  const purchaseData = [];

  if (boughtFrom === 'buyItNow') {
    purchaseData.push({
      link: `${baseUrl}${data.additional.purchaseDetails._id}`,
      ...data.additional.purchaseDetails
    });
  } else {
    // from cart, might be multiple items
    data.additional.purchaseDetails.selectedItems.forEach(item =>
      purchaseData.push({
        name: item.name,
        link: `${baseUrl}${item._id}`,
        quantity: item.quantity,
        price: item.price
      })
    );
  }

  const { totalPrice, shippingCost } = data.additional.purchaseDetails;
  const totalPriceBuyItNow = purchaseData[0].price * purchaseData[0].quantity;
  const price = boughtFrom === 'buyItNow' ? totalPriceBuyItNow : totalPrice;
  const clientInfo = data.additional;
  const { email } = data.additional;

  const adminHTML = emailForAdmin(
    purchaseData,
    price,
    shippingCost,
    clientInfo
  );

  const clientHTML = emailForClient(
    purchaseData,
    price,
    shippingCost,
    clientInfo
  );

  Promise.all([
    // mail for business owner
    axios.post(`${appUrl}/api/send`, {
      subject: 'New order @dovilejewellery.com',
      email: 'gintstan@gmail.com', // dovile jewellery email
      message: adminHTML
    }),
    // mail to client
    axios.post(`${appUrl}/api/send`, {
      subject: 'Purchase at dovilejewellery.com',
      email,
      message: clientHTML
    })
  ]).catch(err => console.log(err));
};
