/* eslint-disable camelcase */
import axios from 'axios';

import { appUrl } from '../../config';
import { cartHelper } from '../../util/helpers';

export const attemptPayment = ({
  first_name,
  last_name,
  address1,
  address2,
  city,
  country,
  email,
  phone,
  additional_info,
  buyItNowItem,
  shippingCost,
  cart,
  stripe
}) =>
  stripe
    .createToken({
      name: `${first_name} ${last_name}`,
      address_line1: address1,
      address_line2: address2,
      address_city: city,
      address_country: country
    })
    .then(payload => {
      let purchaseDetails;
      if (Object.prototype.hasOwnProperty.call(buyItNowItem, 'name')) {
        purchaseDetails = {
          ...buyItNowItem,
          shippingCost,
          boughtFrom: 'buyItNow'
        };
      } else {
        const selectedItems = cart;
        const totalItems = cartHelper.totalItems(cart);
        const totalPrice = cartHelper.totalPrice(cart);
        purchaseDetails = {
          selectedItems,
          totalItems,
          totalPrice,
          boughtFrom: 'cart',
          shippingCost
        };
      }
      return axios.post(`${appUrl}/api/charge`, {
        token: payload.token.id,
        payload,
        additional: {
          email,
          first_name,
          last_name,
          phone,
          address1,
          address2,
          city,
          additional_info,
          country,
          purchaseDetails
        }
      });
    });
