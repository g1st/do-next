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

const CityField = ({
  backend_validation_errors,
  handleChange,
  isNotValid,
  classes,
}) => (
  <TextField
    id="city"
    label="City"
    type="text"
    onChange={handleChange}
    margin="dense"
    fullWidth
    required
    InputLabelProps={{
      required: false,
      FormLabelClasses: {
        root: classes.labelRoot,
      },
    }}
    InputProps={{ classes: { root: classes.inputRoot } }}
    error={backend_validation_errors.some(
      (err) => err.param === 'additional.city'
    )}
    helperText={isNotValid('additional.city')}
  />
);

CityField.propTypes = {
  backend_validation_errors: PropTypes.array,
  handleChange: PropTypes.func,
  isNotValid: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CityField);
