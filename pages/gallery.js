import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import GridGallery from '../components/Gallery/Gallery';
import { WidthContainer } from '../styles/Shared';

const Gallery = ({ data, router, pathname, collections, user }) => {
  let { collection } = router.query;

  if (!collections.includes(collection)) {
    collection = 'all';
  }

  return (
    <Layout
      pathname={pathname}
      collections={collections}
      title="Gallery | Dovile Ko"
      user={user}
    >
      <WidthContainer>
        <GridGallery
          user={user}
          data={data}
          showCollection={collection}
          collectionsNames={collections}
          showFilter
        />
      </WidthContainer>
    </Layout>
  );
};

Gallery.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  router: PropTypes.object,
  user: PropTypes.string,
};

Gallery.getInitialProps = async ({ pathname }) => ({ pathname });

export default Gallery;
