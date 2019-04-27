import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Layout from '../components/Layout';
import Gallery from '../components/Gallery/Gallery';

const Index = ({ data, pathname, collections, from }) => (
  <Layout pathname={pathname} collections={collections}>
    <div>alohha</div>
    <Link href="/works">
      <a>Works</a>
    </Link>
    <br />
    <Link href="/checkout">
      <a>checkout</a>
    </Link>
    <br />
    <Link href="/admin">
      <a>admin</a>
    </Link>
    <br />
    <Link href="/about">
      <a>About</a>
    </Link>
    <br />
    <Link href="/">
      <a>Home</a>
    </Link>
    <div>Path: {pathname}</div>
    <div>From: {from}</div>
    <Gallery data={data} showCollection="all" collectionsNames={collections} />
  </Layout>
);

Index.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  from: PropTypes.string
};

Index.getInitialProps = async ({ pathname, user }) => ({ pathname, user });

export default Index;
