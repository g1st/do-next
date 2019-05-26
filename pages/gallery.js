import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import GridGallery from '../components/Gallery/Gallery';

const Gallery = ({ data, router, pathname, collections }) => {
  let { collection } = router.query;

  if (!collections.includes(collection)) {
    collection = 'all';
  }

  return (
    <Layout
      pathname={pathname}
      collections={collections}
      title="Gallery | Dovile Jewellery"
    >
      <div>
        <GridGallery
          data={data}
          showCollection={collection}
          collectionsNames={collections}
          showFilter
        />
      </div>
    </Layout>
  );
};

Gallery.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  router: PropTypes.object
};

Gallery.getInitialProps = async ({ pathname }) => ({ pathname });

export default Gallery;
