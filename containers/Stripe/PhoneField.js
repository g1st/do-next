import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const PhoneField = ({ handleChange }) => (
  <TextField
    id="phone"
    label="Phone number (optional)"
    type="tel"
    onChange={handleChange}
    margin="dense"
    fullWidth
  />
);

PhoneField.propTypes = {
  handleChange: PropTypes.func
};

export default PhoneField;
