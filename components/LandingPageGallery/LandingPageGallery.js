import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

import LandingImage1 from '../../public/images/Dovile-Jewellery.JPG';
import LandingImage2 from '../../public/images/Dovile-Jewellery-2.JPG';
import LandingImage3 from '../../public/images/Dovile-Jewellery-3.JPG';
import LandingImage4 from '../../public/images/Dovile-Jewellery-4.JPG';
import {
  Wrapper,
  Content,
  Input,
  ModalImage,
  Figcaption,
  ImagesWrapper,
  TwoImages,
  Image,
  Close
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

    '@media (min-width: 600px)': {
      maxWidth: '814px',
      maxHeight: '90vh'
    }
  },
  headline: {
    textTransform: 'uppercase',
    letterSpacing: '4px',
    marginTop: '40px',
    fontSize: '1rem',
    '@media (min-width: 960px)': {
      fontSize: '1.5rem'
    }
  },
  author: {
    fontSize: '1rem',
    marginTop: '0.6rem',
    '@media (min-width: 960px)': {
      fontSize: '1.3rem'
    }
  }
});

class LandingPageGallery extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = { open: false };

  onImageClick = ({ target: { src } }, figcaption) => {
    this.setState({ open: true, src, figcaption });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleKeyDown = ({ key, target: { src } }, figcaption) => {
    if (key === 'Enter' || key === ' ') {
      this.setState({ open: true, src, figcaption });
    }
  };

  render() {
    const { classes } = this.props;
    const { open, src, figcaption } = this.state;

    return (
      <Wrapper>
        <Modal
          aria-labelledby="jewellery-piece"
          aria-describedby="jewellery-piece-description"
          open={open}
          onClose={this.handleClose}
        >
          <figure className={classes.paper}>
            <Close
              onClick={this.handleClose}
              aria-label="Close Image Modal Box"
            />
            <ModalImage
              src={src}
              alt="Presentational Dovile Jewellery art piece"
            />
            <Figcaption>
              <Typography variant="body2" id="jewellery-piece-description">
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
                  onClick={e =>
                    this.onImageClick(
                      e,
                      'FLOW n°B8 and n°B10 | brooches | Baltic amber, ebony, steel'
                    )
                  }
                  src={LandingImage1}
                  alt="Presentational Dovile Jewellery art piece"
                  onKeyDown={e =>
                    this.handleKeyDown(
                      e,
                      'FLOW n°B8 and n°B10 | brooches | Baltic amber, ebony, steel'
                    )
                  }
                />
              </Image>
              <Image>
                <Input
                  type="image"
                  onClick={e =>
                    this.onImageClick(
                      e,
                      'FLOW n°B6 | brooch | Baltic amber, ebony, steel'
                    )
                  }
                  src={LandingImage2}
                  alt="Presentational Dovile Jewellery art piece"
                  onKeyDown={e =>
                    this.handleKeyDown(
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
                  onClick={e =>
                    this.onImageClick(
                      e,
                      'FLOW n°R29 | ring | Baltic amber, ebony'
                    )
                  }
                  src={LandingImage3}
                  alt="Presentational Dovile Jewellery art piece"
                  onKeyDown={e =>
                    this.handleKeyDown(
                      e,
                      'FLOW n°R29 | ring | Baltic amber, ebony'
                    )
                  }
                />
              </Image>
              <Image>
                <Input
                  type="image"
                  onClick={e =>
                    this.onImageClick(
                      e,
                      'FLOW n°N9 | chest piece | Baltic amber, bog oak, oxidized silver, silk'
                    )
                  }
                  src={LandingImage4}
                  alt="Presentational Dovile Jewellery art piece"
                  onKeyDown={e =>
                    this.handleKeyDown(
                      e,
                      'FLOW n°N9 | chest piece | Baltic amber, bog oak, oxidized silver, silk'
                    )
                  }
                />
              </Image>
            </TwoImages>
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
  }
}

export default withStyles(styles)(LandingPageGallery);
