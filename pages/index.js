import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';

import Layout from '../components/Layout';
import LandingPageGallery from '../components/LandingPageGallery/LandingPageGallery';
import Newsletter from '../components/Newsletter/Newsletter';
import UpcomingEvent from '../components/UpcomingEvent/UpcomingEvent';
import InstagramGallery from '../components/InstagramGallery/InstagramGallery';

const styles = () => ({
  button: {
    maxWidth: '300px',
    display: 'block',
    margin: '40px auto 20px auto',
    padding: '10px',
    '@media (min-width: 960px)': {
      display: 'none'
    }
  }
});

const handleButton = () => {
  Router.push('/gallery');
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
      GALLERY
    </Button>
    <UpcomingEvent />
    <Newsletter />
    <InView triggerOnce rootMargin="450px">
      {({ inView, ref }) => (
        <div ref={ref}>
          {inView ? (
            <InstagramGallery
              account="dovilejewellery"
              numberOfMediaElements={9}
            />
          ) : null}
        </div>
      )}
    </InView>
  </Layout>
);

Index.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired
};

Index.getInitialProps = async ({ pathname, user }) => ({ pathname, user });

export default withStyles(styles)(Index);
