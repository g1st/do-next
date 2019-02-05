import React, { PureComponent } from 'react';

import Grid from '@material-ui/core/Grid';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements';

import StripeElementWrapper from './StripeElementWrapper';

class StripeCardsSection extends PureComponent {
  render() {
    return (
      <Grid container spacing={32}>
        <Grid item xs={12}>
          <StripeElementWrapper
            label="Card Number"
            component={CardNumberElement}
            name={'card_number'}
          />
        </Grid>
        <Grid item xs={6}>
          <StripeElementWrapper
            label="Expiry (MM / YY)"
            component={CardExpiryElement}
            name={'card_expiration'}
          />
        </Grid>
        <Grid item xs={6}>
          <StripeElementWrapper
            label="CVC"
            component={CardCVCElement}
            name={'CVC_number'}
          />
        </Grid>
        <Grid item xs={6}>
          <StripeElementWrapper
            label="Postal / ZIP code"
            component={PostalCodeElement}
            name={'zip_code'}
          />
        </Grid>
      </Grid>
    );
  }
}

export default StripeCardsSection;
