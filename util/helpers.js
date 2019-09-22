export const cartHelper = {
  totalItems: cart =>
    cart.reduce((acc, item) => {
      const items = acc + item.quantity;
      return items;
    }, 0),

  totalPrice: (cart, shippingCost = 0) => {
    const basePrice = cart.reduce((acc, item) => {
      const price = acc + item.price * item.quantity;
      return price;
    }, 0);
    const totalPrice = basePrice + shippingCost;
    return totalPrice;
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveCart = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const onImageError = event => {
  const defaultImage = '/static/images/fallback.png';

  if (event.target.src.indexOf('/static/images/fallback.png') === -1) {
    event.target.src = defaultImage;
    event.target.srcset = '';
  }
};

export const pluralise = category => {
  switch (category) {
    case 'brooch':
      return 'brooches';
    case 'ring':
      return 'rings';
    case 'earring':
      return 'earrings';
    case 'necklace':
      return 'necklaces';
    case 'bracelet':
      return 'bracelets';
    case 'other':
      return 'other';
    default:
      return 'all types';
  }
};

exports.getPurchaseDetails = (buyItNowItem, shippingCost, cart) => {
  if (Object.prototype.hasOwnProperty.call(buyItNowItem, 'name')) {
    return {
      ...buyItNowItem,
      shippingCost,
      boughtFrom: 'buyItNow'
    };
  } else {
    const selectedItems = cart;
    const totalItems = this.cartHelper.totalItems(cart);
    const totalPrice = this.cartHelper.totalPrice(cart);
    return {
      selectedItems,
      totalItems,
      totalPrice,
      boughtFrom: 'cart',
      shippingCost
    };
  }
};
