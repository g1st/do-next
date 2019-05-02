import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

import {
  Wrapper,
  Headline,
  Content,
  Input,
  ModalImage,
  Figcaption,
  ImagesWrapper,
  TwoImages,
  Image
} from '../../styles/LandingPageGallery';

const styles = theme => ({
  gridList: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: '100%',
    '@media (min-width: 600px)': {
      margin: 0,
      flexWrap: 'nowrap'
    },

    '& > div': {
      '@media (max-width: 600px)': {
        maxWidth: '250px'
      }
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
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',

    '@media (min-width: 800px)': {
      maxWidth: '750px'
    }
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
      <Wrapper>
        <Modal
          aria-labelledby="jewellery-piece"
          aria-describedby="jewellery-piece-description"
          open={open}
          onClose={this.handleClose}
        >
          <figure className={classes.paper}>
            <ModalImage src={src} alt="" />
            <Figcaption>
              <Typography
                variant="subtitle1"
                id="jewellery-piece-description"
                className={classes.figcaption}
              >
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Figcaption>
          </figure>
        </Modal>
        <Content>
          <ImagesWrapper>
            <TwoImages>
              <Image>
                <Input
                  type="image"
                  onClick={this.onImageClick}
                  src="/static/images/Dovile Jewellery.JPG"
                  alt="Presentational Dovile Jewellery piece"
                  onKeyDown={this.handleKeyDown}
                />
              </Image>
              <Image>
                <Input
                  type="image"
                  onClick={this.onImageClick}
                  src="/static/images/Dovile Jewellery-2.JPG"
                  alt="Presentational Dovile Jewellery piece"
                  onKeyDown={this.handleKeyDown}
                />
              </Image>
            </TwoImages>
            <TwoImages>
              <Image>
                <Input
                  type="image"
                  onClick={this.onImageClick}
                  src="/static/images/Dovile Jewellery-3.JPG"
                  alt="Presentational Dovile Jewellery piece"
                  onKeyDown={this.handleKeyDown}
                />
              </Image>
              <Image>
                <Input
                  type="image"
                  onClick={this.onImageClick}
                  src="/static/images/Dovile Jewellery-4.JPG"
                  alt="Presentational Dovile Jewellery piece"
                  onKeyDown={this.handleKeyDown}
                />
              </Image>
            </TwoImages>
          </ImagesWrapper>
          <Headline>
            <Typography variant="h5" component="h2">
              contemporary amber art jewellery
            </Typography>
          </Headline>
        </Content>
      </Wrapper>
    );
  }
}

LandingPageGallery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingPageGallery);
