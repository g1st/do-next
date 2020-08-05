import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, ButtonBase } from '@material-ui/core';

import LandingImage1 from '../../public/images/IMG_2489_min.jpg';
import LandingImage2 from '../../public/images/IMG_2485_min.jpg';
import LandingImage3 from '../../public/images/IMG_2488_min.jpg';
import LandingImage4 from '../../public/images/IMG_2491_min.jpg';
import ImageWithLoading from '../Gallery/ImageWithLoading';
import {
  Wrapper,
  Content,
  ImagesWrapper,
  FourImages,
  Image1,
  Image2,
  Image3,
  Image4,
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
  buttonBase: {
    flexDirection: 'column',
    '&:active': {
      cursor: 'grabbing',
    },
  },
});

const Card = ({ alt, src, slug, classes }) => (
  <Link href={`/piece?slug=${slug}`} as={`/piece/${slug}`}>
    <ButtonBase classes={{ root: classes.buttonBase }} focusRipple>
      <ImageWithLoading src={src} srcSet={`${src} 1x, ${src} 2x`} alt={alt} />
    </ButtonBase>
  </Link>
);

const LandingPageGallery = ({ classes }) => (
  <Wrapper>
    <Content>
      <ImagesWrapper>
        <FourImages>
          <Image1>
            <Card
              classes={classes}
              slug="SILVER-FLOW-BROOCH-nB1"
              src={LandingImage1}
              alt="SILVER FLOW BROOCH n°B1 | silver 925"
            />
          </Image1>
          <Image2>
            <Card
              classes={classes}
              slug="SILVER-FLOW-EARRINGS-nE4"
              src={LandingImage2}
              alt="SILVER FLOW EARRINGS n°E4 | silver 925"
            />
          </Image2>
          <Image3>
            <Card
              classes={classes}
              slug="SILVER-FLOW-STATEMENT-RING-nR3"
              src={LandingImage3}
              alt="SILVER FLOW STATEMENT RING n°R3 | silver 925"
            />
          </Image3>
          <Image4>
            <Card
              classes={classes}
              slug="SILVER-FLOW-NECKLACE-nN2"
              src={LandingImage4}
              alt="SILVER FLOW NECKLACE n°N2 | freshwater pearls, silver 925"
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

LandingPageGallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

Card.propTypes = {
  classes: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default withStyles(styles)(LandingPageGallery);
