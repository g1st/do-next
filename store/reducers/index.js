import { combineReducers } from 'redux';
import { ITEMS_PER_PAGE } from '../../util/globals';

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  AUTHENTICATE,
  AUTHENTICATE_ERROR,
  DEAUTHENTICATE,
  INCREASE_LOADED_ITEMS,
  ADD_INSTAGRAM_DATA,
  UPDATE_INSTAGRAM_VISIBLE_ITEMS,
  FILTER_OPTION,
  DISPLAY_OPTION,
  CLEAR_FILTER_OPTION,
} from '../constants/action-types';

export const initialState = {
  cart: [],
  authenticate: { token: null, error: false },
  loadMore: { all: ITEMS_PER_PAGE },
  instagramData: { data: [], currentlyVisible: 0 },
  filter: { option: '', display: 'all' },
};

const cart = (state = initialState.cart, action) => {
  if (action.type === ADD_TO_CART) {
    // check if item is already in the cart
    if (state.some((item) => item._id === action.item._id)) return state;

    return [...state, { ...action.item, images: [...action.item.images] }];
  }
  if (action.type === REMOVE_FROM_CART) {
    return state.filter((item) => item._id !== action.id);
  }
  if (CLEAR_CART === action.type) {
    return [];
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
        (state[action.collection] || ITEMS_PER_PAGE) + ITEMS_PER_PAGE,
    };
  }
  return state;
};

const instagramData = (state = initialState.instagramData, action) => {
  if (ADD_INSTAGRAM_DATA === action.type) {
    return {
      data: action.payload.data,
      currentlyVisible: action.payload.currentlyVisible,
    };
  }
  if (UPDATE_INSTAGRAM_VISIBLE_ITEMS === action.type) {
    return {
      ...state,
      currentlyVisible:
        state.currentlyVisible + action.payload.currentlyVisible,
    };
  }
  return state;
};

const filter = (state = initialState.filter, action) => {
  if (FILTER_OPTION === action.type) {
    return {
      ...state,
      option: action.option,
    };
  }
  if (CLEAR_FILTER_OPTION === action.type) {
    return {
      ...state,
      option: '',
    };
  }
  if (DISPLAY_OPTION === action.type) {
    return { ...state, display: action.option };
  }
  return state;
};

const dovile = combineReducers({
  cart,
  loadMore,
  authenticate,
  instagramData,
  filter,
});

export default dovile;
