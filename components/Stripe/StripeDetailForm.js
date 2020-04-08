/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import {
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
} from 'react-stripe-elements';

import StripeElementWrapper from './StripeElementWrapper';
import CustomPostalCode from './CustomPostalCode';

const StripeDetailForm = ({
  data: { card_number, card_expiration, CVC_number, stripe_errors },
  handleStripeChange,
  handleChange,
  backend_validation_errors,
  isNotValid,
}) => {
  let cardNumberError = null;
  if (card_number.error) {
    cardNumberError = card_number.error;
  } else if (stripe_errors) {
    if (card_number.empty) {
      cardNumberError = `Your card's number is blank`;
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
    <>
      <Grid item xs={12} sm={6}>
        <StripeElementWrapper
          label="Card Number"
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
          component={CardCvcElement}
          name="CVC_number"
          onChange={handleStripeChange}
          error={cvcError}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomPostalCode
          handleChange={handleChange('postal_code')}
          backend_validation_errors={backend_validation_errors}
          isNotValid={isNotValid}
        />
      </Grid>
    </>
  );
};

StripeDetailForm.propTypes = {
  data: PropTypes.object,
  handleStripeChange: PropTypes.func,
  backend_validation_errors: PropTypes.array,
  handleChange: PropTypes.func,
  isNotValid: PropTypes.func,
};

export default StripeDetailForm;
