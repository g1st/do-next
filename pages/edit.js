import { connect } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import { deauthenticate } from '../store/actions/index';
import SignIn from '../components/Admin/SignIn';
import AdminForm from '../components/Admin/AdminForm';
import { WidthContainer } from '../styles/Shared';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 20px',
    flexWrap: 'wrap',
  },
};

const Edit = ({
  user,
  deauthenticate: reduxPropDeauthenticate,
  collections,
  onePieceData,
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
            <Link href="/admin">
              <Button>Add new</Button>
            </Link>
            <Button onClick={reduxPropDeauthenticate}>Logout</Button>
          </div>
        </div>
        <AdminForm collections={collections} itemToEdit={onePieceData[0]} />
      </div>
    ) : (
      <SignIn />
    )}
  </WidthContainer>
);

Edit.getInitialProps = async ({ user, req, query }) => {
  if (req) {
    const { db } = req;
    const { slug } = req.params;

    const data = await db.collection('works').find().toArray();

    const onePieceDataFromServer = data.filter(
      (obj) => obj.slug.toLowerCase() === slug.toLowerCase()
    );

    return { onePieceData: onePieceDataFromServer };
  }

  const onePieceDataFromAPI = await axios
    .get('/api/single', { params: { slug: query.slug } })
    .then((res) => res.data);
  return { user, onePieceData: [onePieceDataFromAPI] };
};

Edit.propTypes = {
  user: PropTypes.string,
  deauthenticate: PropTypes.func,
  collections: PropTypes.array,
  onePieceData: PropTypes.array,
};

export default connect(null, { deauthenticate })(Edit);
