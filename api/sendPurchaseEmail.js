const axios = require('axios');

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

  const {
    address1,
    additional_info,
    address2,
    city,
    country,
    email,
    first_name,
    last_name,
    phone
  } = data.additional;

  const { totalPrice, shippingCost } = data.additional.purchaseDetails;
  const totalPriceBuyItNow = purchaseData[0].price * purchaseData[0].quantity;

  const outputForDovile = `
    <h3>Items purchased</h3>
    ${purchaseData
      .map(
        item => `
      <p> Name: ${item.name}</p>
      <p> Link: ${item.link}</p>
      <p> Quantity: ${item.quantity}</p>
      <p> Price: £${item.price}</p>
      <br>
      `
      )
      .join(' ')}
      <p>Amount: £${
        boughtFrom === 'buyItNow' ? totalPriceBuyItNow : totalPrice
      }</p>
      <p>Shipping cost: ${shippingCost === 0 ? 'Free' : `£${shippingCost}`}</p>
      <p>Total amount: £${
        boughtFrom === 'buyItNow'
          ? totalPriceBuyItNow + shippingCost
          : totalPrice + shippingCost
      }</p>
      <p>Purchase time: ${new Date()}</p>
      
      <h2>Customer info</h2>
      <p>Additional order information: ${additional_info || 'Not provided'}</p>
      <p>Name: ${first_name} ${last_name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Address1: ${address1}</p>
      <p>Address2: ${address2 || 'Not provided'}</p>
      <p>City: ${city}</p>
      <p>Country: ${country}</p>
    `;

  const outputForClient = `
    <h3>Thank you for your purchase from Dovile Jewellery!</h3>
    <h4>You have just bought:</h4>
    ${purchaseData
      .map(
        item => `
      <p><a href=${item.link}>${item.name}</a></p>
      <p> Quantity: ${item.quantity}</p>
      <p> Price: £${item.price}</p>
      <br>
      `
      )
      .join(' ')}
      <hr/>
      <p>Amount: £${
        boughtFrom === 'buyItNow' ? totalPriceBuyItNow : totalPrice
      }</p>
      <p>Shipping cost: ${shippingCost === 0 ? 'Free' : `£${shippingCost}`}</p>
      <p>Total amount: £${
        boughtFrom === 'buyItNow'
          ? totalPriceBuyItNow + shippingCost
          : totalPrice + shippingCost
      }</p>
    <p>Your items will be sent in 3 working days.</p>
    <p>Thank you, Dovile.</p>
    <p><a href="https://www.dovilejewellery.com">dovilejewellery.com</a></p>
  `;

  Promise.all([
    // mail for business owner
    axios.post('http://localhost:3000/api/send', {
      subject: 'Successful order @ dovilejewellery.com',
      email: 'gintstan@gmail.com', // dovile jewellery email
      message: outputForDovile
    }),
    // mial to client
    axios.post('http://localhost:3000/api/send', {
      subject: 'Successful purchase from dovilejewellery.com!',
      email,
      message: outputForClient
    })
  ])
    .then(() => {
      console.log('both emails sent!');
    })
    .catch(err => console.log(err));
};

/* eslint-enable camelcase */
