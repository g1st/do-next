/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const AddressField = ({
  backend_validation_errors,
  handleChange,
  isNotValid
}) => (
  <TextField
    id="address1"
    label="Address"
    type="text"
    onChange={handleChange}
    margin="dense"
    fullWidth
    required
    InputLabelProps={{ required: false }}
    error={backend_validation_errors.some(
      err => err.param === 'additional.address1'
    )}
    helperText={isNotValid('additional.address1')}
  />
);

AddressField.propTypes = {
  backend_validation_errors: PropTypes.array,
  handleChange: PropTypes.func,
  isNotValid: PropTypes.func
};

export default AddressField;
