/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const EmailField = ({
  backend_validation_errors,
  handleChange,
  isNotValid
}) => (
  <TextField
    id="email"
    label="Email address"
    type="email"
    onChange={handleChange}
    margin="dense"
    fullWidth
    required
    error={backend_validation_errors.some(
      err => err.param === 'additional.email'
    )}
    InputLabelProps={{ required: false }}
    helperText={isNotValid('additional.email')}
  />
);

EmailField.propTypes = {
  backend_validation_errors: PropTypes.array,
  handleChange: PropTypes.func,
  isNotValid: PropTypes.func
};

export default EmailField;
