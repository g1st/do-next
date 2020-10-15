const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});
const { itemsObjectToArray } = require('../../util/helpers');
const sendEmails = require('../sendEmails');
const Work = require('../models/works');

// Webhook handler for asynchronous events.
const webhook = async (req, res) => {
  let data;
  let eventType;
  const webhookSecret =
    process.env.NODE_ENV === 'production'
      ? process.env.STRIPE_WEBHOOK_SECRET
      : null;

  // Check if webhook signing is configured.
  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(
        `⚠️  Webhook signature verification failed. Error: ${err.message}`
      );
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }
  if (eventType === 'checkout.session.completed') {
    console.log(`🔔  Payment received!`);
    const customer = await stripe.customers.retrieve(data.object.customer);
    const orderData = data.object;
    const items = itemsObjectToArray(data.object.metadata);
    const emailData = {
      customerEmail: customer.email,
      items,
      orderData,
    };

    await sendEmails(emailData);

    // make one of a kind items not available from now
    const ids = items
      .filter((item) => item.madeToOrder === 'false')
      .map((item) => ({
        id: item._id,
      }));

    const promises = ids.map((item) =>
      Work.findByIdAndUpdate({ _id: item.id }, { $set: { available: false } })
    );

    await Promise.all(promises);
  }

  res.sendStatus(200);
};

module.exports = webhook;
