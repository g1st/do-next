const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Fetch the Checkout Session to display the JSON result on the success page
const checkoutSession = async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.json(session);
};

module.exports = checkoutSession;
