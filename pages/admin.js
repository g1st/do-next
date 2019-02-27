import AdminForm from '../components/Admin/AdminForm';
import SignIn from '../components/Admin/SignIn';
import { connect } from 'react-redux';
import { deauthenticate } from '../store/actions/index';
import Button from '@material-ui/core/Button';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 20px',
    flexWrap: 'wrap'
  }
};

const Admin = ({ user, deauthenticate, collections }) => {
  return (
    <div>
      {user ? (
        <div>
          <div style={styles.header}>
            <p>Hello {user}!</p>
            <Button onClick={deauthenticate}>Logout</Button>
          </div>
          <AdminForm collections={collections} />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

Admin.getInitialProps = ({ user }) => {
  return { user };
};

export default connect(
  null,
  { deauthenticate }
)(Admin);
