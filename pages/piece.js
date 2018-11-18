import React from 'react';
import { withRouter } from 'next/router';
import { Subscribe } from 'unstated';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import Layout from '../components/Layout.js';
import CartContainer from '../containers/CartContainer';
import { Wrapper, Images, Info, Title } from '../styles/Piece';

class Piece extends React.Component {
  static async getInitialProps({ pathname, req, query, asPath }) {
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
    const pieceId = this.props.router.query.id;
    console.log(this.props.data);

    const {
      name,
      description,
      materials,
      price,
      _id,
      images
    } = this.props.data[0];

    const gallery = images.map(image => ({
      original: `/static/uploads/${image}`,
      thumbnail: `/static/uploads/${image}`
    }));
    console.log(gallery);

    return (
      <Layout pathname={this.props.pathname}>
        <h1>{pieceId}</h1>
        {/* <p>{this.props.router}</p> */}
        <p>This is the item page.</p>
        <Wrapper>
          <Images>
            <ImageGallery items={gallery} />
          </Images>
          <Info>
            <Typography variant="h2">{name}</Typography>
            <Typography variant="body1">{description}</Typography>
            <Typography variant="body1">Materials: {materials}</Typography>
            <Typography variant="body1">{price}</Typography>
            <Subscribe to={[CartContainer]}>
              {cart => (
                <div>
                  <span>Add to Cart</span>
                  <button
                    value={_id}
                    onClick={el => cart.addItem(el.target.value)}
                  >
                    Add
                  </button>
                </div>
              )}
            </Subscribe>
          </Info>
        </Wrapper>
      </Layout>
    );
  }
}

export default withRouter(Piece);
