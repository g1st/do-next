import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Router from 'next/router';

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
  }
};

class CartDrawer extends Component {
  static contextType = DrawerContext;

  handleCheckout = () => {
    this.props.clearBuyItNow();
    Router.push('/checkout');
    this.context.toggleDrawer('drawerCart', false);
  };

  render() {
    const { classes } = this.props;

    const sideCart = (
      // buyItNow always false because checkouting from cart component
      <CartDrawerContent
        closeDrawer={this.context.toggleDrawer('drawerCart', false)}
        buyItNow={false}
      />
    );

    return (
      <Drawer
        anchor="right"
        open={this.context.drawerCart}
        onClose={this.context.toggleDrawer('drawerCart', false)}
        onOpen={this.context.toggleDrawer('drawerCart', true)}
      >
        <div
          className={classes.list}
          tabIndex={0}
          role="button"
          onKeyDown={this.context.toggleDrawer('drawerCart', false)}
        >
          {sideCart}
          {this.props.uniqueCartItems > 0 ? (
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
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CartDrawer));
