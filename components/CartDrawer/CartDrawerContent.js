import React from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';

import { cart } from '../../util/helpers';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from '../../store/actions/index_dovile';
import {
  CartItems,
  Thumb,
  ItemInfo,
  Totals,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '../../styles/CartDrawer';

const CartDrawerContent = props => {
  // return (
  // if (props.buyItNow && cart.state.buyItNow.hasOwnProperty('name')) {
  //   return (
  //     <div>
  //       <CartItems>
  //         <li key={cart.state.buyItNow._id}>
  //           <Link
  //             href={`/piece?id=${cart.state.buyItNow._id}`}
  //             as={`/piece/${cart.state.buyItNow._id}`}
  //           >
  //             <a
  //               style={{ textDecoration: 'none', height: '48px' }}
  //               target="_self"
  //               onClick={props.closeDrawer}
  //             >
  //               <Thumb
  //                 src={`/static/uploads/${
  //                   cart.state.buyItNow.images[0].thumb
  //                 }`}
  //               />
  //             </a>
  //           </Link>
  //           <ItemInfo>
  //             <Typography
  //               variant="body2"
  //               style={{
  //                 overflow: 'hidden',
  //                 whiteSpace: 'nowrap',
  //                 width: '98px',
  //                 textOverflow: 'ellipsis'
  //               }}
  //             >
  //               {cart.state.buyItNow.name}
  //             </Typography>
  //             <Typography variant="body2" style={{ fontWeight: 300 }}>
  //               £{cart.state.buyItNow.price.toFixed(2)}
  //             </Typography>
  //           </ItemInfo>
  //           <Typography variant="body2">#1</Typography>
  //         </li>
  //       </CartItems>
  //       <Totals />
  //       <Table>
  //         <TableBody>
  //           <TableRow>
  //             <TableHead>
  //               <Typography variant="body1">Items</Typography>
  //             </TableHead>
  //             <TableCell>
  //               <Typography variant="body1">{1}</Typography>
  //             </TableCell>
  //           </TableRow>
  //           <TableRow>
  //             <TableHead>
  //               <Typography variant="body1">Shipping</Typography>
  //             </TableHead>
  //             <TableCell>
  //               <Typography variant="body1">
  //                 {/* or some default postage cost from cart i.e. cart.state.postageprice */}
  //                 {'Free' || cart.state.count}
  //               </Typography>
  //             </TableCell>
  //           </TableRow>
  //           <TableRow>
  //             <TableHead>
  //               <Typography variant="body1">Total</Typography>
  //             </TableHead>
  //             <TableCell>
  //               <Typography variant="body1">
  //                 £{cart.state.buyItNow.price.toFixed(2)}
  //               </Typography>
  //             </TableCell>
  //           </TableRow>
  //         </TableBody>
  //       </Table>
  //     </div>
  //   );
  // } else {
  // const totalItems = cart =>
  //   cart.reduce((acc, item) => {
  //     acc += item.quantity;
  //     return acc;
  //   }, 0);

  // const totalPrice = cart =>
  //   cart.reduce((acc, item) => {
  //     acc += item.price * item.quantity;
  //     return acc;
  //   }, 0);

  return (
    <div>
      {props.cart.length > 0 ? (
        <>
          <CartItems>
            {props.cart.map(item => (
              <li key={item._id}>
                <Link href={`/piece?id=${item._id}`} as={`/piece/${item._id}`}>
                  <a
                    style={{ textDecoration: 'none', height: '48px' }}
                    target="_self"
                    onClick={props.closeDrawer}
                  >
                    <Thumb src={`/static/uploads/${item.images[0].thumb}`} />
                  </a>
                </Link>
                <ItemInfo>
                  <Typography
                    variant="body2"
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      width: '98px',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 300 }}>
                    £{item.price.toFixed(2)}
                  </Typography>
                </ItemInfo>
                <IconButton
                  disabled={item.quantity > 1 ? false : true}
                  onClick={() => props.decreaseQuantity(item._id)}
                  color="secondary"
                  aria-label="Decrease quantity"
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2">{item.quantity}</Typography>
                <IconButton
                  onClick={() => props.increaseQuantity(item._id)}
                  color="secondary"
                  aria-label="Increase quantity"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <IconButton
                  style={{ color: 'rgba(0, 0, 0, 0.26)', marginLeft: '4px' }}
                  aria-label="Remove item"
                  onClick={() =>
                    window.confirm(
                      'Are you sure you want to remove this item?'
                    ) && props.removeFromCart(item._id)
                  }
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </li>
            ))}
          </CartItems>

          <Totals />
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>
                  <Typography variant="body1">Items</Typography>
                </TableHead>
                <TableCell>
                  <Typography variant="body1">
                    {cart.totalItems(props.cart)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>
                  <Typography variant="body1">Shipping</Typography>
                </TableHead>
                <TableCell>
                  <Typography variant="body1">{'£8' || 'Free'}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>
                  <Typography variant="body1">Total</Typography>
                </TableHead>
                <TableCell>
                  <Typography variant="body1">
                    £{cart.totalPrice(props.cart).toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => {
  return {
    increaseQuantity: id => dispatch(increaseQuantity(id)),
    decreaseQuantity: id => dispatch(decreaseQuantity(id)),
    removeFromCart: id => dispatch(removeFromCart(id))
  };
};

export default React.memo(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartDrawerContent)
);
