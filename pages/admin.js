import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { deauthenticate } from '../store/actions/index';
import AdminForm from '../components/Admin/AdminForm';
import SignIn from '../components/Admin/SignIn';
import SignUp from '../components/Admin/SignUp';

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
  collections
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
      </>
    )}
  </div>
);

Admin.propTypes = {
  user: PropTypes.string,
  collections: PropTypes.array,
  deauthenticate: PropTypes.func
};

Admin.getInitialProps = ({ user }) => ({ user });

export default connect(
  null,
  { deauthenticate }
)(Admin);
