import React from 'react';
import { Subscribe } from 'unstated';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';

import CartContainer from '../../containers/CartContainer';
import { CartItems, Thumb, ItemInfo, Totals } from '../../styles/CartDrawer';

const CartDrawerContent = props => (
  <Subscribe to={[CartContainer]}>
    {cart => (
      <div>
        {cart.state.selectedItems.length > 0 ? (
          <CartItems>
            {cart.state.selectedItems.map((item, i) => (
              <li key={i}>
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
                    {item.price}£
                  </Typography>
                </ItemInfo>
                <IconButton
                  onClick={() => cart.addItem(item)}
                  color="secondary"
                  aria-label="Increase quantity"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2">{item.quantity}</Typography>
                <IconButton
                  disabled={item.quantity > 1 ? false : true}
                  onClick={() => cart.removeOne(item)}
                  color="secondary"
                  aria-label="Decrease quantity"
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <IconButton
                  style={{
                    color: 'rgba(0, 0, 0, 0.26)',
                    marginLeft: '4px'
                  }}
                  aria-label="Remove item"
                  onClick={() => cart.removeItem(item)}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </li>
            ))}
          </CartItems>
        ) : (
          <p>Cart is empty</p>
        )}

        <Totals>
          <div>Unique items: {cart.state.count}</div>
          <div>Total items: {cart.state.totalItems}</div>
          <div>Total price: {cart.state.totalPrice}£</div>
        </Totals>
      </div>
    )}
  </Subscribe>
);

export default CartDrawerContent;
