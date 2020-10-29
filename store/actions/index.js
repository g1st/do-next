import Router from 'next/router';
import axios from 'axios';
import * as actionTypes from '../constants/action-types';
import { setCookie, removeCookie } from '../../util/cookie';

export const addToCart = (item) => ({ type: actionTypes.ADD_TO_CART, item });

export const removeFromCart = (id) => ({
  type: actionTypes.REMOVE_FROM_CART,
  id,
});

export const clearCart = () => ({ type: actionTypes.CLEAR_CART });

export const increaseLoadedItems = (collection) => ({
  type: actionTypes.INCREASE_LOADED_ITEMS,
  collection,
});

export const addInstagramData = (data, currentlyVisible) => ({
  type: actionTypes.ADD_INSTAGRAM_DATA,
  payload: { data, currentlyVisible },
});

export const updateInstagramVisibleItems = (currentlyVisible) => ({
  type: actionTypes.UPDATE_INSTAGRAM_VISIBLE_ITEMS,
  payload: { currentlyVisible },
});

// gets token from the api and stores it in the redux store and in cookie
export const authenticate = ({ email, password }, type) => {
  if (type !== 'signin' && type !== 'signup') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_AUTH_URL}/${type}`, { email, password })
      .then((response) => {
        setCookie('token', response.data.token);
        Router.push('/admin');
        dispatch({
          type: actionTypes.AUTHENTICATE,
          payload: response.data.token,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AUTHENTICATE_ERROR,
          payload: err.message,
        });
        console.error(err);
      });
  };
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = (token) => (dispatch) => {
  dispatch({ type: actionTypes.AUTHENTICATE, payload: token });
};

// removing the token
export const deauthenticate = () => (dispatch) => {
  removeCookie('token');
  Router.push('/');
  dispatch({ type: actionTypes.DEAUTHENTICATE });
};

export const changeOption = (option) => ({
  type: actionTypes.FILTER_OPTION,
  option,
});

export const clearOption = () => ({
  type: actionTypes.CLEAR_FILTER_OPTION,
});

export const changeDisplay = (option) => ({
  type: actionTypes.DISPLAY_OPTION,
  option,
});
