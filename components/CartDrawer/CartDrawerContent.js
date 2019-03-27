import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';

import CartItem from './CartItem';
import { cart } from '../../util/helpers';
import {
  Totals,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '../../styles/CartDrawer';

const styles = {
  button: {
    margin: '0 auto',
    display: 'flex',
    marginTop: '32px'
  }
};

const CartDrawerContent = props => {
  const buttonClickHandler = () => {
    Router.push('/works');
    props.closeDrawer();
  };

  const { classes } = props;

  let content = (
    <>
      <Typography variant="body1" align="center">
        Cart is currently empty.
      </Typography>
      <Button
        className={classes.button}
        size="medium"
        variant="contained"
        color="secondary"
        onClick={() => buttonClickHandler()}
      >
        SHOP
      </Button>
    </>
  );
  if (props.cart.length > 0 || props.buyItNow) {
    content = (
      <>
        <CartItem
          data={props.buyItNow ? [props.buyItNowItem] : props.cart}
          buyItNow={props.buyItNow}
        />
        <Totals />
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>
                <Typography variant="body1">Items</Typography>
              </TableHead>
              <TableCell>
                <Typography variant="body1">
                  {props.buyItNow
                    ? props.buyItNowItem.quantity
                    : cart.totalItems(props.cart)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>
                <Typography variant="body1">Shipping</Typography>
              </TableHead>
              <TableCell>
                <Typography variant="body1">
                  {props.shippingCost !== 0
                    ? `£${props.shippingCost.toFixed(2)}`
                    : 'Free'}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>
                <Typography variant="body1">Total</Typography>
              </TableHead>
              <TableCell>
                <Typography variant="body1">
                  £
                  {props.buyItNow
                    ? cart
                        .totalPrice([props.buyItNowItem], props.shippingCost)
                        .toFixed(2)
                    : cart
                        .totalPrice(props.cart, props.shippingCost)
                        .toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );
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
