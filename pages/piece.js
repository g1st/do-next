import React from 'react';
import { withRouter } from 'next/router';
import { Subscribe } from 'unstated';

import Layout from '../components/Layout.js';
import CartContainer from '../containers/CartContainer';
class Piece extends React.Component {
  static async getInitialProps({ pathname }) {
    return { pathname };
  }

  render() {
    console.log(this.props.router.query);
    console.log(this.props.router);
    const pieceId = this.props.router.query.id;

    return (
      <React.Fragment>
        <Layout pathname={this.props.pathname}>
          <h1>{pieceId}</h1>
          {/* <p>{this.props.router}</p> */}
          <p>This is the item page.</p>
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
      </React.Fragment>
    );
  }
}

export default withRouter(Piece);
