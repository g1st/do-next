import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Stripe from '../components/Stripe/Stripe';

const styles = theme => ({
  h6: {
    [theme.breakpoints.up('md')]: {
      fontSize: '34px'
    }
  }
});

const Checkout = ({ classes, collections, user }) => (
  <Layout
    pathname={false}
    collections={collections}
    title="Checkout | Dovile Jewellery"
    user={user}
  >
    <Typography component="h1" variant="h5" className={classes.h6}>
      Checkout
    </Typography>
    <Stripe />
  </Layout>
);

Checkout.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
  user: PropTypes.string
};

export default withStyles(styles)(Checkout);
