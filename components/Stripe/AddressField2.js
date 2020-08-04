/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const AddressField2 = ({ handleChange }) => (
  <TextField
    id="address2"
    label="Apartment, suite, etc. (optional)"
    type="text"
    onChange={handleChange}
    margin="dense"
    fullWidth
    InputLabelProps={{
      required: false,
    }}
    color="secondary"
  />
);

AddressField2.propTypes = {
  handleChange: PropTypes.func,
};

export default AddressField2;
