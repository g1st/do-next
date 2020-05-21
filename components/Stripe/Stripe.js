import React from 'react';
import { Elements, injectStripe, StripeProvider } from 'react-stripe-elements';

import StripeForm from './Form';

// because injectStripe cannot be used on the same element that renders the Elements component;
// it must be used on the child component of Elements
const CardForm = injectStripe(StripeForm);

const PulledOutElements = () => (
  <Elements>
    <CardForm />
  </Elements>
);

class Stripe extends React.Component {
  state = { stripe: null };

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
      });
    } else {
      const stripeJs = document.createElement('script');
      stripeJs.src = 'https://js.stripe.com/v3/';
      stripeJs.async = true;
      stripeJs.onload = () => {
        this.setState({
          stripe: window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
        });
      };

      if (document.body) {
        document.body.appendChild(stripeJs);
      }
    }
  }

  render() {
    const { stripe } = this.state;

    return (
      <StripeProvider stripe={stripe}>
        <PulledOutElements />
      </StripeProvider>
    );
  }
}

export default Stripe;
