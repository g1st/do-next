import AdminForm from '../components/Admin/AdminForm';
import SignIn from '../components/Admin/SignIn';
import { connect } from 'react-redux';
import { deauthenticate } from '../store/actions/index';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 20px',
    flexWrap: 'wrap'
  }
};

const Edit = ({ user, deauthenticate, collections, onePieceData }) => {
  return (
    <div>
      {user ? (
        <div>
          <div style={styles.header}>
            <p>Hello {user}!</p>
            <div>
              <Link href="/">
                <Button>Home</Button>
              </Link>
              <Button onClick={deauthenticate}>Logout</Button>
            </div>
          </div>
          <AdminForm collections={collections} itemToEdit={onePieceData[0]} />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

Edit.getInitialProps = async ({ user, req, query }) => {
  if (req) {
    const { db } = req;
    const id = req.params.id;

    const data = await db
      .collection('works')
      .find()
      .toArray();

    const onePieceData = data.filter(obj => obj._id == id);

    return { onePieceData };
  }

  const onePieceData = await axios
    .get('/api/single', { params: { id: query.id } })
    .then(res => {
      return res.data;
    });
  return { user, onePieceData: [onePieceData] };
};

export default connect(
  null,
  { deauthenticate }
)(Edit);
