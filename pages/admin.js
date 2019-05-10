import { connect } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import { deauthenticate } from '../store/actions/index';
import AdminForm from '../components/Admin/AdminForm';
import SignIn from '../components/Admin/SignIn';
import SignUp from '../components/Admin/SignUp';
import Error from '../components/Error/Error';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 20px',
    flexWrap: 'wrap'
  }
};

const Admin = ({
  user,
  deauthenticate: reduxPropDeauthenticate,
  collections,
  authServerError
}) => (
  <div>
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
        <SignUp />
        {authServerError ? (
          <Error>
            Sorry there was a problem connecting to authentication server.
            Please try again later.
          </Error>
        ) : null}
      </>
    )}
  </div>
);

Admin.propTypes = {
  user: PropTypes.string,
  collections: PropTypes.array,
  deauthenticate: PropTypes.func,
  authServerError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

Admin.getInitialProps = ({ user }) => ({ user });

const mapStateToProps = state => ({
  authServerError: state.authenticate.error
});

export default connect(
  mapStateToProps,
  { deauthenticate }
)(Admin);
