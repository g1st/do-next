export const cart = {
  totalItems: cart =>
    cart.reduce((acc, item) => {
      acc += item.quantity;
      return acc;
    }, 0),

  totalPrice: cart =>
    cart.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0)
};
