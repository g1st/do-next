import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Elements, injectStripe, StripeProvider } from 'react-stripe-elements';
import { Typography, withWidth } from '@material-ui/core';

import StripeForm from '../containers/Stripe/Form';
import Layout from '../components/Layout';

// because injectStripe cannot be used on the same element that renders the Elements component;
// it must be used on the child component of Elements
const CardForm = injectStripe(StripeForm);

const PulledOutElements = () => (
  <Elements>
    <CardForm />
  </Elements>
);

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = { stripe: null };
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe('pk_test_CkPX0rsL8Rg0GT3vYyQoe0jq')
      });
    } else {
      const stripeJs = document.createElement('script');
      stripeJs.src = 'https://js.stripe.com/v3/';
      stripeJs.async = true;
      stripeJs.onload = () => {
        this.setState({
          stripe: window.Stripe('pk_test_CkPX0rsL8Rg0GT3vYyQoe0jq')
        });
      };

      if (document.body) {
        document.body.appendChild(stripeJs);
      }
    }
  }

  render() {
    const { width, collections } = this.props;
    const { stripe } = this.state;

    return (
      <Layout pathname={false} collections={collections}>
        <Typography
          component="h1"
          variant={width === 'xs' ? 'h5' : 'h4'}
          gutterBottom
          align="center"
        >
          Checkout
        </Typography>
        <StripeProvider stripe={stripe}>
          <PulledOutElements />
        </StripeProvider>
      </Layout>
    );
  }
}

Checkout.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.string
};

export default withWidth()(Checkout);
