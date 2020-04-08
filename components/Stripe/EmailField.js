/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  inputRoot: {
    fontSize: '14px',
  },
  labelRoot: {
    fontSize: '14px',
  },
};
const EmailField = ({
  backend_validation_errors,
  handleChange,
  isNotValid,
  classes,
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
      (err) => err.param === 'additional.email'
    )}
    InputLabelProps={{
      required: false,
      FormLabelClasses: {
        root: classes.labelRoot,
      },
    }}
    InputProps={{ classes: { root: classes.inputRoot } }}
    helperText={isNotValid('additional.email')}
  />
);

EmailField.propTypes = {
  backend_validation_errors: PropTypes.array,
  handleChange: PropTypes.func,
  isNotValid: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailField);
