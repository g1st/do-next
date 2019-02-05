// A Wrapper for the <FormControl>, <InputLabel>, <Error> and the Stripe <*Element>.
// Similar to Material UI's <TextField>. Handles focused, empty and error state
// to correctly show the floating label and error messages etc.

import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import StripeInput from './StripeInput';
// import Errors from './Errors';

class StripeElementWrapper extends React.Component {
  // state = {
  //   focused: false,
  //   empty: true
  // };

  render() {
    const { component, onChange, label, name } = this.props;
    // const { focused, empty, error } = this.state;

    return (
      <div>
        <FormControl fullWidth margin="normal">
          <InputLabel
            // focused={focused}
            // shrink={focused || !empty}
            shrink
            // error={!!error}
          >
            {label}
          </InputLabel>
          <Input
            fullWidth
            inputComponent={StripeInput}
            // onFocus={this.handleFocus}
            // onBlur={this.handleBlur}
            onChange={onChange}
            inputProps={{ component }}
            name={name}
          />
        </FormControl>
        {/* {error && <Errors>{error.message}</Errors>} */}
      </div>
    );
  }
}

StripeElementWrapper.propTypes = {
  component: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default StripeElementWrapper;
