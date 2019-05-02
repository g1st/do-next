import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';

import Layout from '../components/Layout';
import LandingPageGallery from '../components/LandingPageGallery/LandingPageGallery';

const styles = () => ({
  button: {
    maxWidth: '300px',
    display: 'block',
    margin: '40px auto 20px auto',
    '@media (min-width: 960px)': {
      display: 'none'
    }
  }
});

const handleButton = () => {
  Router.push('/shop');
};
const Index = ({ pathname, collections, classes }) => (
  <Layout pathname={pathname} collections={collections}>
    <LandingPageGallery />
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      className={classes.button}
      onClick={handleButton}
    >
      SHOP
    </Button>
  </Layout>
);

Index.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string)
};

Index.getInitialProps = async ({ pathname, user }) => ({ pathname, user });

export default withStyles(styles)(Index);
