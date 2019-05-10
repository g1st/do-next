/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const CityField = ({ backend_validation_errors, handleChange, isNotValid }) => (
  <TextField
    id="city"
    label="City"
    type="text"
    onChange={handleChange}
    margin="dense"
    fullWidth
    required
    InputLabelProps={{ required: false }}
    error={backend_validation_errors.some(
      err => err.param === 'additional.city'
    )}
    helperText={isNotValid('additional.city')}
  />
);

CityField.propTypes = {
  backend_validation_errors: PropTypes.array,
  handleChange: PropTypes.func,
  isNotValid: PropTypes.func
};

export default CityField;
