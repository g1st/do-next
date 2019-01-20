import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { Subscribe } from 'unstated';

import CartContainer from '../../containers/CartContainer';
import { DrawerContext } from '../DrawerContext';
import CartDrawerContent from './CartDrawerContent';

const styles = {
  list: {
    width: 320
  },
  button: {
    margin: '20px 20px'
  }
};

class CartDrawer extends Component {
  static contextType = DrawerContext;

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
          <Subscribe to={[CartContainer]}>
            {cart =>
              cart.state.count > 0 ? (
                <div style={{ width: 280 }}>
                  <Button
                    className={classes.button}
                    size="medium"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => cart.checkout()}
                  >
                    Checkout
                  </Button>
                </div>
              ) : null
            }
          </Subscribe>
        </div>
      </Drawer>
    );
  }
}

CartDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CartDrawer);
