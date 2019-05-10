/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import {
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  CardNumberElement
} from 'react-stripe-elements';

import StripeElementWrapper from './StripeElementWrapper';

const StripeDetailForm = ({
  data: { card_number, card_expiration, CVC_number, stripe_errors, zip_code },
  handleStripeChange
}) => {
  let cardNumberError = null;
  if (card_number.error) {
    cardNumberError = card_number.error;
  } else if (stripe_errors) {
    if (card_number.empty) {
      cardNumberError = `Your card's number is blank`;
    }
  }
  let postCodeError = null;
  if (zip_code.error) {
    postCodeError = zip_code.error;
  } else if (stripe_errors) {
    if (zip_code.empty) {
      postCodeError = `Your card's postal code is blank.`;
    }
  }
  let cvcError = null;
  if (CVC_number.error) {
    cvcError = CVC_number.error;
  } else if (stripe_errors) {
    if (CVC_number.empty) {
      cvcError = `Your card's security number is blank.`;
    }
  }
  let cardExpiryError = null;
  if (card_expiration.error) {
    cardExpiryError = card_expiration.error;
  } else if (stripe_errors) {
    if (card_expiration.empty) {
      cardExpiryError = `Your card's expiration day is blank.`;
    }
  }

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6}>
        <StripeElementWrapper
          label="Card Number"
          placeholder="1234 1234 1234 1234"
          component={CardNumberElement}
          name="card_number"
          onChange={handleStripeChange}
          error={cardNumberError}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StripeElementWrapper
          label="Expiry (MM / YY)"
          component={CardExpiryElement}
          name="card_expiration"
          onChange={handleStripeChange}
          error={cardExpiryError}
        />
      </Grid>
      <Grid item xs={6}>
        <StripeElementWrapper
          label="CVC"
          component={CardCVCElement}
          name="CVC_number"
          onChange={handleStripeChange}
          error={cvcError}
        />
      </Grid>
      <Grid item xs={6}>
        <StripeElementWrapper
          component={PostalCodeElement}
          error={postCodeError}
          label="Postal / ZIP code"
          name="zip_code"
          onChange={handleStripeChange}
        />
      </Grid>
    </React.Fragment>
  );
};

StripeDetailForm.propTypes = {
  data: PropTypes.object,
  handleStripeChange: PropTypes.func
};

export default StripeDetailForm;
