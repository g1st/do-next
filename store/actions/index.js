import Router from 'next/router';
import axios from 'axios';
import * as actionTypes from '../constants/action-types';
import { setCookie, removeCookie } from '../../util/cookie';
import { authUrl } from '../../config';

export const addToCart = item => ({ type: actionTypes.ADD_TO_CART, item });

export const removeFromCart = id => ({
  type: actionTypes.REMOVE_FROM_CART,
  id
});

export const increaseQuantity = id => ({
  type: actionTypes.INCREASE_QUANTITY,
  id
});

export const decreaseQuantity = id => ({
  type: actionTypes.DECREASE_QUANTITY,
  id
});

export const buyItNowIncreaseQuantity = () => ({
  type: actionTypes.BUY_IT_NOW_INCREASE_QUANTITY
});

export const buyItNowDecreaseQuantity = () => ({
  type: actionTypes.BUY_IT_NOW_DECREASE_QUANTITY
});

export const buyItNow = item => ({ type: actionTypes.BUY_IT_NOW, item });

export const clearCart = () => ({ type: actionTypes.CLEAR_CART });

export const clearBuyItNow = () => ({ type: actionTypes.CLEAR_BUY_IT_NOW });

export const increaseLoadedItems = () => ({
  type: actionTypes.INCREASE_LOADED_ITEMS
});

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
export const reauthenticate = token => dispatch => {
  dispatch({ type: actionTypes.AUTHENTICATE, payload: token });
};

// removing the token
export const deauthenticate = () => dispatch => {
  removeCookie('token');
  Router.push('/');
  dispatch({ type: actionTypes.DEAUTHENTICATE });
};
