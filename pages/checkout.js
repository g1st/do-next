import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Subscribe } from 'unstated';
import {
  Elements,
  CardElement,
  injectStripe,
  StripeProvider
} from 'react-stripe-elements';

import CartContainer from '../containers/CartContainer';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#424770',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#9e2146'
    }
  }
};

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = change => {
  console.log('[change]', change);
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};
class _CardForm extends Component {
  handleSubmit = ev => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then(payload => console.log('[token]', payload));
    } else {
      console.log('Form submitted before Stripe.js loaded.');
    }
  };

  render() {
    return (
      <Subscribe to={[CartContainer]}>
        {cart => (
          <div>
            <div>Checkout component</div>
            <div className="checkout">
              <p>Would you like to complete the purchase?</p>
              <form onSubmit={this.handleSubmit}>
                <CardElement
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onReady={handleReady}
                  {...CARD_ELEMENT_OPTIONS}
                />
                <button disabled={!this.props.stripe}>Pay</button>
              </form>
            </div>
            <div>{JSON.stringify(cart)}</div>
          </div>
        )}
      </Subscribe>
    );
  }
}

const CardForm = injectStripe(_CardForm);
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
    this.submit = this.submit.bind(this);
    this.state = { stripe: null };
  }

  componentDidMount() {
    1;
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

  async submit(ev) {
    // User clicked submit
  }

  render() {
    return (
      <Layout pathname={false}>
        <StripeProvider stripe={this.state.stripe}>
          <PulledOutElements />
        </StripeProvider>
      </Layout>
    );
  }
}

export default Checkout;
