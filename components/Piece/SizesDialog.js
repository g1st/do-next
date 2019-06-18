import React from 'react';
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

    return (
      <IconButtonWrapper>
        <div>
          <InfoIcon
            fontSize="small"
            style={{
              marginLeft: '12px',
              fill: 'rgba(0,0,0,0.54)',
              cursor: 'pointer'
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

export default SizesDialog;
