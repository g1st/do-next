import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { InView } from 'react-intersection-observer';

import Layout from '../components/Layout';
import LandingPageGallery from '../components/LandingPageGallery/LandingPageGallery';
import Newsletter from '../components/Newsletter/Newsletter';
import InstagramGallery from '../components/InstagramGallery/InstagramGallery';
import JOYA from '../components/UpcomingEvent/JOYA';

const styles = () => ({
  button: {
    maxWidth: '300px',
    display: 'block',
    margin: '40px auto 100px auto',
    padding: '10px',
    '@media (min-width: 960px)': {
      display: 'none'
    }
  }
});

const handleButton = () => {
  Router.push('/gallery');
};
const Index = ({ pathname, collections, classes, user }) => (
  <Layout pathname={pathname} collections={collections} user={user}>
    <LandingPageGallery />
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      className={classes.button}
      onClick={handleButton}
    >
      GALLERY
    </Button>
    <JOYA />
    <InView triggerOnce rootMargin="400px">
      {({ inView, ref }) => (
        <div ref={ref}>{inView ? <InstagramGallery /> : null}</div>
      )}
    </InView>
    <Newsletter />
  </Layout>
);

Index.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
  user: PropTypes.string
};

Index.getInitialProps = async ({ pathname, user }) => ({ pathname, user });

export default withStyles(styles)(Index);
