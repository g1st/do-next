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
const AddressField2 = ({ handleChange, classes }) => (
  <TextField
    id="address2"
    label="Apartment, suite, etc. (optional)"
    type="text"
    onChange={handleChange}
    margin="dense"
    fullWidth
    InputLabelProps={{
      required: false,
      FormLabelClasses: {
        root: classes.labelRoot,
      },
    }}
    InputProps={{ classes: { root: classes.inputRoot } }}
  />
);

AddressField2.propTypes = {
  handleChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressField2);
