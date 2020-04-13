import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

import LandingImage1 from '../../public/images/IMG_2489_min.jpg';
import LandingImage2 from '../../public/images/IMG_2485_min.jpg';
import LandingImage3 from '../../public/images/IMG_2488_min.jpg';
import LandingImage4 from '../../public/images/IMG_2491_min.jpg';

import {
  Wrapper,
  Content,
  Input,
  ModalImage,
  Figcaption,
  ImagesWrapper,
  FourImages,
  Image1,
  Image2,
  Image3,
  Image4,
  Close,
} from '../../styles/LandingPageGallery';

const styles = (theme) => ({
  gridList: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: '100%',
    '@media (min-width: 600px)': {
      margin: 0,
      flexWrap: 'nowrap',
    },

    '& > div': {
      '@media (max-width: 600px)': {
        maxWidth: '250px',
      },
    },
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

    '@media (min-width: 600px)': {
      maxWidth: '814px',
      maxHeight: '90vh',
    },
  },
  headline: {
    textTransform: 'uppercase',
    letterSpacing: '4px',
    marginTop: '40px',
    fontSize: '1rem',
    '@media (min-width: 600px)': {
      fontSize: '1.5rem',
    },
    '@media (min-width: 960px)': {
      fontSize: '2rem',
    },
  },
  author: {
    fontSize: '1rem',
    marginTop: '0.6rem',
    '@media (min-width: 960px)': {
      fontSize: '1.3rem',
    },
  },
});

const LandingPageGallery = ({ classes }) => {
  const [state, setState] = useState({ open: false });

  const { open, figcaption, src } = state;

  const onImageClick = ({ target }, text) => {
    setState({ open: true, src: target.src, figcaption: text });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleKeyDown = ({ key, target }, text) => {
    if (key === 'Enter' || key === ' ') {
      setState({ open: true, src: target.src, figcaption: text });
    }
  };

  return (
    <Wrapper>
      <Modal
        aria-labelledby="jewellery-piece"
        aria-describedby="jewellery-piece-description"
        open={open}
        onClose={handleClose}
      >
        <figure className={classes.paper}>
          <Close onClick={handleClose} aria-label="Close Image Modal Box" />
          <ModalImage src={src} alt={figcaption} />
          <Figcaption>
            <Typography variant="body2" id="jewellery-piece-description">
              {figcaption}
            </Typography>
          </Figcaption>
        </figure>
      </Modal>
      <Content>
        <ImagesWrapper>
          <FourImages>
            <Image1>
              <Input
                type="image"
                onClick={(e) =>
                  onImageClick(
                    e,
                    'SILVER FLOW BROOCH n°B1 | silver 925',
                    'image1'
                  )
                }
                src={LandingImage1}
                alt="Presentational Dovile Jewellery art piece"
                onKeyDown={(e) =>
                  handleKeyDown(e, 'SILVER FLOW BROOCH n°B1 | silver 925')
                }
              />
            </Image1>
            <Image2>
              <Input
                type="image"
                onClick={(e) =>
                  onImageClick(e, 'SILVER FLOW EARRINGS n°E4 | silver 925')
                }
                src={LandingImage2}
                alt="Presentational Dovile Jewellery art piece"
                onKeyDown={(e) =>
                  handleKeyDown(e, 'SILVER FLOW EARRINGS n°E4 | silver 925')
                }
              />
            </Image2>
            <Image3>
              <Input
                type="image"
                onClick={(e) =>
                  onImageClick(
                    e,
                    'SILVER FLOW STATEMENT RING n°R3 | silver 925'
                  )
                }
                src={LandingImage3}
                alt="Presentational Dovile Jewellery art piece"
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    'SILVER FLOW STATEMENT RING n°R3 | silver 925'
                  )
                }
              />
            </Image3>
            <Image4>
              <Input
                type="image"
                onClick={(e) =>
                  onImageClick(
                    e,
                    'SILVER FLOW NECKLACE n°N2 | freshwater pearls, silver 925'
                  )
                }
                src={LandingImage4}
                alt="Presentational Dovile Jewellery art piece"
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    'SILVER FLOW NECKLACE n°N2 | freshwater pearls, silver 925'
                  )
                }
              />
            </Image4>
          </FourImages>
        </ImagesWrapper>
        <Typography variant="h5" component="h2" className={classes.headline}>
          contemporary art jewellery
        </Typography>
        <Typography variant="h5" component="h2" className={classes.author}>
          by Dovile Kondrasovaite
        </Typography>
      </Content>
    </Wrapper>
  );
};

LandingPageGallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPageGallery);
