import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import LandingPageGallery from '../components/LandingPageGallery/LandingPageGallery';

const Index = ({ pathname, collections }) => (
  <Layout pathname={pathname} collections={collections}>
    <LandingPageGallery />
  </Layout>
);

Index.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string)
};

Index.getInitialProps = async ({ pathname, user }) => ({ pathname, user });

export default Index;
