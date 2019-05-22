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
const PhoneField = ({ handleChange, classes }) => (
  <TextField
    id="phone"
    label="Phone number (optional)"
    type="tel"
    onChange={handleChange}
    margin="dense"
    fullWidth
    InputLabelProps={{
      FormLabelClasses: {
        root: classes.labelRoot
      }
    }}
    InputProps={{ classes: { root: classes.inputRoot } }}
  />
);

PhoneField.propTypes = {
  handleChange: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhoneField);
