const axios = require('axios');

const emailForClient = require('./EmailTemplates/emailForClient');
const emailForAdmin = require('./EmailTemplates/emailForAdmin');

/* eslint-disable camelcase */

module.exports = data => {
  const { boughtFrom } = data.additional.purchaseDetails;

  const baseUrl = 'http://localhost:3000/piece/';
  const purchaseData = [];
  if (boughtFrom === 'buyItNow') {
    purchaseData.push({
      link: `${baseUrl}${data.additional.purchaseDetails._id}`,
      ...data.additional.purchaseDetails
    });
  } else {
    // from cart, could be multiple items
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
    axios.post('http://localhost:3000/api/send', {
      subject: 'Successful order @ dovilejewellery.com',
      email: 'gintstan@gmail.com', // dovile jewellery email
      message: adminHTML
    }),
    // mial to client
    axios.post('http://localhost:3000/api/send', {
      subject: 'Successful purchase from dovilejewellery.com!',
      email,
      message: clientHTML
    })
  ])
    .then(() => {
      console.log('both emails sent!');
    })
    .catch(err => console.log(err));
};

/* eslint-enable camelcase */
