import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';

const Error = props => (
  // Prefer error message not to be colored red
  <FormHelperText error={false}>{props.children}</FormHelperText>
);

export default Error;
