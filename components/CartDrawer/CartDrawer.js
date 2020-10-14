import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';

import { DrawerContext } from '../DrawerContext';
import CartDrawerContent from './CartDrawerContent';
import StripeCheckoutButton from '../Stripe/StripeCheckoutButton';

const styles = {
  list: {
    width: 320,
    marginTop: '8px',
  },
  cart: {
    paddingTop: '10px',
  },
};

class CartDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    uniqueCartItems: PropTypes.number,
    cart: PropTypes.array,
  };

  static contextType = DrawerContext;

  render() {
    const { classes, uniqueCartItems, cart } = this.props;
    const { drawerCart, toggleDrawer } = this.context;

    const sideCart = (
      <CartDrawerContent closeDrawer={toggleDrawer('drawerCart', false)} />
    );

    return (
      <Drawer
        anchor="right"
        open={drawerCart}
        onClose={toggleDrawer('drawerCart', false)}
        onOpen={toggleDrawer('drawerCart', true)}
      >
        {uniqueCartItems > 0 ? (
          <Typography className={classes.cart} variant="h5" align="center">
            Your Cart
          </Typography>
        ) : null}
        <div className={classes.list} role="button">
          {sideCart}
          {uniqueCartItems > 0 ? (
            <div style={{ width: 280 }}>
              <StripeCheckoutButton items={cart} name="checkout" />
            </div>
          ) : null}
        </div>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => ({
  uniqueCartItems: state.cart.length,
  cart: state.cart,
});

export default connect(mapStateToProps)(withStyles(styles)(CartDrawer));
