import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  badge: {
    color: '#ffffff',
    backgroundColor: '#EE7600'
  }
});

class ShoppingBasket extends Component {
  state = {
    isClient: false
  };

  componentDidMount() {
    this.setState({ isClient: true });
  }

  render() {
    const { uniqueCartItems, classes } = this.props;
    const { isClient } = this.state;
    let shoppingBasket = <ShoppingBasketIcon />;

    if (isClient && uniqueCartItems) {
      shoppingBasket = (
        <Badge
          badgeContent={uniqueCartItems}
          classes={{
            badge: classes.badge
          }}
        >
          <ShoppingBasketIcon />
        </Badge>
      );
    }

    return shoppingBasket;
  }
}

ShoppingBasket.propTypes = {
  uniqueCartItems: PropTypes.number,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShoppingBasket);
