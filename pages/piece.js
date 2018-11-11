import React from 'react';
import { withRouter } from 'next/router';
import Layout from '../components/Layout.js';

class Piece extends React.Component {
  static async getInitialProps({ pathname }) {
    return { pathname };
  }

  render() {
    console.log(this.props.router.query);
    console.log(this.props.router);
    return (
      <React.Fragment>
        <Layout pathname={this.props.pathname}>
          <h1>{this.props.router.query.id}</h1>
          {/* <p>{this.props.router}</p> */}
          <p>This is the item page.</p>
        </Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(Piece);
