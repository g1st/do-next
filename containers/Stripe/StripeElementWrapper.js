import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import StripeInput from './StripeInput';

const StripeElementWrapper = ({ component, onChange, label, name, error }) => (
  <div>
    <FormControl fullWidth margin="normal">
      <InputLabel shrink error={!!error}>
        {label}
      </InputLabel>
      <Input
        fullWidth
        inputComponent={StripeInput}
        onChange={onChange}
        inputProps={{ component }}
        name={name}
      />
    </FormControl>
  </div>
);

StripeElementWrapper.propTypes = {
  component: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default StripeElementWrapper;
