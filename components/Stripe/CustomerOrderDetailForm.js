/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import SelectCountry from './SelectCountry';
import FirstNameField from './FirstNameField';
import LastNameField from './LastNameField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';
import AddressField from './AddressField';
import AddressField2 from './AddressField2';
import CityField from './CityField';

const CustomerOrderDetailForm = ({
  backend_validation_errors,
  handleChange,
  isNotValid,
}) => (
  <>
    <Grid item xs={12} sm={6}>
      <FirstNameField
        backend_validation_errors={backend_validation_errors}
        handleChange={handleChange('first_name')}
        isNotValid={isNotValid}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <LastNameField
        backend_validation_errors={backend_validation_errors}
        handleChange={handleChange('last_name')}
        isNotValid={isNotValid}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <EmailField
        backend_validation_errors={backend_validation_errors}
        handleChange={handleChange('email')}
        isNotValid={isNotValid}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <PhoneField handleChange={handleChange('phone')} />
    </Grid>
    <Grid item xs={12}>
      <AddressField
        backend_validation_errors={backend_validation_errors}
        handleChange={handleChange('address1')}
        isNotValid={isNotValid}
      />
    </Grid>
    <Grid item xs={12}>
      <AddressField2 handleChange={handleChange('address2')} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <SelectCountry
        handleChange={handleChange('country')}
        error={backend_validation_errors.some(
          (err) => err.param === 'additional.country'
        )}
        helperText={isNotValid('additional.country')}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <CityField
        backend_validation_errors={backend_validation_errors}
        handleChange={handleChange('city')}
        isNotValid={isNotValid}
      />
    </Grid>
  </>
);

CustomerOrderDetailForm.propTypes = {
  backend_validation_errors: PropTypes.array,
  handleChange: PropTypes.func,
  isNotValid: PropTypes.func,
};

export default CustomerOrderDetailForm;
