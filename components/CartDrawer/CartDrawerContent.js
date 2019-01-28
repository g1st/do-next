import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

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

const SHIPPING_PRICE = 5; // pounds

const CartDrawerContent = props => {
  if (props.cart.length > 0 || props.buyItNow) {
    return (
      <div>
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
                  {`£${SHIPPING_PRICE}` || 'Free'}
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
                    ? cart.totalPrice([props.buyItNowItem]).toFixed(2)
                    : cart.totalPrice(props.cart).toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
  return <p>Cart is empty</p>;
};

const mapStateToProps = state => ({
  cart: state.cart,
  buyItNowItem: state.buyItNow
});

CartDrawerContent.propTypes = {
  buyItNow: PropTypes.bool
};

export default React.memo(connect(mapStateToProps)(CartDrawerContent));
