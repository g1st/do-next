import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const TextInput = ({
  labelId,
  label,
  type,
  handleChange,
  error,
  helperText,
  notReq
}) => (
  <TextField
    id={labelId}
    label={label}
    type={type || 'text'}
    onChange={handleChange(labelId)}
    margin="dense"
    required={!notReq}
    fullWidth
    InputLabelProps={{ required: false }}
    error={error}
    helperText={helperText}
  />
);

TextInput.propTypes = {
  error: PropTypes.bool,
  notReq: PropTypes.bool,
  helperText: PropTypes.node,
  labelId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default TextInput;
