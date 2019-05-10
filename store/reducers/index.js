import { combineReducers } from 'redux';
import { shippingPrice } from '../../util/globals';
import { ITEMS_PER_PAGE } from '../../config';

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  BUY_IT_NOW,
  CLEAR_BUY_IT_NOW,
  CLEAR_CART,
  AUTHENTICATE,
  AUTHENTICATE_ERROR,
  DEAUTHENTICATE,
  INCREASE_LOADED_ITEMS
} from '../constants/action-types';

export const initialState = {
  cart: [],
  buyItNow: {},
  shippingCost: shippingPrice,
  authenticate: { token: null, error: false },
  loadMore: { all: ITEMS_PER_PAGE }
};

const cart = (state = initialState.cart, action) => {
  if (action.type === ADD_TO_CART) {
    // check if item is already in the cart
    if (state.some(item => item._id === action.item._id)) return state;

    return [...state, { ...action.item, images: [...action.item.images] }];
  }
  if (action.type === REMOVE_FROM_CART) {
    return state.filter(item => item._id !== action.id);
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
  return state;
};

const shippingCost = (state = initialState.shippingCost) => state;

const authenticate = (state = initialState.authenticate, action) => {
  if (AUTHENTICATE === action.type) {
    return { token: action.payload };
  }
  if (DEAUTHENTICATE === action.type) {
    return { token: null };
  }
  if (AUTHENTICATE_ERROR == action.type) {
    return { error: action.payload };
  }
  return state;
};

const loadMore = (state = initialState.loadMore, action) => {
  if (INCREASE_LOADED_ITEMS === action.type) {
    return {
      ...state,
      [action.collection]:
        (state[action.collection] || ITEMS_PER_PAGE) + ITEMS_PER_PAGE
    };
  }
  return state;
};

const dovile = combineReducers({
  cart,
  buyItNow,
  shippingCost,
  loadMore,
  authenticate
});

export default dovile;
