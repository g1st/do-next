import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import { WidthContainer } from '../styles/Shared';
import { clearCart } from '../store/actions';

const styles = () => ({
  marginTop: {
    marginTop: '30px',
  },
});

const Success = function ({
  collections,
  classes,
  user,
  clearCart: clearCartRedux,
}) {
  const router = useRouter();
  const sessionId = router.query.session_id;

  useEffect(() => {
    async function fetchSession() {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/checkout-session?sessionId=${sessionId}`
        )
        .then((res) => res.data)
        .then((session) => {
          if (session.payment_status === 'paid') {
            clearCartRedux();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchSession();
  }, [sessionId, clearCartRedux]);

  return (
    <Layout
      pathname={false}
      collections={collections}
      title="Successful payment | Dovile Ko"
      user={user}
    >
      <WidthContainer>
        <Typography variant="body1" className={classes.marginTop}>
          Your order was successful and a confirmation email was sent to your
          email.
        </Typography>
        <Typography variant="body1" className={classes.marginTop}>
          Please note that it can take a couple of minutes to arrive and might
          land in your spam folder.
        </Typography>
        <Typography variant="body1" className={classes.marginTop}>
          Many thanks, Dovile.
        </Typography>
      </WidthContainer>
    </Layout>
  );
};

Success.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
  user: PropTypes.string,
  clearCart: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Success));
