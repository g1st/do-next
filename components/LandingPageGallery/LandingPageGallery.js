import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  gridList: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    '@media (min-width: 600px)': {
      flexWrap: 'nowrap',
      margin: 0
    },

    '& > div': {
      '@media (max-width: 600px)': {
        maxWidth: '250px'
      }
    }
  },
  img: {
    width: '100%',
    '&:hover': {
      cursor: 'pointer'
    },
    '@media (min-width: 600px)': {
      maxHeight: '360px',
      width: '100%'
    }
  },
  modalImage: {
    maxWidth: '100%',
    '@media (min-width: 600px)': {
      maxWidth: '580px',
      width: 'auto',
      height: 'auto',
      maxHeight: '80%'
    }
  },
  paper: {
    margin: 0,
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    maxHeight: '95%',

    '@media (min-width: 600px)': {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '90%'
    }
  },
  figcaption: {
    paddingTop: '20px'
  }
});

class LandingPageGallery extends React.Component {
  state = { open: false };

  onImageClick = ({ target: { src } }) => {
    this.setState({ open: true, src });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleKeyDown = ({ key, target: { src } }) => {
    if (key === 'Enter' || key === ' ') {
      this.setState({ open: true, src });
    }
  };

  render() {
    const { classes } = this.props;
    const { open, src } = this.state;

    return (
      <div className={classes.root}>
        <Modal
          aria-labelledby="jewellery-piece"
          aria-describedby="jewellery-piece-description"
          open={open}
          onClose={this.handleClose}
        >
          <figure className={classes.paper}>
            <img className={classes.modalImage} src={src} alt="" />
            <figcaption>
              <Typography
                variant="subtitle1"
                id="jewellery-piece-description"
                className={classes.figcaption}
              >
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </figcaption>
          </figure>
        </Modal>
        <Grid container className={classes.gridList} spacing={32}>
          <Grid item key={0}>
            <input
              type="image"
              className={classes.img}
              onClick={this.onImageClick}
              src="/static/images/Dovile Jewellery.JPG"
              alt="Presentational Dovile Jewellery piece"
              onKeyDown={this.handleKeyDown}
            />
          </Grid>
          <Grid item key={1}>
            <input
              type="image"
              className={classes.img}
              onClick={this.onImageClick}
              src="/static/images/Dovile Jewellery-2.JPG"
              alt="Presentational Dovile Jewellery piece"
              onKeyDown={this.handleKeyDown}
            />
          </Grid>
          <Grid item key={2}>
            <input
              type="image"
              className={classes.img}
              onClick={this.onImageClick}
              src="/static/images/Dovile Jewellery-3.JPG"
              alt="Presentational Dovile Jewellery piece"
              onKeyDown={this.handleKeyDown}
            />
          </Grid>
          <Grid item key={3}>
            <input
              type="image"
              className={classes.img}
              onClick={this.onImageClick}
              src="/static/images/Dovile Jewellery-4.JPG"
              alt="Presentational Dovile Jewellery piece"
              onKeyDown={this.handleKeyDown}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

LandingPageGallery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingPageGallery);
