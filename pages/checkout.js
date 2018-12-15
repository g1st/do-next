import React, { Component } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Subscribe } from 'unstated';
import {
  Elements,
  injectStripe,
  StripeProvider,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  CardNumberElement
} from 'react-stripe-elements';
import Button from '@material-ui/core/Button';

import CartContainer from '../containers/CartContainer';
import PaymentForm from '../components/PaymentForm';
import { ElementContainer, Input } from '../styles/Checkout';

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
        <PaymentForm />
        <form>
          <label>
            Card number
            <ElementContainer>
              <CardNumberElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...CARD_ELEMENT_OPTIONS}
              />
            </ElementContainer>
          </label>
          <label>
            Expiration date
            <ElementContainer>
              <CardExpiryElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...CARD_ELEMENT_OPTIONS}
              />
            </ElementContainer>
          </label>
          <label>
            CVC
            <ElementContainer>
              <CardCVCElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...CARD_ELEMENT_OPTIONS}
              />
            </ElementContainer>
          </label>
          <label>
            Postal code
            <ElementContainer>
              <PostalCodeElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...CARD_ELEMENT_OPTIONS}
              />
            </ElementContainer>
          </label>

          <Button
            variant="contained"
            color="secondary"
            disabled={!this.props.stripe || this.state.disable}
            onClick={this.handleSubmit}
          >
            Pay
          </Button>
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

// because injectStripe cannot be used on the same element that renders the Elements component;
// it must be used on the child component of Elements
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
