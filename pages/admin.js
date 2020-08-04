import { connect } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import { deauthenticate } from '../store/actions/index';
import AdminForm from '../components/Admin/AdminForm';
import SignIn from '../components/Admin/SignIn';
import Error from '../components/Error/Error';
import { WidthContainer } from '../styles/Shared';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 20px',
    flexWrap: 'wrap',
    fontSize: '1rem',
  },
};

const Admin = ({
  user,
  deauthenticate: reduxPropDeauthenticate,
  collections,
  authServerError,
}) => (
  <WidthContainer style={{ paddingTop: 0 }}>
    {user ? (
      <div>
        <div style={styles.header}>
          <p>Hello {user}!</p>
          <div>
            <Link href="/">
              <Button>Home</Button>
            </Link>
            <Button onClick={reduxPropDeauthenticate}>Logout</Button>
          </div>
        </div>
        <AdminForm collections={collections} />
      </div>
    ) : (
      <>
        <SignIn />
        {authServerError ? (
          <Error>
            Sorry there was a problem connecting to authentication server.
            Please try again later.
          </Error>
        ) : null}
      </>
    )}
  </WidthContainer>
);

Admin.propTypes = {
  user: PropTypes.string,
  collections: PropTypes.array,
  deauthenticate: PropTypes.func,
  authServerError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

Admin.getInitialProps = ({ user }) => ({ user });

const mapStateToProps = (state) => ({
  authServerError: state.authenticate.error,
});

export default connect(mapStateToProps, { deauthenticate })(Admin);
