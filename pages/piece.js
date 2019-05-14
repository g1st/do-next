import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import axios from 'axios';
import { connect } from 'react-redux';
import Link from 'next/link';
import ImageGallery from 'react-image-gallery';
import { Typography, Button, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowRight } from '@material-ui/icons';

import customItem from '../components/ItemCard/customRenderItem';
import customThumb from '../components/ItemCard/customRenderThumb';
import { addToCart, buyItNow } from '../store/actions';
import Layout from '../components/Layout.js';
import {
  Wrapper,
  Images,
  Info,
  ButtonsWrapper,
  DisabledButtonWrapper,
  Text,
  AnchorLink
} from '../styles/Piece';
import { Mail } from '../styles/Shared';
import DialogForm from '../components/DialogForm/DialogForm';
import { pluralise } from '../util/helpers';

const styles = {
  marginBottom: {
    marginBottom: '1.25rem'
  },
  marginBottomBig: {
    marginBottom: '2rem'
  },
  button: {
    padding: '10px',
    margin: '0 auto 20px auto',
    width: '100%'
  },
  filterLine: {
    color: '#595959',
    letterSpacing: '1px',
    lineHeight: '44px'
  },
  svg: {
    top: '.3em',
    position: 'relative',
    color: '#595959',
    margin: '0 12px'
  }
};

const Piece = ({
  classes,
  onePieceData,
  collections,
  user,
  addToCart: addToCartRedux,
  buyItNow: buyItNowRedux
}) => {
  const handleBuyItNow = item => {
    buyItNowRedux(item);
    Router.push('/checkout');
  };

  if (onePieceData.length < 1 || onePieceData[0] === null) {
    return <p>Page doesn't exist</p>;
  }

  const {
    name,
    description,
    materials,
    price,
    size,
    _id,
    images,
    available,
    group: collection,
    category,
    frontImage
  } = onePieceData[0];

  const dataForCart = {
    name,
    price,
    images,
    _id,
    available,
    quantity: 1
  };

  const gallery = images.reduce((acc, image) => {
    const galleryFormatted = {
      original: `/static/uploads/${image.medium}`,
      thumbnail: `/static/uploads/${image.thumb}`,
      srcSet: `/static/uploads/${image.medium} 400w, /static/uploads/${
        image.big
      } 960w`,
      sizes: '(min-width: 960px) 30vw, 80vw'
    };
    if (image.medium === frontImage) {
      // add in front of array to be first in gallery
      acc.unshift(galleryFormatted);
    } else {
      acc.push(galleryFormatted);
    }
    return acc;
  }, []);

  const edit = (
    <div>
      <Link href={`/edit?id=${_id}`} as={`/edit/${_id}`}>
        <a>Edit</a>
      </Link>
    </div>
  );

  const notAvailable = (
    <>
      <Tooltip
        title={
          <Typography variant="body2" color="inherit">
            Item is on display at exhibition or found a happy wearer!
          </Typography>
        }
        placement="right"
      >
        <DisabledButtonWrapper>
          <Button size="medium" variant="contained" color="primary" disabled>
            Buy It Now
          </Button>
        </DisabledButtonWrapper>
      </Tooltip>
      <Typography variant="body2" classes={{ body2: classes.marginBottom }}>
        Item currently is not available.
      </Typography>
      <Typography variant="body2" classes={{ body2: classes.marginBottom }}>
        Want it badly? Email me at{' '}
        <Mail href="mailto:hello@dovilejewellery.com" target="_top">
          hello@dovilejewellery.com
        </Mail>{' '}
        or fill in the contact form.
      </Typography>
      <DialogForm />
    </>
  );

  const pathLine = (
    <div>
      <Link href="/shop">
        <AnchorLink>
          <Typography inline variant="body2" className={classes.filterLine}>
            shop
          </Typography>
        </AnchorLink>
      </Link>
      <ArrowRight fontSize="small" className={classes.svg} />
      <Link href={`/shop/${collection}`}>
        <AnchorLink>
          <Typography inline variant="body2" className={classes.filterLine}>
            {collection}
          </Typography>
        </AnchorLink>
      </Link>
      <ArrowRight fontSize="small" className={classes.svg} />
      <Typography inline variant="body2" className={classes.filterLine}>
        {pluralise(category)}
      </Typography>
    </div>
  );

  return (
    <Layout
      pathname="/shop"
      collections={collections}
      title={`${name} | Dovile Jewellery`}
      description={`Materials: ${materials}
      ${description}`}
    >
      {pathLine}
      <Wrapper>
        <Images>
          <ImageGallery
            items={gallery}
            lazyLoad
            showNav
            showPlayButton={false}
            showFullscreenButton
            renderItem={customItem}
            renderThumbInner={customThumb}
          />
        </Images>
        <Info>
          <Text>
            <Typography variant="h4">
              {name}
              {user && edit}
            </Typography>
            <Typography variant="h5" classes={{ h5: classes.marginBottomBig }}>
              £{price}
            </Typography>
            <Typography
              variant="body2"
              classes={{ body2: classes.marginBottom }}
            >
              Materials: {materials}
            </Typography>
            <Typography
              variant="body2"
              classes={{ body2: classes.marginBottom }}
            >
              Size: {size}
            </Typography>
            <Typography
              variant="body2"
              classes={{ body2: classes.marginBottom }}
            >
              {description}
            </Typography>

            {available ? (
              <ButtonsWrapper>
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => handleBuyItNow(dataForCart)}
                >
                  Buy It Now
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  color="secondary"
                  onClick={() => addToCartRedux(dataForCart)}
                  className={classes.button}
                >
                  Add To Cart
                </Button>
              </ButtonsWrapper>
            ) : (
              notAvailable
            )}
          </Text>
        </Info>
      </Wrapper>
    </Layout>
  );
};

Piece.propTypes = {
  classes: PropTypes.object.isRequired,
  collections: PropTypes.arrayOf(PropTypes.string),
  onePieceData: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.string,
  buyItNow: PropTypes.func,
  addToCart: PropTypes.func
};

Piece.getInitialProps = async ({ pathname, req, query }) => {
  if (req) {
    const { db } = req;
    const { id } = req.params;

    const data = await db
      .collection('works')
      .find()
      .toArray();

    const onePieceDataFromServer = data.filter(
      obj => obj._id.toString() === id
    );

    return { onePieceData: onePieceDataFromServer, pathname };
  }

  const onePieceDataFromAPI = await axios
    .get('/api/single', { params: { id: query.id } })
    .then(res => res.data);
  return { onePieceData: [onePieceDataFromAPI], pathname };
};

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addToCart(item)),
  buyItNow: item => dispatch(buyItNow(item))
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Piece)));
