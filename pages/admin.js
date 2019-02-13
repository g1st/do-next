import AdminForm from '../components/Admin/AdminForm';
import SignIn from '../components/Admin/SignIn';
import { connect } from 'react-redux';
import { deauthenticate } from '../store/actions/index';

const Admin = ({ user, deauthenticate }) => {
  return (
    <div>
      <p>This is Admin page.</p>
      {user ? (
        <div>
          <p>Hello {user}</p>
          <AdminForm />
          <button onClick={deauthenticate}>Logout</button>
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
