import React from 'react';
import { withRouter } from 'next/router';
import withWidth from '@material-ui/core/withWidth';
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
    md: 'left',
    lg: 'left',
    xl: 'left'
  }
};

class Piece extends React.Component {
  static async getInitialProps({ pathname, req, query }) {
    if (req) {
      const { db } = req;
      const id = req.params.id;

      const data = await db
        .collection('works')
        .find()
        .toArray();

      const onePiece = data.filter(obj => obj._id == id);

      return { data: onePiece, pathname, from: 'server' };
    }

    const onePiece = await axios
      .get('/api/single', { params: { id: query.id } })
      .then(res => {
        return res.data;
      });
    return { data: [onePiece], pathname, from: 'rest api' };
  }

  render() {
    // const pieceId = this.props.router.query.id;
    const { classes, width } = this.props;

    if (this.props.data.length < 1) {
      return <p>Page doesn't exist</p>;
    }

    const {
      name,
      description,
      materials,
      price,
      _id,
      images
    } = this.props.data[0];

    const gallery = images.map(image => ({
      original: `/static/uploads/${image.resized}`,
      thumbnail: `/static/uploads/${image.thumb}`
    }));

    return (
      <Layout pathname={this.props.pathname}>
        {console.log(width)}
        {/* <h1>{pieceId}</h1> */}
        {/* <p>{this.props.router}</p> */}
        {/* <p>This is the item page.</p> */}
        <Wrapper>
          <Images>
            <ImageGallery
              items={gallery}
              lazyLoad={true}
              showNav={false}
              thumbnailPosition={styles.thumbnailPosition[width]}
              showPlayButton={false}
              showFullscreenButton={false}
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
                    variant="contained"
                    color="secondary"
                    value={_id}
                    onClick={el => cart.addItem(el.target.value)}
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

export default withRouter(withStyles(styles)(withWidth()(Piece)));
