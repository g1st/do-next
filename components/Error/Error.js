import React from 'react';
import PropTypes from 'prop-types';
import { FormHelperText } from '@material-ui/core';

const Error = ({ children }) => (
  <FormHelperText error>{children}</FormHelperText>
);

Error.propTypes = {
  children: PropTypes.node,
};

export default Error;
