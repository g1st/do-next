import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@material-ui/core';

import { amountInCents } from '../../util/helpers';
import Error from '../Error/Error';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripeCheckoutButton = ({ items, name, checkInputs }) => {
  const [error, setError] = useState(null);

  const handleClick = async () => {
    // it is present when buying with "buy it not"
    if (checkInputs) {
      if (checkInputs(items[0])) {
        // return if there are wrong inputs
        return;
      }
    }
    // Get Stripe.js instance
    const stripe = await stripePromise;

    const data = {};

    data.lineItems = items.map((item) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          description: item.ringSize ? item.ringSize : undefined,
          images: item.images.map(
            (img) => `${process.env.NEXT_PUBLIC_AWS_BUCKET}/photos/${img.big}`
          ),
        },
        unit_amount: amountInCents(item.price),
      },
      quantity: item.quantity,
    }));
    data.items = items;

    // Call backend to create the Checkout Session
    try {
      const response = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/create-checkout-session`,
      });
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      console.log('result :>> ', result);
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log(result.error.message);
        setError(result.error.message);
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <>
      <Button
        style={name === 'checkout' ? { margin: 20 } : null}
        size="large"
        variant="contained"
        color={name === 'checkout' ? 'secondary' : 'primary'}
        fullWidth
        onClick={handleClick}
      >
        {name}
      </Button>
      {error ? <Error>{error}</Error> : null}
    </>
  );
};

StripeCheckoutButton.propTypes = {
  items: PropTypes.array,
  name: PropTypes.string,
  checkInputs: PropTypes.func,
};

export default StripeCheckoutButton;
