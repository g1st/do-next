import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';

import { clearBuyItNow } from '../../store/actions';
import { DrawerContext } from '../DrawerContext';
import CartDrawerContent from './CartDrawerContent';

const styles = {
  list: {
    width: 320,
    marginTop: '8px'
  },
  button: {
    margin: '20px 20px'
  },
  cart: {
    paddingTop: '10px'
  }
};

class CartDrawer extends Component {
  static contextType = DrawerContext;

  handleCheckout = () => {
    const { clearBuyItNow: clearBuyItNowRedux } = this.props;
    clearBuyItNowRedux();
    Router.push('/checkout').then(() => window.scrollTo(0, 0));
    const { toggleDrawer } = this.context;
    toggleDrawer('drawerCart', false);
  };

  render() {
    const { classes, uniqueCartItems } = this.props;
    const { drawerCart, toggleDrawer } = this.context;

    const sideCart = (
      // buyItNow always false because checkouting from cart component
      <CartDrawerContent
        closeDrawer={toggleDrawer('drawerCart', false)}
        buyItNow={false}
      />
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
              <Button
                className={classes.button}
                size="medium"
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => this.handleCheckout()}
              >
                Checkout
              </Button>
            </div>
          ) : null}
        </div>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  uniqueCartItems: state.cart.length
});

const mapDispatchToProps = dispatch => ({
  clearBuyItNow: () => dispatch(clearBuyItNow())
});

CartDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  uniqueCartItems: PropTypes.number,
  clearBuyItNow: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CartDrawer));
