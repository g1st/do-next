export const cart = {
  totalItems: cart =>
    cart.reduce((acc, item) => {
      acc += item.quantity;
      return acc;
    }, 0),

  totalPrice: (cart, shippingCost = 0) => {
    const foo = cart.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);
    return foo + shippingCost;
  }
};
