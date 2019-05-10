import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Badge } from '@material-ui/core';

class ShoppingBasket extends Component {
  state = {
    isClient: false
  };

  componentDidMount() {
    this.setState({ isClient: true });
  }

  render() {
    const { uniqueCartItems } = this.props;
    const { isClient } = this.state;
    let shoppingBasket = <ShoppingBasketIcon />;

    if (isClient && uniqueCartItems) {
      shoppingBasket = (
        <Badge badgeContent={uniqueCartItems}>
          <ShoppingBasketIcon />
        </Badge>
      );
    }

    return shoppingBasket;
  }
}

ShoppingBasket.propTypes = {
  uniqueCartItems: PropTypes.number
};

export default ShoppingBasket;
