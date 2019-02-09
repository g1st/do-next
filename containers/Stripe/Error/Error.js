import React from 'react';
import Typography from '@material-ui/core/Typography';

const Error = props => {
  return <Typography variant="body2">{props.children}</Typography>;
};

export default Error;
