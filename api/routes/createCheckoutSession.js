const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});
const { supportedCountries } = require('../../util/globals');
const { makeObject } = require('../../util/helpers');

const createCheckoutSession = async (req, res) => {
  const allItemsObject = makeObject(req.body.items);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body.lineItems,
    mode: 'payment',
    allow_promotion_codes: false,
    shipping_address_collection: {
      allowed_countries: supportedCountries,
    },
    metadata: allItemsObject,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/piece/${allItemsObject.slug_0}`,
  });

  res.json({ id: session.id, items: req.body.items });
};

module.exports = createCheckoutSession;
