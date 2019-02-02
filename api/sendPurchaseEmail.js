const axios = require('axios');

module.exports = data => {
  const { boughtFrom } = data.additional.purchaseDetails;

  let baseUrl = 'http://localhost:3000/piece/';
  let purchaseData = [];
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

  const output = `
    <h3>Items purchased</h3>
    ${purchaseData
      .map(item => {
        return `
      <p> Name: ${item.name}</p>
      <p> Link: ${item.link}</p>
      <p> Quantity: ${item.quantity}</p>
      <p> Price: £${item.price}</p>
      <br>
      `;
      })
      .join(' ')}
    <p>Additional order information: ${additional_info || 'Not provided'}</p>
    <p>Amount: £${
      boughtFrom === 'buyItNow' ? purchaseData[0].price : totalPrice
    }</p>
    <p>Shipping cost: ${shippingCost == 0 ? 'Free' : `£${shippingCost}`}</p>
    <p>Total amount: £${
      boughtFrom === 'buyItNow'
        ? purchaseData[0].price + shippingCost
        : totalPrice + shippingCost
    }</p>
    <p>Purchase time: ${new Date()}</p>
    
    <h2>Customer info</h2>
    <p>Name: ${first_name} ${last_name}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <p>Address1: ${address1}</p>
    <p>Address2: ${address2 || 'Not provided'}</p>
    <p>City: ${city}</p>
    <p>Country: ${country}</p>
    `;

  return (
    axios
      // change for deployment
      .post('http://localhost:3000/api/send', {
        subject: 'Purchase completed',
        email: email,
        message: output
      })
      .then(res => console.log('email sent'))
      .catch(err => {
        console.log(err);
      })
  );
};
