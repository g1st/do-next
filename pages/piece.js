import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import ImageGallery from 'react-image-gallery';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import 'react-image-gallery/styles/css/image-gallery.css';
import Link from 'next/link';
import customItem from '../components/ItemCard/customRenderItem';
import customThumb from '../components/ItemCard/customRenderThumb';

import { addToCart, buyItNow } from '../store/actions';
import Layout from '../components/Layout.js';
import { Wrapper, Images, Info } from '../styles/Piece';

const styles = {
  marginBottom: {
    marginBottom: '1.25rem'
  },
  marginBottomBig: {
    marginBottom: '3rem'
  },
  thumbnailPosition: {
    xs: 'bottom',
    sm: 'bottom',
    md: 'bottom',
    lg: 'bottom',
    xl: 'bottom'
  }
};

class Piece extends React.Component {
  handleBuyItNow = item => {
    const { buyItNow: buyItNowRedux } = this.props;

    buyItNowRedux(item);
    Router.push('/checkout').then(() => window.scrollTo(0, 0));
  };

  render() {
    const {
      classes,
      onePieceData,
      user,
      addToCart: addToCartRedux,
      collections
    } = this.props;

    if (onePieceData.length < 1 || onePieceData[0] === null) {
      return <p>Page doesn't exist</p>;
    }

    const {
      name,
      description,
      materials,
      price,
      _id,
      images,
      available
    } = onePieceData[0];

    const dataForCart = {
      name,
      price,
      images,
      _id,
      available,
      quantity: 1
    };

    const gallery = images.map(image => ({
      original: `/static/uploads/${image.medium}`,
      thumbnail: `/static/uploads/${image.thumb}`,
      srcSet: `/static/uploads/${image.medium} 400w, /static/uploads/${
        image.big
      } 960w`,
      sizes: '(min-width: 960px) 30vw, 80vw'
    }));

    const edit = (
      <div>
        <Link href={`/edit?id=${_id}`} as={`/edit/${_id}`}>
          <a>Edit</a>
        </Link>
      </div>
    );

    return (
      // to highlight works tab in navbar under any piece is loaded
      <Layout pathname="/works" collections={collections}>
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
            <Typography variant="h5" classes={{ h5: classes.marginBottomBig }}>
              {name}
              {user && edit}
            </Typography>
            <Typography
              variant="body1"
              classes={{ body1: classes.marginBottom }}
            >
              {description}
            </Typography>
            <Typography
              variant="body1"
              classes={{ body1: classes.marginBottom }}
            >
              Materials: {materials}
            </Typography>
            <Typography
              variant="body1"
              classes={{ body1: classes.marginBottom }}
            >
              Price: {price}
            </Typography>
            <div>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={() => this.handleBuyItNow(dataForCart)}
              >
                Buy It Now
              </Button>
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                onClick={() => addToCartRedux(dataForCart)}
              >
                Add To Cart
              </Button>
            </div>
          </Info>
        </Wrapper>
      </Layout>
    );
  }
}

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
