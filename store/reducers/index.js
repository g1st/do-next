import { combineReducers } from 'redux';

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  BUY_IT_NOW_INCREASE_QUANTITY,
  BUY_IT_NOW_DECREASE_QUANTITY,
  BUY_IT_NOW,
  CLEAR_BUY_IT_NOW,
  CLEAR_CART
} from '../constants/action-types';

export const initialState = {
  cart: [],
  buyItNow: {}
};

const cart = (state = initialState.cart, action) => {
  if (action.type === ADD_TO_CART) {
    // check if item is already in the cart
    if (state.some(item => item._id === action.item._id)) return state;

    return [...state, action.item];
  }
  if (action.type === REMOVE_FROM_CART) {
    return state.filter(item => item._id !== action.id);
  }
  if (action.type === INCREASE_QUANTITY) {
    return state.map(item => {
      if (item._id === action.id) item.quantity++;
      return item;
    });
  }
  if (action.type === DECREASE_QUANTITY) {
    return state.map(item => {
      if (item.quantity > 0 && item._id === action.id) item.quantity--;
      return item;
    });
  }
  if (CLEAR_CART === action.type) {
    return [];
  }
  return state;
};

const buyItNow = (state = initialState.buyItNow, action) => {
  if (BUY_IT_NOW === action.type) {
    return action.item;
  }
  if (CLEAR_BUY_IT_NOW === action.type) {
    return {};
  }
  if (BUY_IT_NOW_DECREASE_QUANTITY === action.type) {
    if (state.quantity > 0) {
      return {
        ...state,
        quantity: state.quantity - 1
      };
    }
  }
  if (BUY_IT_NOW_INCREASE_QUANTITY === action.type) {
    return {
      ...state,
      quantity: state.quantity + 1
    };
  }
  return state;
};

const dovile = combineReducers({
  cart,
  buyItNow
});

export default dovile;