import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

import LandingImage1 from '../../public/images/Dovile-Jewellery.JPG';
import LandingImage2 from '../../public/images/Dovile-Jewellery-2.JPG';
import LandingImage3 from '../../public/images/Dovile-Jewellery-3.JPG';
import LandingImage4 from '../../public/images/Dovile-Jewellery-4.JPG';
import {
  WrapperWooden,
  Content,
  Input,
  ModalImage,
  Figcaption,
  ImagesWrapper,
  TwoImages,
  Image,
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
    padding: theme.spacing(4),
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
    '@media (min-width: 960px)': {
      fontSize: '1.5rem',
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

  const { open, src, figcaption } = state;

  return (
    <WrapperWooden>
      <Modal
        aria-labelledby="jewellery-piece"
        aria-describedby="jewellery-piece-description"
        open={open}
        onClose={handleClose}
      >
        <figure className={classes.paper}>
          <Close onClick={handleClose} aria-label="Close Image Modal Box" />
          <ModalImage src={src} alt="Presentational Dovile Ko art piece" />
          <Figcaption>
            <Typography variant="body1" id="jewellery-piece-description">
              {figcaption}
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
                onClick={(e) =>
                  onImageClick(
                    e,
                    'FLOW n°B8 and n°B10 | brooches | Baltic amber, ebony, steel'
                  )
                }
                src={LandingImage1}
                alt="Presentational Dovile Ko art piece"
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    'FLOW n°B8 and n°B10 | brooches | Baltic amber, ebony, steel'
                  )
                }
              />
            </Image>
            <Image>
              <Input
                type="image"
                onClick={(e) =>
                  onImageClick(
                    e,
                    'FLOW n°B6 | brooch | Baltic amber, ebony, steel'
                  )
                }
                src={LandingImage2}
                alt="Presentational Dovile Ko art piece"
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    'FLOW n°B6 | brooch | Baltic amber, ebony, steel'
                  )
                }
              />
            </Image>
          </TwoImages>
          <TwoImages>
            <Image>
              <Input
                type="image"
                onClick={(e) =>
                  onImageClick(e, 'FLOW n°R29 | ring | Baltic amber, ebony')
                }
                src={LandingImage3}
                alt="Presentational Dovile Ko art piece"
                onKeyDown={(e) =>
                  handleKeyDown(e, 'FLOW n°R29 | ring | Baltic amber, ebony')
                }
              />
            </Image>
            <Image>
              <Input
                type="image"
                onClick={(e) =>
                  onImageClick(
                    e,
                    'FLOW n°N9 | chest piece | Baltic amber, bog oak, oxidized silver, silk'
                  )
                }
                src={LandingImage4}
                alt="Presentational Dovile Ko art piece"
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    'FLOW n°N9 | chest piece | Baltic amber, bog oak, oxidized silver, silk'
                  )
                }
              />
            </Image>
          </TwoImages>
        </ImagesWrapper>
      </Content>
    </WrapperWooden>
  );
};

LandingPageGallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPageGallery);
