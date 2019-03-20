import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  buyItNowIncreaseQuantity,
  buyItNowDecreaseQuantity,
  clearBuyItNow
} from '../../store/actions';
import { CartItems, Thumb, ItemInfo } from '../../styles/CartDrawer';

const CartItem = ({ buyItNow, data, closeDrawer }) => {
  const handleRemove = id => (buyItNow ? clearBuyItNow() : removeFromCart(id));

  return (
    <CartItems>
      {data.map(item => (
        <li key={item._id}>
          <Link href={`/piece?id=${item._id}`} as={`/piece/${item._id}`}>
            <a
              style={{ textDecoration: 'none', height: '48px' }}
              target="_self"
              onClick={closeDrawer}
              onKeyDown={closeDrawer}
              role="link"
              tabIndex={0}
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
            disabled={!(item.quantity > 1)}
            onClick={
              buyItNow
                ? () => buyItNowDecreaseQuantity()
                : () => decreaseQuantity(item._id)
            }
            color="secondary"
            aria-label="Decrease quantity"
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{item.quantity}</Typography>
          <IconButton
            onClick={
              buyItNow
                ? () => buyItNowIncreaseQuantity()
                : () => increaseQuantity(item._id)
            }
            color="secondary"
            aria-label="Increase quantity"
          >
            <AddIcon fontSize="small" />
          </IconButton>
          <IconButton
            style={{ color: 'rgba(0, 0, 0, 0.26)', marginLeft: '4px' }}
            aria-label="Remove item"
            onClick={() =>
              window.confirm('Are you sure you want to remove this item?') &&
              handleRemove(item._id)
            }
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </li>
      ))}
    </CartItems>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  buyItNowItem: state.buyItNow
});

const mapDispatchToProps = dispatch => ({
  increaseQuantity: id => dispatch(increaseQuantity(id)),
  decreaseQuantity: id => dispatch(decreaseQuantity(id)),
  removeFromCart: id => dispatch(removeFromCart(id)),
  buyItNowIncreaseQuantity: () => dispatch(buyItNowIncreaseQuantity()),
  buyItNowDecreaseQuantity: () => dispatch(buyItNowDecreaseQuantity()),
  clearBuyItNow: () => dispatch(clearBuyItNow())
});

CartItem.propTypes = {
  data: PropTypes.object,
  buyItNow: PropTypes.bool,
  closeDrawer: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItem);
