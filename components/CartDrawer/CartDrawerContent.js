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
  ListItemText,
  Tooltip
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
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
      <Typography variant="body2" align="center" className={classes.marginTop}>
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
        GALLERY
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
            <ListItemText>
              <Typography variant="body2">Items</Typography>
            </ListItemText>
            <ListItemText className={classes.textRight}>
              <Typography variant="body2">
                {buyItNow ? buyItNowItem.quantity : cartHelper.totalItems(cart)}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <Typography inline variant="body2">
              Shipping
            </Typography>
            <div classes={{ display: 'inline-block' }}>
              <Tooltip
                enterTouchDelay={0}
                aria-label="Info"
                placement="right"
                title={
                  <>
                    <Typography variant="body2" style={{ color: '#fff' }}>
                      UK - Free
                    </Typography>
                    <Typography variant="body2" style={{ color: '#fff' }}>
                      EU - £9
                    </Typography>
                    <Typography variant="body2" style={{ color: '#fff' }}>
                      Worldwide - £16
                    </Typography>
                  </>
                }
              >
                <InfoIcon
                  fontSize="small"
                  style={{ fill: 'rgba(0, 0, 0, 0.87)', marginLeft: '6px' }}
                />
              </Tooltip>
            </div>
            <ListItemText className={classes.textRight}>
              <Typography variant="body2">
                {shippingCost !== 0 ? `£${shippingCost.toFixed(2)}` : 'Free'}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="body2">Total</Typography>
            </ListItemText>
            <ListItemText className={classes.textRight}>
              <Typography variant="body2">
                £
                {buyItNow
                  ? cartHelper
                      .totalPrice([buyItNowItem], shippingCost)
                      .toFixed(2)
                  : cartHelper.totalPrice(cart, shippingCost).toFixed(2)}
              </Typography>
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
