import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';

import { DrawerContext } from '../DrawerContext';
import CartDrawerContent from './CartDrawerContent';

const styles = {
  list: {
    width: 320
  }
};

class CartDrawer extends Component {
  static contextType = DrawerContext;

  render() {
    const { classes } = this.props;

    const sideCart = (
      <CartDrawerContent
        closeDrawer={this.context.toggleDrawer('drawerCart', false)}
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
        </div>
      </Drawer>
    );
  }
}

CartDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CartDrawer);
