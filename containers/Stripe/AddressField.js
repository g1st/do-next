/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  inputRoot: {
    fontSize: '14px'
  },
  labelRoot: {
    fontSize: '14px'
  }
};
const AddressField = ({
  backend_validation_errors,
  handleChange,
  isNotValid,
  classes
}) => (
  <TextField
    id="address1"
    label="Address"
    type="text"
    onChange={handleChange}
    margin="dense"
    fullWidth
    required
    InputLabelProps={{
      required: false,
      FormLabelClasses: {
        root: classes.labelRoot
      }
    }}
    InputProps={{ classes: { root: classes.inputRoot } }}
    error={backend_validation_errors.some(
      err => err.param === 'additional.address1'
    )}
    helperText={isNotValid('additional.address1')}
  />
);

AddressField.propTypes = {
  backend_validation_errors: PropTypes.array,
  handleChange: PropTypes.func,
  isNotValid: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddressField);
