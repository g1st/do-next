// Wrapper around the actual Stripe <*Element>, so that it can be used as `inputComponent`
// for Material UI's <Input>. Also adds some styling.

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    padding: '6px 0 7px',
    cursor: 'text'
  }
};

class StripeInput extends PureComponent {
  static defaultProps = {
    onFocus: () => {},
    onBlur: () => {},
    onChange: () => {}
  };

  render() {
    const {
      classes: c,
      theme,
      component: Component,
      onFocus,
      onBlur,
      onChange,
      name
    } = this.props;

    return (
      <Component
        className={c.root}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={e => onChange(e, name)}
        style={{
          base: {
            //   fontSize: `${theme.typography.fontSize}px`,
            // fontFamily: theme.typography.fontFamily,
            fontSize: '16px',
            letterSpacing: '0.025em'
            // color: '#000000'
          },
          invalid: {
            color: '#9e2146'
          }
        }}
      />
    );
  }
}

StripeInput.propTypes = {
  classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func
};

export default withStyles(styles)(StripeInput);
