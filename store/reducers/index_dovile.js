import { combineReducers } from 'redux';

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_ONE
} from '../constants/action-types_dovile';

export const initialState = {
  cart: []
};

const cart = (state = initialState.cart, action) => {
  if (action.type === ADD_ONE) {
    return [...state, action.item];
    // return state.concat(action.item)
    // return Object.assign({}, state, {
    //   cart: state.cart.concat(action.item)
    //   // cart: [...state.cart, action.item] // or this ?
    // });
  }
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
  return state;
};

const dovile = combineReducers({
  cart
});

// const dovile = (state = initialState, action) => {
//   return {
//     ...state,
//     cart: cart(state.cart, action)
//   };
// };

export default dovile;
