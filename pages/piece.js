import React from 'react';
import { withRouter } from 'next/router';
import { Subscribe } from 'unstated';
import axios from 'axios';

import Layout from '../components/Layout.js';
import CartContainer from '../containers/CartContainer';
import { Wrapper, Images, Info } from '../styles/Piece';

class Piece extends React.Component {
  static async getInitialProps({ pathname, req }) {
    if (req) {
      const { db } = req;

      const data = await db
        .collection('works')
        .find()
        .toArray();

      return { data: JSON.stringify(data), pathname, from: 'server' };
    }

    const works = await axios.get('/api').then(res => {
      return res.data;
    });

    return { data: JSON.stringify(works), pathname, from: 'rest api' };
  }

  render() {
    console.log(this.props.router.query);
    console.log(this.props.router);
    console.log(this.props.from);

    console.log(this.props.data);
    const pieceId = this.props.router.query.id;

    return (
      <Layout pathname={this.props.pathname}>
        <h1>{pieceId}</h1>
        {/* <p>{this.props.router}</p> */}
        <p>This is the item page.</p>
        <Wrapper>
          <Images>images</Images>
          <Info>info</Info>
        </Wrapper>
        <Subscribe to={[CartContainer]}>
          {cart => (
            <div>
              <span>Add item</span>
              <button
                value={pieceId}
                onClick={el => cart.addItem(el.target.value)}
              >
                Add
              </button>
            </div>
          )}
        </Subscribe>
      </Layout>
    );
  }
}

export default withRouter(Piece);
