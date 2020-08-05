import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import StripeInput from './StripeInput';
import Error from '../Error/Error';

const styles = {
  inputRoot: {
    fontSize: '4px',
  },
  labelRoot: {
    fontSize: '14px',
  },
};

const StripeElementWrapper = ({
  component,
  onChange,
  label,
  name,
  error,
  classes,
}) => (
  <div>
    <FormControl fullWidth margin="dense" error={!!error} color="secondary">
      <InputLabel
        htmlFor={name}
        shrink
        error={!!error}
        classes={{ root: classes.labelRoot }}
      >
        {label}
      </InputLabel>
      <Input
        fullWidth
        inputComponent={StripeInput}
        onChange={onChange}
        inputProps={{ component, classes: { root: classes.fontSize } }}
        name={name}
        id={name}
      />
      {error && <Error>{error}</Error>}
    </FormControl>
  </div>
);

StripeElementWrapper.propTypes = {
  component: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StripeElementWrapper);
