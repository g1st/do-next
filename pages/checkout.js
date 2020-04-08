import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Stripe from '../components/Stripe/Stripe';
import { WidthContainer } from '../styles/Shared';

const styles = (theme) => ({
  h2: {
    fontSize: '1.6rem',
    margin: '1rem 0 2rem 0',

    [theme.breakpoints.up('md')]: {
      fontSize: '2.25rem',
      marginBottom: 0,
    },
  },
});

const Checkout = ({ classes, collections, user }) => (
  <Layout
    pathname={false}
    collections={collections}
    title="Checkout | Dovile Jewellery"
    user={user}
  >
    <WidthContainer>
      <Typography variant="h2" className={classes.h2}>
        Checkout
      </Typography>
      <Stripe />
    </WidthContainer>
  </Layout>
);

Checkout.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
  user: PropTypes.string,
};

export default withStyles(styles)(Checkout);
