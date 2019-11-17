import { combineReducers } from 'redux';
import { postageForCountry } from '../../util/globals';
import { promoCodes } from '../../util/promoCodes';
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
  INCREASE_LOADED_ITEMS,
  COUNT_SHIPPING_COST,
  ADD_INSTAGRAM_DATA,
  ADD_DISCOUNT,
  FILTER_OPTION,
  CLEAR_FILTER_OPTION
} from '../constants/action-types';

export const initialState = {
  cart: [],
  buyItNow: {},
  shippingCost: postageForCountry('GB'),
  authenticate: { token: null, error: false },
  loadMore: { all: ITEMS_PER_PAGE },
  instagramData: { data: [], nextPage: null },
  promo: {},
  filter: {}
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

const shippingCost = (state = initialState.shippingCost, action) => {
  if (COUNT_SHIPPING_COST === action.type) {
    return postageForCountry(action.country);
  }
  return state;
};

const authenticate = (state = initialState.authenticate, action) => {
  if (AUTHENTICATE === action.type) {
    return { token: action.payload };
  }
  if (DEAUTHENTICATE === action.type) {
    return { token: null };
  }
  if (AUTHENTICATE_ERROR === action.type) {
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

const instagramData = (state = initialState.instagramData, action) => {
  if (ADD_INSTAGRAM_DATA === action.type) {
    return {
      data: state.data.concat(action.payload.data),
      nextPage: action.payload.nextPage
    };
  }
  return state;
};

const promo = (state = initialState.promo, action) => {
  if (ADD_DISCOUNT === action.type) {
    return {
      code: action.code,
      discount: promoCodes.filter(obj => obj.code === action.code)[0].discount
    };
  }
  return state;
};

const filter = (state = initialState.filter, action) => {
  if (FILTER_OPTION === action.type) {
    return {
      option: action.option
    };
  }
  if (CLEAR_FILTER_OPTION === action.type) {
    return {
      option: ''
    };
  }
  return state;
};

const dovile = combineReducers({
  cart,
  buyItNow,
  shippingCost,
  loadMore,
  authenticate,
  instagramData,
  promo,
  filter
});

export default dovile;
