import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CartItem from './CartItem';
import { cartHelper } from '../../util/helpers';

const styles = {
  button: {
    margin: '0 auto',
    display: 'flex',
    marginTop: '32px',
    maxWidth: '300px',
    padding: '10px'
  },
  textRight: {
    textAlign: 'right',
    padding: 0
  },
  list: {
    '& > li': {
      '&:nth-child(even)': {
        backgroundColor: 'rgba(0, 0, 0, 0.02)'
      }
    }
  },
  marginTop: {
    marginTop: '20px'
  }
};

const CartDrawerContent = ({
  classes,
  inForm,
  closeDrawer,
  cart,
  buyItNow,
  buyItNowItem,
  shippingCost
}) => {
  const buttonClickHandler = () => {
    Router.push('/works');
    closeDrawer();
  };

  const keyDownHandler = ({ key }) => {
    if (key === 'Enter') {
      buttonClickHandler();
    }
  };

  let content = (
    <>
      <Typography variant="body1" align="center" className={classes.marginTop}>
        Cart is currently empty.
      </Typography>
      <Button
        className={classes.button}
        size="medium"
        variant="contained"
        color="secondary"
        onClick={() => buttonClickHandler()}
        onKeyDown={e => keyDownHandler(e)}
        fullWidth
      >
        SHOP
      </Button>
    </>
  );
  if (cart.length > 0 || buyItNow) {
    content = (
      <div>
        <CartItem
          data={buyItNow ? [buyItNowItem] : cart}
          buyItNow={buyItNow}
          closeDrawer={closeDrawer}
        />
        <List className={classes.list}>
          <ListItem>
            <ListItemText>Items</ListItemText>
            <ListItemText className={classes.textRight}>
              {buyItNow ? buyItNowItem.quantity : cartHelper.totalItems(cart)}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Shipping</ListItemText>
            <ListItemText className={classes.textRight}>
              {shippingCost !== 0 ? `£${shippingCost.toFixed(2)}` : 'Free'}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Total</ListItemText>
            <ListItemText className={classes.textRight}>
              £
              {buyItNow
                ? cartHelper.totalPrice([buyItNowItem], shippingCost).toFixed(2)
                : cartHelper.totalPrice(cart, shippingCost).toFixed(2)}
            </ListItemText>
          </ListItem>
        </List>
      </div>
    );
  }

  if (inForm) {
    content = <Paper>{content}</Paper>;
  }

  return content;
};

const mapStateToProps = state => ({
  cart: state.cart,
  buyItNowItem: state.buyItNow,
  shippingCost: state.shippingCost
});

CartDrawerContent.propTypes = {
  buyItNow: PropTypes.bool
};

export default React.memo(
  connect(mapStateToProps)(withStyles(styles)(CartDrawerContent))
);
