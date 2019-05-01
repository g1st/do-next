import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Gallery from '../components/Gallery/Gallery';

const Works = ({ data, router, pathname, collections }) => {
  let { collection } = router.query;

  if (!collections.includes(collection)) {
    collection = 'all';
  }

  return (
    <Layout pathname={pathname} collections={collections}>
      <div>
        <Gallery
          data={data}
          showCollection={collection}
          collectionsNames={collections}
          showFilter
        />
      </div>
    </Layout>
  );
};

Works.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  router: PropTypes.object
};

Works.getInitialProps = async ({ pathname }) => ({ pathname });

export default Works;
