import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

const Error = props => <FormHelperText error>{props.children}</FormHelperText>;

export default Error;
