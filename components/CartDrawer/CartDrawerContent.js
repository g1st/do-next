import React from 'react';
import { Subscribe } from 'unstated';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';

import CartContainer from '../../containers/CartContainer';
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
  if (props.buyItNow) {
    return (
      <Subscribe to={[CartContainer]}>
        {cart => (
          <div>
            <CartItems>
              <li key={cart.state.buyItNow._id}>
                <Link
                  href={`/piece?id=${cart.state.buyItNow._id}`}
                  as={`/piece/${cart.state.buyItNow._id}`}
                >
                  <a
                    style={{ textDecoration: 'none', height: '48px' }}
                    target="_self"
                    onClick={props.closeDrawer}
                  >
                    <Thumb
                      src={`/static/uploads/${
                        cart.state.buyItNow.images[0].thumb
                      }`}
                    />
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
                    {cart.state.buyItNow.name}
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 300 }}>
                    £{cart.state.buyItNow.price.toFixed(2)}
                  </Typography>
                </ItemInfo>
                <Typography variant="body2">#1</Typography>
              </li>
            </CartItems>
            <Totals />
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead>
                    <Typography variant="body1">Items</Typography>
                  </TableHead>
                  <TableCell>
                    <Typography variant="body1">{1}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>
                    <Typography variant="body1">Shipping</Typography>
                  </TableHead>
                  <TableCell>
                    <Typography variant="body1">
                      {/* or some default postage cost from cart i.e. cart.state.postageprice */}
                      {'Free' || cart.state.count}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>
                    <Typography variant="body1">Total</Typography>
                  </TableHead>
                  <TableCell>
                    <Typography variant="body1">
                      £{cart.state.buyItNow.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </Subscribe>
    );
  } else {
    return (
      <Subscribe to={[CartContainer]}>
        {cart => (
          <div>
            {cart.state.selectedItems.length > 0 ? (
              <CartItems>
                {cart.state.selectedItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={`/piece?id=${item._id}`}
                      as={`/piece/${item._id}`}
                    >
                      <a
                        style={{ textDecoration: 'none', height: '48px' }}
                        target="_self"
                        onClick={props.closeDrawer}
                      >
                        <Thumb
                          src={`/static/uploads/${item.images[0].thumb}`}
                        />
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
                      onClick={() => cart.removeOne(item)}
                      color="secondary"
                      aria-label="Decrease quantity"
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2">{item.quantity}</Typography>
                    <IconButton
                      onClick={() => cart.addItem(item)}
                      color="secondary"
                      aria-label="Increase quantity"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      style={{
                        color: 'rgba(0, 0, 0, 0.26)',
                        marginLeft: '4px'
                      }}
                      aria-label="Remove item"
                      onClick={() =>
                        window.confirm(
                          'Are you sure you want to remove this item?'
                        ) && cart.removeItem(item)
                      }
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </li>
                ))}
              </CartItems>
            ) : (
              <p>Cart is empty</p>
            )}

            <Totals />
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead>
                    <Typography variant="body1">Items</Typography>
                  </TableHead>
                  <TableCell>
                    <Typography variant="body1">
                      {cart.state.totalItems}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>
                    <Typography variant="body1">Shipping</Typography>
                  </TableHead>
                  <TableCell>
                    <Typography variant="body1">
                      {'Free' || cart.state.count}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>
                    <Typography variant="body1">Total</Typography>
                  </TableHead>
                  <TableCell>
                    <Typography variant="body1">
                      £{cart.state.totalPrice.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </Subscribe>
    );
  }
};

export default React.memo(CartDrawerContent);
