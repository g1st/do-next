import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

const BuyButton = ({ disabled, fullWidth }) => (
  <Button
    color="secondary"
    disabled={disabled}
    fullWidth={fullWidth}
    size="large"
    type="submit"
    variant="contained"
  >
    Buy
  </Button>
);
BuyButton.propTypes = {
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool
};

export default BuyButton;
