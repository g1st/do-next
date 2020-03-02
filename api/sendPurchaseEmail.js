/* eslint-disable camelcase */
const axios = require('axios');

const { appUrl } = require('../config');
const emailForClient = require('./EmailTemplates/emailForClient');
const emailForAdmin = require('./EmailTemplates/emailForAdmin');
const { cartHelper } = require('../util/helpers');

module.exports = data => {
  const { boughtFrom } = data.additional.purchaseDetails;
  const baseUrl = `${appUrl}/piece/`;
  const purchaseData = [];

  if (boughtFrom === 'buyItNow') {
    purchaseData.push({
      link: `${baseUrl}${data.additional.purchaseDetails.slug}`,
      ...data.additional.purchaseDetails
    });
  } else {
    // from cart, might be multiple items
    data.additional.purchaseDetails.selectedItems.forEach(item => {
      purchaseData.push({
        name: item.name,
        link: `${baseUrl}${item.slug}`,
        quantity: item.quantity,
        price: item.price,
        ringSize: item.ringSize,
        silverFinishStyle: item.silverFinishStyle
      });
    });
  }
  const { totalPrice, shippingCost, promo } = data.additional.purchaseDetails;
  const totalPriceBuyItNow = purchaseData[0].price * purchaseData[0].quantity;
  const price = boughtFrom === 'buyItNow' ? totalPriceBuyItNow : totalPrice;
  let withDiscount;

  if (promo.discount) {
    withDiscount = {};
    const { discount } = promo;
    withDiscount.discountPercentage = discount;
    withDiscount.code = promo.code;
    let discountedPrice;
    if (boughtFrom === 'buyItNow') {
      discountedPrice = cartHelper.priceToPay(
        true,
        data.additional.purchaseDetails,
        null,
        shippingCost,
        discount
      );
    } else {
      discountedPrice = cartHelper.priceToPay(
        false,
        null,
        data.additional.purchaseDetails.selectedItems,
        shippingCost,
        discount
      );
    }

    const discountAmount = (price - parseFloat(discountedPrice)).toFixed(2);
    withDiscount.discountedPrice = discountedPrice;
    withDiscount.discountAmount = discountAmount;
  }
  const clientInfo = data.additional;
  const { email } = data.additional;

  const adminHTML = emailForAdmin(
    purchaseData,
    price,
    shippingCost,
    clientInfo,
    withDiscount
  );

  const clientHTML = emailForClient(
    purchaseData,
    price,
    shippingCost,
    clientInfo,
    withDiscount
  );

  Promise.all([
    // mail for business owner
    axios.post(`${appUrl}/api/send`, {
      subject: 'New order @dovilejewellery.com',
      email: 'hello@dovilejewellery.com',
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
