import * as actionTypes from '../constants/action-types';

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

export const buyItNowIncreaseQuantity = () => {
  return { type: actionTypes.BUY_IT_NOW_INCREASE_QUANTITY };
};

export const buyItNowDecreaseQuantity = () => {
  return { type: actionTypes.BUY_IT_NOW_DECREASE_QUANTITY };
};

export const buyItNow = item => {
  return { type: actionTypes.BUY_IT_NOW, item };
};

export const clearState = () => {
  return { type: actionTypes.CLEAR_STATE };
};

export const clearBuyItNow = () => {
  return { type: actionTypes.CLEAR_BUY_IT_NOW };
};
