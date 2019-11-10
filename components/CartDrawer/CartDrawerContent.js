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
import PromoCode from '../PromoCode/PromoCode';
import { cartHelper } from '../../util/helpers';
import {
  PaymentIcons,
  IconImage,
  StripeIcon,
  AcceptedCards,
  StripeIconLink
} from '../../styles/Checkout';

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
    paddingBottom: 0,
    '& > li': {
      '&:nth-child(even)': {
        backgroundColor: 'rgba(0, 0, 0, 0.02)'
      }
    }
  },
  marginTop: {
    marginTop: '20px'
  },
  cardIcons: {
    padding: '6px 16px'
  },
  discounted: {
    textDecoration: 'line-through'
  }
};

const CartDrawerContent = ({
  classes,
  inForm,
  closeDrawer,
  cart,
  buyItNow,
  buyItNowItem,
  shippingCost,
  discount
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
                  style={{ fill: 'rgba(0, 0, 0, 0.54)', marginLeft: '6px' }}
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
              <Typography
                variant="body2"
                className={discount ? classes.discounted : ''}
                color={discount ? 'textSecondary' : 'textPrimary'}
                inline
              >
                £
                {cartHelper.priceToPay(
                  buyItNow,
                  buyItNowItem,
                  cart,
                  shippingCost
                )}
              </Typography>
              {discount ? (
                <Typography variant="body2" inline>
                  {' '}
                  £
                  {cartHelper.priceToPay(
                    buyItNow,
                    buyItNowItem,
                    cart,
                    shippingCost,
                    discount
                  )}
                </Typography>
              ) : null}
            </ListItemText>
          </ListItem>
          <PromoCode />
          {inForm ? (
            <ListItem className={classes.cardIcons}>
              <PaymentIcons>
                <AcceptedCards>
                  <IconImage src="/static/images/visa.svg" alt="VISA logo" />
                  <IconImage
                    src="/static/images/mastercard.svg"
                    alt="Mastercard logo"
                  />
                  <IconImage
                    src="/static/images/american-express.svg"
                    alt="American Express logo"
                  />
                </AcceptedCards>
                <StripeIconLink
                  href="https://www.stripe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="To Stripe homepage"
                >
                  <StripeIcon
                    src="/static/images/stripe.svg"
                    alt="Stripe logo"
                  />
                </StripeIconLink>
              </PaymentIcons>
            </ListItem>
          ) : null}
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
  shippingCost: state.shippingCost,
  discount: state.promo.discount
});

CartDrawerContent.propTypes = {
  buyItNow: PropTypes.bool
};

export default React.memo(
  connect(mapStateToProps)(withStyles(styles)(CartDrawerContent))
);
