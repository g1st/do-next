import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
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
    padding: '10px',
  },
  textRight: {
    textAlign: 'right',
    padding: 0,
  },
  list: {
    paddingBottom: 0,
    '& > li': {
      '&:nth-child(even)': {
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
      },
    },
  },
  marginTop: {
    marginTop: '20px',
  },
  cardIcons: {
    padding: '6px 16px',
  },
};

const CartDrawerContent = ({ classes, closeDrawer, cart }) => {
  const buttonClickHandler = () => {
    Router.push('/gallery');
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
        size="large"
        variant="contained"
        color="secondary"
        onClick={() => buttonClickHandler()}
        onKeyDown={(e) => keyDownHandler(e)}
        fullWidth
      >
        GALLERY
      </Button>
    </>
  );
  if (cart.length > 0) {
    content = (
      <div>
        <CartItem data={cart} closeDrawer={closeDrawer} />
        <List className={classes.list}>
          <ListItem>
            <ListItemText>
              <Typography variant="body1">Items</Typography>
            </ListItemText>
            <ListItemText className={classes.textRight}>
              <Typography variant="body1">
                {cartHelper.totalItems(cart)}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <Typography display="inline" variant="body1">
              Shipping
            </Typography>
            <ListItemText className={classes.textRight}>
              <Typography variant="body1">Free</Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="body1">Total</Typography>
            </ListItemText>
            <ListItemText className={classes.textRight}>
              <Typography variant="body1" color="textPrimary" display="inline">
                £{cartHelper.totalPrice(cart)}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

CartDrawerContent.propTypes = {
  classes: PropTypes.object,
};

export default React.memo(
  connect(mapStateToProps)(withStyles(styles)(CartDrawerContent))
);
