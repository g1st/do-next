/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const CustomPostalCode = ({
  backend_validation_errors,
  handleChange,
  isNotValid,
}) => (
  <TextField
    id="postal_code"
    label="Postal / ZIP code"
    type="text"
    onChange={handleChange}
    margin="dense"
    fullWidth
    required
    InputLabelProps={{
      required: false,
    }}
    error={backend_validation_errors.some(
      (err) => err.param === 'additional.postal_code'
    )}
    helperText={isNotValid('additional.postal_code')}
    color="secondary"
  />
);

CustomPostalCode.propTypes = {
  backend_validation_errors: PropTypes.array,
  handleChange: PropTypes.func,
  isNotValid: PropTypes.func,
};

export default CustomPostalCode;
