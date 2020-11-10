/* eslint-disable camelcase */
const axios = require('axios');

const emailForClient = require('./EmailTemplates/emailForClient');
const emailForAdmin = require('./EmailTemplates/emailForAdmin');

module.exports = ({ customerEmail, items, orderData }) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/piece/`;
  const purchaseData = [];

  items.forEach((item) => {
    purchaseData.push({
      name: item.name,
      link: `${baseUrl}${item.slug}`,
      quantity: item.quantity,
      price: item.price,
      ringSize: item.ringSize,
      silverFinishStyle: item.silverFinishStyle,
    });
  });

  const adminHTML = emailForAdmin(purchaseData, customerEmail, orderData);

  const clientHTML = emailForClient(purchaseData, orderData);

  Promise.all([
    // mail for business owner
    axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/send`, {
      subject: 'New order @dovileko.com',
      email: 'hello@dovilejewellery.com',
      message: adminHTML,
    }),
    // mail to client
    axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/send`, {
      subject: 'Purchase at dovileko.com',
      email: customerEmail,
      message: clientHTML,
    }),
  ]).catch((err) => console.log(err));
};
