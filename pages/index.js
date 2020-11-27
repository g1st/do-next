import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { InView } from 'react-intersection-observer';

import Layout from '../components/Layout';
import LandingPageGallery from '../components/LandingPageGallery/LandingPageGallery';
import LandingPageGalleryWooden from '../components/LandingPageGallery/LandingPageGalleryWooden';
import Newsletter from '../components/Newsletter/Newsletter';
import InstagramGallery from '../components/InstagramGallery/InstagramGallery';
import GridGallery from '../components/Gallery/Gallery';
import Featured from '../components/Featured.js';
import { WidthContainer } from '../styles/Shared';

const styles = () => ({
  button: {
    display: 'block',
    margin: '5rem auto 5rem auto',
  },
});

const Index = ({ pathname, collections, user, data, router }) => {
  let { collection } = router.query;

  if (!collections.includes(collection)) {
    collection = 'all';
  }
  return (
    <Layout pathname={pathname} collections={collections} user={user}>
      <LandingPageGallery />
      <LandingPageGalleryWooden />
      <Featured data={data.filter((item) => item.featured)} />
      <InView triggerOnce rootMargin="200px">
        {({ inView, ref }) => (
          <WidthContainer ref={ref}>
            {inView ? (
              <GridGallery
                user={user}
                data={data}
                showCollection={collection}
                collectionsNames={collections}
              />
            ) : null}
          </WidthContainer>
        )}
      </InView>
      <InView triggerOnce rootMargin="200px">
        {({ inView, ref }) => (
          <WidthContainer ref={ref}>
            {inView ? <InstagramGallery /> : null}
          </WidthContainer>
        )}
      </InView>
      <Newsletter />
    </Layout>
  );
};

Index.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.string,
  data: PropTypes.array,
  router: PropTypes.object,
};

Index.getInitialProps = async ({ pathname, user }) => ({ pathname, user });

export default withStyles(styles)(Index);
