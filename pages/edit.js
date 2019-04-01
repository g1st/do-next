import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { deauthenticate } from '../store/actions/index';
import SignIn from '../components/Admin/SignIn';
import AdminForm from '../components/Admin/AdminForm';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 20px',
    flexWrap: 'wrap'
  }
};

const Edit = ({
  user,
  deauthenticate: reduxPropDeauthenticate,
  collections,
  onePieceData
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
        <AdminForm collections={collections} itemToEdit={onePieceData[0]} />
      </div>
    ) : (
      <SignIn />
    )}
  </div>
);

Edit.getInitialProps = async ({ user, req, query }) => {
  if (req) {
    const { db } = req;
    const { id } = req.params;

    const data = await db
      .collection('works')
      .find()
      .toArray();

    const onePieceDataFromServer = data.filter(
      obj => obj._id.toString() === id
    );

    return { onePieceData: onePieceDataFromServer };
  }

  const onePieceDataFromAPI = await axios
    .get('/api/single', { params: { id: query.id } })
    .then(res => res.data);
  return { user, onePieceData: [onePieceDataFromAPI] };
};

Edit.propTypes = {
  user: PropTypes.string,
  deauthenticate: PropTypes.func,
  collections: PropTypes.array,
  onePieceData: PropTypes.array
};

export default connect(
  null,
  { deauthenticate }
)(Edit);
