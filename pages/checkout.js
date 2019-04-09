import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Stripe from '../containers/Stripe/Stripe';

const styles = theme => ({
  h6: {
    [theme.breakpoints.up('md')]: {
      fontSize: '34px'
    }
  }
});

const Checkout = ({ classes, collections }) => (
  <Layout pathname={false} collections={collections}>
    <Typography
      component="h1"
      variant="h5"
      className={classes.h6}
      gutterBottom
      align="center"
    >
      Checkout
    </Typography>
    <Stripe />
  </Layout>
);

Checkout.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Checkout);
