import * as actionTypes from '../constants/action-types';
import Router from 'next/router';
import axios from 'axios';
import { setCookie, removeCookie } from '../../util/cookie';
import { authUrl } from '../../config';

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

export const clearCart = () => {
  return { type: actionTypes.CLEAR_CART };
};

export const clearBuyItNow = () => {
  return { type: actionTypes.CLEAR_BUY_IT_NOW };
};

export const increaseLoadedItems = () => {
  return { type: actionTypes.INCREASE_LOADED_ITEMS };
};

// gets token from the api and stores it in the redux store and in cookie
export const authenticate = ({ email, password }, type) => {
  if (type !== 'signin' && type !== 'signup') {
    throw new Error('Wrong API call!');
  }
  return dispatch => {
    axios
      .post(`${authUrl}/${type}`, { email, password })
      .then(response => {
        setCookie('token', response.data.token);
        Router.push('/');
        dispatch({
          type: actionTypes.AUTHENTICATE,
          payload: response.data.token
        });
      })
      .catch(err => {
        // console.log(err.response);
        throw new Error(err);
      });
  };
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = token => {
  return dispatch => {
    dispatch({ type: actionTypes.AUTHENTICATE, payload: token });
  };
};

// removing the token
export const deauthenticate = () => {
  return dispatch => {
    removeCookie('token');
    Router.push('/');
    dispatch({ type: actionTypes.DEAUTHENTICATE });
  };
};
