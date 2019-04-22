import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const TextArea = ({ handleChange }) => (
  <TextField
    id="additional_info"
    label="Additional information (optional)"
    onChange={handleChange('additional_info')}
    margin="dense"
    fullWidth
    multiline
    rows={4}
    placeholder="Anything else you would like to add"
    InputLabelProps={{ required: false }}
  />
);

TextArea.propTypes = {
  handleChange: PropTypes.func.isRequired
};

export default TextArea;
