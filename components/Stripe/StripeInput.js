import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    padding: '6px 0 7px',
    cursor: 'text'
  }
};

const StripeInput = ({ classes, component: Component, onChange, name }) => (
  <Component
    className={classes.root}
    onChange={e => onChange(e, name)}
    style={{
      base: {
        fontSize: '14px',
        letterSpacing: '0.025em'
      },
      invalid: {
        color: '#9e2146'
      }
    }}
  />
);

StripeInput.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(StripeInput);
