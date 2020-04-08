import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Badge } from '@material-ui/core';

class ShoppingBasket extends Component {
  static propTypes = {
    uniqueCartItems: PropTypes.number,
  };

  state = {
    isClient: false,
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

export default ShoppingBasket;
