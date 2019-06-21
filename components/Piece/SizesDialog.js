import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import Table from './Table';
import { IconButtonWrapper } from '../../styles/Piece';

class SizesDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { forDimensions } = this.props;

    return (
      <IconButtonWrapper forDimensions={forDimensions}>
        <div>
          <InfoIcon
            fontSize="small"
            style={{
              marginLeft: forDimensions ? '6px' : '12px',
              fill: 'rgba(0,0,0,0.54)',
              cursor: 'pointer',
              transform: `translateY(${forDimensions ? '3px' : ''})`
            }}
            onClick={this.handleClickOpen}
          />
        </div>
        <Dialog open={open} keepMounted onClose={this.handleClose}>
          <Table />
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </IconButtonWrapper>
    );
  }
}

SizesDialog.propTypes = {
  forDimensions: PropTypes.bool
};

export default SizesDialog;
