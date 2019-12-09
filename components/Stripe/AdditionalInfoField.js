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

const AdditionalInfoField = ({ handleChange, classes }) => (
  <TextField
    fullWidth
    id="additional_info"
    InputLabelProps={{
      required: false,
      FormLabelClasses: {
        root: classes.labelRoot
      }
    }}
    InputProps={{ classes: { root: classes.inputRoot } }}
    label="Additional information (optional)"
    margin="dense"
    multiline
    onChange={handleChange('additional_info')}
    placeholder="Anything else you would like to add"
    rows={4}
    type="text"
  />
);

AdditionalInfoField.propTypes = {
  handleChange: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdditionalInfoField);
