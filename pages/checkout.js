import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Elements, injectStripe, StripeProvider } from 'react-stripe-elements';

import StripeForm from '../containers/Stripe/Form';
import Layout from '../components/Layout';

// because injectStripe cannot be used on the same element that renders the Elements component;
// it must be used on the child component of Elements
const CardForm = injectStripe(StripeForm);
class PulledOutElements extends Component {
  render() {
    return (
      <Elements>
        <CardForm />
      </Elements>
    );
  }
}
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
      document.body && document.body.appendChild(stripeJs);
    }
  }

  render() {
    return (
      <Layout pathname={false} collections={this.props.collections}>
        <Typography variant="h3" gutterBottom>
          Checkout
        </Typography>
        <StripeProvider stripe={this.state.stripe}>
          <PulledOutElements />
        </StripeProvider>
      </Layout>
    );
  }
}

Checkout.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string)
};

export default Checkout;
