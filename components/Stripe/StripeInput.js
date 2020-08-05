/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    padding: '6px 0 7px',
    cursor: 'text',
  },
};

const StripeInput = ({
  classes,
  component: Component,
  onChange,
  name,
  inputRef,
  ...other
}) => {
  // implement `InputElement` interface
  React.useImperativeHandle(inputRef, () => ({
    focus: () => {
      // logic to focus the rendered component from 3rd party belongs here
      console.log('focused');
    },
  }));

  return (
    <Component
      {...other}
      className={classes.root}
      onChange={(e) => onChange(e, name)}
      options={{
        style: {
          base: {
            fontSize: '16px',
            letterSpacing: '0.025em',
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }}
    />
  );
};
StripeInput.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  inputRef: PropTypes.func.isRequired,
};

export default withStyles(styles)(StripeInput);
