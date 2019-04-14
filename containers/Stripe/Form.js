/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';
import {
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  CardNumberElement
} from 'react-stripe-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography, Paper, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import StripeElementWrapper from './StripeElementWrapper';
import { clearCart, clearBuyItNow } from '../../store/actions';
import { cartHelper } from '../../util/helpers';
import CartDrawerContent from '../../components/CartDrawer/CartDrawerContent';
import Error from '../../components/Error/Error';
import {
  Wrapper,
  ShippmentForm,
  Cart,
  FormWrapper,
  CheckoutForm,
  CenterButton
} from '../../styles/Checkout';
import { TextInput, SelectCountry, TextArea } from './Inputs';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  fullWidth: {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
});

class StripeForm extends Component {
  state = {
    orderComplete: false,
    error: false,
    disable: false,
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    additional_info: '',
    country: 'GB',
    card_number: { complete: false, error: null, empty: true },
    card_expiration: {
      complete: false,
      error: null,
      empty: true
    },
    CVC_number: { complete: false, error: null, empty: true },
    zip_code: { complete: false, error: null, empty: true },
    stripe_errors: false,
    backend_validation_errors: [],
    isClient: false
  };

  componentDidMount() {
    this.setState({ isClient: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      first_name,
      last_name,
      email,
      phone,
      address1,
      address2,
      country,
      city,
      additional_info
    } = this.state;

    if (
      first_name !== nextState.first_name ||
      last_name !== nextState.last_name ||
      email !== nextState.email ||
      phone !== nextState.phone ||
      address1 !== nextState.address1 ||
      address2 !== nextState.address2 ||
      country !== nextState.country ||
      city !== nextState.city ||
      additional_info !== nextState.additional_info
    ) {
      return false;
    }
    return true;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleStripeChange = (element, name) => {
    if (!element.empty && element.complete) {
      return this.setState({
        [name]: { complete: true, error: null, empty: false }
      });
    }

    return this.setState({
      [name]: {
        complete: false,
        empty: element.empty,
        error: element.error ? element.error.message : null
      }
    });
  };

  handleFocus = () => {
    console.log('[focus]');
  };

  handleReady = () => {
    console.log('[ready]');
  };

  isStripesInputsOk = () => {
    const { card_number, card_expiration, CVC_number, zip_code } = this.state;
    if (
      card_number.error ||
      card_expiration.error ||
      CVC_number.error ||
      zip_code.error
    ) {
      this.setState({ stripe_errors: true });
      return false;
    }
    if (
      card_number.complete &&
      card_expiration.complete &&
      CVC_number.complete &&
      zip_code.complete
    ) {
      this.setState(() => ({ stripe_errors: false }));
      return true;
    }

    // that means fields are left blank
    this.setState(() => ({ stripe_errors: true }));

    return false;
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const {
      stripe,
      clearCart: clearCartRedux,
      clearBuyItNow: clearBuyItNowRedux
    } = this.props;

    if (!this.isStripesInputsOk() || this.stripe_errors) return;
    this.setState(() => ({ disable: true }));
    if (stripe) {
      const {
        first_name,
        last_name,
        address1,
        address2,
        city,
        country
      } = this.state;
      stripe
        .createToken({
          name: `${first_name} ${last_name}`,
          address_line1: address1,
          address_line2: address2,
          address_city: city,
          address_country: country
        })
        .then(payload => {
          const { email, phone, additional_info } = this.state;
          const { buyItNowItem, shippingCost, cart } = this.props;

          let purchaseDetails;
          if (Object.prototype.hasOwnProperty.call(buyItNowItem, 'name')) {
            console.log('is buyitnow pirko');
            purchaseDetails = {
              ...buyItNowItem,
              shippingCost,
              boughtFrom: 'buyItNow'
            };
          } else {
            console.log('is cart pirko');
            const selectedItems = cart;
            const totalItems = cartHelper.totalItems(cart);
            const totalPrice = cartHelper.totalPrice(cart);
            purchaseDetails = {
              selectedItems,
              totalItems,
              totalPrice,
              boughtFrom: 'cart',
              shippingCost
            };
          }
          axios
            .post('http://localhost:3000/api/charge', {
              token: payload.token.id,
              payload,
              additional: {
                email,
                first_name,
                last_name,
                phone,
                address1,
                address2,
                city,
                additional_info,
                country,
                purchaseDetails
              }
            })
            .then(res => {
              // backend did not validate form
              if (res.data.errors) {
                console.log(res.data.errors);
                console.log('terminatinu?');
                this.setState({
                  // backend_validation_errors: { ...res.data.errors },
                  backend_validation_errors: res.data.errors,
                  disable: false
                });

                return;
              }
              if (res.status === 200) {
                console.log('Purchase completed successfully');
                this.setState(() => ({ orderComplete: true }));
                // empty redux state
                clearCartRedux();
                clearBuyItNowRedux();
                console.log('its ok ', res);
              }
            })
            .catch(err => {
              console.log('its not ok ', err.response);
              console.log(err);
              console.log(err.errors);

              this.setState(() => ({ error: true }));
            });
        });
    } else {
      console.log('Form submitted before Stripe.js loaded.');
    }
  };

  isNotValid = element => {
    const { backend_validation_errors } = this.state;

    let output = null;

    if (backend_validation_errors.some(error => error.param === element)) {
      output = backend_validation_errors
        .filter(error => error.param === element)
        .map(error => error.msg);
    }
    return output;
  };

  changeCountry = country => {
    this.setState({ country });
  };

  render() {
    const {
      card_expiration,
      card_number,
      CVC_number,
      disable,
      orderComplete,
      stripe_errors,
      zip_code,
      backend_validation_errors,
      isClient,
      country
    } = this.state;

    const { classes, stripe, cart } = this.props;

    let cardNumberError = null;
    if (card_number.error) {
      cardNumberError = card_number.error;
    } else if (stripe_errors) {
      if (card_number.empty) {
        cardNumberError = `Your card's number is blank`;
      }
    }
    let postCodeError = null;
    if (zip_code.error) {
      postCodeError = zip_code.error;
    } else if (stripe_errors) {
      if (zip_code.empty) {
        postCodeError = `Your card's postal code is blank.`;
      }
    }
    let cvcError = null;
    if (CVC_number.error) {
      cvcError = CVC_number.error;
    } else if (stripe_errors) {
      if (CVC_number.empty) {
        cvcError = `Your card's security number is blank.`;
      }
    }
    let cardExpiryError = null;
    if (card_expiration.error) {
      cardExpiryError = card_expiration.error;
    } else if (stripe_errors) {
      if (card_expiration.empty) {
        cardExpiryError = `Your card's expiration day is blank.`;
      }
    }

    const purchase = orderComplete ? (
      <p>Purchase Complete.</p>
    ) : (
      <CheckoutForm>
        <Paper className={classes.paper}>
          <FormWrapper>
            <form onSubmit={e => this.handleSubmit(e)}>
              {backend_validation_errors.length > 0
                ? backend_validation_errors
                    .filter(error => error.param === '_error')
                    .map((error, i) => <Error key={i}>{error.msg}</Error>)
                : null}
              <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    labelId="first_name"
                    label="First name"
                    handleChange={this.handleChange}
                    error={backend_validation_errors.some(
                      err => err.param === 'additional.first_name'
                    )}
                    helperText={this.isNotValid('additional.first_name')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    labelId="last_name"
                    label="Last name"
                    handleChange={this.handleChange}
                    error={backend_validation_errors.some(
                      err => err.param === 'additional.last_name'
                    )}
                    helperText={this.isNotValid('additional.last_name')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    labelId="email"
                    label="Email address"
                    type="email"
                    handleChange={this.handleChange}
                    error={backend_validation_errors.some(
                      err => err.param === 'additional.email'
                    )}
                    helperText={this.isNotValid('additional.email')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    labelId="phone"
                    label="Phone number (optional)"
                    type="tel"
                    notReq
                    handleChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    labelId="address1"
                    label="Address"
                    handleChange={this.handleChange}
                    error={backend_validation_errors.some(
                      err => err.param === 'additional.address1'
                    )}
                    helperText={this.isNotValid('additional.address1')}
                    // helperText={null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    labelId="address2"
                    label="Apartment, suite, etc. (optional)"
                    notReq
                    handleChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectCountry
                    country={country}
                    handleChange={this.changeCountry}
                    error={backend_validation_errors.some(
                      err => err.param === 'additional.country'
                    )}
                    helperText={this.isNotValid('additional.country')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    labelId="city"
                    label="City"
                    handleChange={this.handleChange}
                    error={backend_validation_errors.some(
                      err => err.param === 'additional.city'
                    )}
                    helperText={this.isNotValid('additional.city')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StripeElementWrapper
                    label="Card Number"
                    placeholder="1234 1234 1234 1234"
                    component={CardNumberElement}
                    name="card_number"
                    onChange={this.handleStripeChange}
                    error={cardNumberError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StripeElementWrapper
                    label="Expiry (MM / YY)"
                    component={CardExpiryElement}
                    name="card_expiration"
                    onChange={this.handleStripeChange}
                    error={cardExpiryError}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StripeElementWrapper
                    label="CVC"
                    component={CardCVCElement}
                    name="CVC_number"
                    onChange={this.handleStripeChange}
                    error={cvcError}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StripeElementWrapper
                    component={PostalCodeElement}
                    error={postCodeError}
                    label="Postal / ZIP code"
                    name="zip_code"
                    onChange={this.handleStripeChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextArea handleChange={this.handleChange} />
                </Grid>
              </Grid>
              <br />
              <CenterButton>
                <Button
                  color="secondary"
                  disabled={!stripe || disable}
                  className={classes.fullWidth}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Buy
                </Button>
              </CenterButton>
            </form>
          </FormWrapper>
        </Paper>
      </CheckoutForm>
    );

    const { error } = this.state;
    if (error) {
      return (
        <div>
          <div>
            We cannot process your payment. Please check your payment details
            and try again.
          </div>
        </div>
      );
    }
    const { buyItNowItem } = this.props;
    const buyItNow = Object.prototype.hasOwnProperty.call(buyItNowItem, 'name');

    const checkoutPossible = buyItNow || (isClient && cart.length > 0);
    if (checkoutPossible) {
      return (
        <Wrapper>
          <Cart>
            <CartDrawerContent inForm buyItNow={buyItNow} />
          </Cart>
          <ShippmentForm>{purchase}</ShippmentForm>
        </Wrapper>
      );
    }
    if (orderComplete) {
      return <div>order complete, clear cart</div>;
    }
    return (
      <div>
        <Typography variant="body1">Your Cart is empty.</Typography>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  buyItNowItem: state.buyItNow,
  shippingCost: state.shippingCost
});

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart()),
  clearBuyItNow: () => dispatch(clearBuyItNow())
});

StripeForm.propTypes = {
  buyItNowItem: PropTypes.object,
  classes: PropTypes.object.isRequired,
  shippingCost: PropTypes.number,
  stripe: PropTypes.object,
  clearCart: PropTypes.func,
  clearBuyItNow: PropTypes.func,
  cart: PropTypes.array
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StripeForm)
);
