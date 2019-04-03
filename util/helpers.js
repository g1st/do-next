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

export const onImageError = event => {
  const defaultImage = '/static/images/logo.png';

  if (event.target.src.indexOf('/static/images/logo.png') === -1) {
    event.target.src = defaultImage;
    event.target.srcset = '';
  }
};
