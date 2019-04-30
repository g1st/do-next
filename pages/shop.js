import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Layout from '../components/Layout';
import Gallery from '../components/Gallery/Gallery';

const Shop = ({ data, router, pathname, from, collections }) => {
  let { collection } = router.query;

  if (!collections.includes(collection)) {
    collection = 'all';
  }

  return (
    <Layout pathname={pathname} collections={collections}>
      <div>
        <p>This is Shop page.</p>
        <p>path: {pathname}</p>
        <p>from: {from}</p>
        <Link href="/piece">
          <a>Dedicated item page</a>
        </Link>

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

Shop.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  router: PropTypes.object,
  from: PropTypes.string
};

Shop.getInitialProps = async ({ pathname }) => ({ pathname });

export default Shop;
