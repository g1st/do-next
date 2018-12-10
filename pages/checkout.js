import React, { Component } from 'react';
import axios from 'axios';
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
  state = { complete: false, error: false, disable: false };

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState(() => ({ disable: true }));
    if (this.props.stripe) {
      this.props.stripe
        .createToken({ name: 'Name' })
        .then(payload => {
          console.log('[token]', payload);
          return payload.token.id;
        })
        .then(token =>
          axios
            .post('http://localhost:3000/api/charge', { token })
            .then(res => {
              if (res.status == 200) {
                console.log('Purchase completed successfully');
                this.setState(() => ({
                  complete: true
                }));
              }
              console.log('its ok ', res);
            })
            .catch(err => {
              console.log('its not ok ', err);
              this.setState(() => ({ error: true }));
            })
        );
    } else {
      console.log('Form submitted before Stripe.js loaded.');
    }
  };

  render() {
    const purchase = this.state.complete ? (
      <p>Purchase Complete.</p>
    ) : (
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
          <button disabled={!this.props.stripe || this.state.disable}>
            Pay
          </button>
        </form>
      </div>
    );

    return (
      <Subscribe to={[CartContainer]}>
        {cart => (
          <div>
            <div>Checkout component</div>
            {this.state.error ? (
              <p>
                We cannot process your payment. Please check your payment
                details and try again.
              </p>
            ) : (
              purchase
            )}
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
