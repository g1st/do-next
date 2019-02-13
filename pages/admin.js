import AdminForm from '../components/Admin/AdminForm';
import SignIn from '../components/Admin/SignIn';

const Admin = ({ user }) => {
  return (
    <div>
      <p>This is Admin page.</p>
      {user ? (
        <div>
          <p>Hello {user}</p>
          <AdminForm />
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

export default Admin;
