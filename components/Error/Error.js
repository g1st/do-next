import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

const Error = ({ children }) => (
  <FormHelperText error>{children}</FormHelperText>
);

Error.propTypes = {
  children: PropTypes.object
};

export default Error;
