/* eslint-disable camelcase */
import axios from 'axios';

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
  postal_code,
  promo,
}) =>
  stripe
    .createPaymentMethod('card', {
      billing_details: {
        name: `${first_name} ${last_name}`,
        email,
        phone,
        address: {
          line1: address1,
          line2: address2,
          city,
          country,
          postal_code,
        },
      },
    })
    .then((payload) => {
      const purchaseDetails = getPurchaseDetails(
        buyItNowItem,
        shippingCost,
        cart,
        promo
      );

      const { paymentMethod, error } = payload;
      if (error && error.code === 'postal_code_invalid') {
        return {
          data: {
            errors: [
              {
                msg: 'The postal code provided was incorrect.',
                param: 'additional.postal_code',
              },
            ],
          },
        };
      }

      if (error) {
        return {
          data: {
            errors: [
              {
                msg: error.message,
                param: '_error',
              },
            ],
          },
        };
      }

      return axios.post(`${process.env.APP_URL}/api/charge`, {
        payment_method_id: paymentMethod.id,
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
          purchaseDetails,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return {
        data: {
          errors: [
            {
              msg: 'error from stripe.js',
              param: '_error',
            },
          ],
        },
      };
    });
