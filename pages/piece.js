import React from 'react';
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import { Subscribe } from 'unstated';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import ImageGallery from 'react-image-gallery';
import Button from '@material-ui/core/Button';
import 'react-image-gallery/styles/css/image-gallery.css';

import Layout from '../components/Layout.js';
import CartContainer from '../containers/CartContainer';
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
  render() {
    const { classes, onePieceData } = this.props;

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
    } = this.props.onePieceData[0];

    const dataForCart = {
      name,
      price,
      images,
      _id,
      available
    };

    const gallery = images.map(image => ({
      original: `/static/uploads/${image.resized}`,
      thumbnail: `/static/uploads/${image.thumb}`
    }));

    return (
      // to highlight works tab in navbar under any piece is loaded
      <Layout pathname="/works" collections={this.props.collections}>
        <Wrapper>
          <Images>
            <ImageGallery
              items={gallery}
              lazyLoad={true}
              showNav={true}
              showPlayButton={false}
              showFullscreenButton={true}
            />
          </Images>
          <Info>
            <Typography variant="h5" classes={{ h5: classes.marginBottomBig }}>
              {name}
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
            <Subscribe to={[CartContainer]}>
              {cart => (
                <div>
                  <Button
                    size="medium"
                    variant="contained"
                    color="secondary"
                    onClick={el => cart.addItem(dataForCart)}
                  >
                    Add To Cart
                  </Button>
                </div>
              )}
            </Subscribe>
          </Info>
        </Wrapper>
      </Layout>
    );
  }
}

Piece.getInitialProps = async ({ pathname, req, query }) => {
  if (req) {
    const { db } = req;
    const id = req.params.id;

    const data = await db
      .collection('works')
      .find()
      .toArray();

    const onePieceData = data.filter(obj => obj._id == id);

    return { onePieceData, pathname };
  }

  const onePieceData = await axios
    .get('/api/single', { params: { id: query.id } })
    .then(res => {
      return res.data;
    });
  return { onePieceData: [onePieceData], pathname };
};

export default withRouter(withStyles(styles)(Piece));
