/* eslint-disable camelcase */
import axios from 'axios';

import { appUrl } from '../../config';
import { getPurchaseDetails } from '../../util/helpers';

export const attemptPayment = ({
  first_name,
  last_name,
  address1,
  address2,
  city,
  country,
  full_country_name,
  email,
  phone,
  additional_info,
  buyItNowItem,
  shippingCost,
  cart,
  stripe,
  postal_code
}) =>
  stripe
    .createToken({
      name: `${first_name} ${last_name}`,
      address_line1: address1,
      address_line2: address2,
      address_city: city,
      address_country: country,
      address_zip: postal_code
    })
    .then(payload => {
      const purchaseDetails = getPurchaseDetails(
        buyItNowItem,
          shippingCost,
        cart
      );

      const { token, error } = payload;
      if (error && error.code === 'postal_code_invalid') {
        return {
          data: {
            errors: {
              msg: 'The postal code provided was incorrect.',
              param: 'additional.postal_code'
            }
          }
        };
      }

      return axios.post(`${appUrl}/api/charge`, {
        token: token.id,
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
          full_country_name,
          postal_code,
          purchaseDetails
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
