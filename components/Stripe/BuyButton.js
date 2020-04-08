import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

const BuyButton = ({ disabled, fullWidth, priceToPay }) => (
  <Button
    color="secondary"
    disabled={disabled}
    fullWidth={fullWidth}
    size="large"
    type="submit"
    variant="contained"
    style={{ position: 'relative' }}
  >
    Pay £{priceToPay}
    <LockIcon style={{ position: 'absolute', right: '0.75em' }} />
  </Button>
);

BuyButton.propTypes = {
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  priceToPay: PropTypes.string,
};

export default BuyButton;
