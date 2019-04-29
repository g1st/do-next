/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography, Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { clearCart, clearBuyItNow } from '../../store/actions';
import CartDrawerContent from '../../components/CartDrawer/CartDrawerContent';
import Error from '../../components/Error/Error';
import AdditionalInfoField from './AdditionalInfoField';
import CustomerOrderDetailForm from './CustomerOrderDetailForm';
import StripeDetailForm from './StripeDetailForm';
import PaymentFailureSegment from './PaymentFailureSegment';
import { attemptPayment } from './actions';
import BuyButton from './BuyButton';

import {
  Wrapper,
  ShippmentForm,
  Cart,
  FormWrapper,
  CheckoutForm,
  CenterButton
} from '../../styles/Checkout';

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
    const { stripe_errors } = this.state;
    const {
      stripe,
      clearCart: clearCartRedux,
      clearBuyItNow: clearBuyItNowRedux
    } = this.props;

    if (!this.isStripesInputsOk() || stripe_errors) return;
    this.setState(() => ({ disable: true }));
    if (stripe) {
      attemptPayment({ ...this.state, ...this.props })
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
          console.log('whole error object:', err);

          this.setState(() => ({ error: true }));
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

  render() {
    const {
      backend_validation_errors,
      disable,
      isClient,
      orderComplete
    } = this.state;

    const { cart, classes, stripe, width } = this.props;

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
                <CustomerOrderDetailForm
                  handleChange={this.handleChange}
                  isNotValid={this.isNotValid}
                  backend_validation_errors={backend_validation_errors}
                />
                <StripeDetailForm
                  data={this.state}
                  handleStripeChange={this.handleStripeChange}
                />
                <Grid item xs={12}>
                  <AdditionalInfoField handleChange={this.handleChange} />
                </Grid>
              </Grid>
              <br />
              <CenterButton>
                <BuyButton
                  disabled={!stripe || disable}
                  fullWidth={width === 'xs'}
                />
              </CenterButton>
            </form>
          </FormWrapper>
        </Paper>
      </CheckoutForm>
    );

    const { error } = this.state;
    if (error) {
      return <PaymentFailureSegment />;
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
  buyItNowItem: state.buyItNow,
  cart: state.cart,
  shippingCost: state.shippingCost
});

const mapDispatchToProps = dispatch => ({
  clearBuyItNow: () => dispatch(clearBuyItNow()),
  clearCart: () => dispatch(clearCart())
});

StripeForm.propTypes = {
  buyItNowItem: PropTypes.object,
  cart: PropTypes.array,
  classes: PropTypes.object.isRequired,
  clearBuyItNow: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  clearCart: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  shippingCost: PropTypes.number,
  stripe: PropTypes.object,
  width: PropTypes.string
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StripeForm)
);
