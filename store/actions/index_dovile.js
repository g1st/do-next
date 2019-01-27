import * as actionTypes from '../constants/action-types_dovile';

export const addOne = item => {
  return { type: actionTypes.ADD_ONE, item };
};

export const addToCart = item => {
  return { type: actionTypes.ADD_TO_CART, item };
};

export const removeFromCart = id => {
  return { type: actionTypes.REMOVE_FROM_CART, id };
};

export const increaseQuantity = id => {
  return { type: actionTypes.INCREASE_QUANTITY, id };
};

export const decreaseQuantity = id => {
  return { type: actionTypes.DECREASE_QUANTITY, id };
};
