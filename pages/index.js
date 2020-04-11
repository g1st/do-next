import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { InView } from 'react-intersection-observer';

import Layout from '../components/Layout';
import LandingPageGallery from '../components/LandingPageGallery/LandingPageGallery';
import LandingPageGalleryWooden from '../components/LandingPageGallery/LandingPageGalleryWooden';
import Newsletter from '../components/Newsletter/Newsletter';
import InstagramGallery from '../components/InstagramGallery/InstagramGallery';
import UpcomingEvent from '../components/UpcomingEvent/UpcomingEvent';
import GridGallery from '../components/Gallery/Gallery';
import Featured from '../components/Featured.js';
import { WidthContainer } from '../styles/Shared';

const styles = () => ({
  button: {
    display: 'block',
    margin: '5rem auto 5rem auto',
  },
});

const handleButton = () => {
  Router.push('/gallery');
};

const Index = ({ pathname, collections, classes, user, data, router }) => {
  let { collection } = router.query;

  if (!collections.includes(collection)) {
    collection = 'all';
  }
  return (
    <Layout pathname={pathname} collections={collections} user={user}>
      <LandingPageGallery />
      <UpcomingEvent />
      <LandingPageGalleryWooden />
      <Featured data={data.filter((item) => item.featured)} />
      <InView triggerOnce rootMargin="200px">
        {({ inView, ref }) => (
          <WidthContainer ref={ref}>
            {inView ? (
              <>
                <GridGallery
                  user={user}
                  data={data.filter((item) => item.group === 'silver-flow')}
                  showCollection={collection}
                  collectionsNames={collections}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={handleButton}
                  size="medium"
                >
                  Show more
                </Button>
              </>
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
  classes: PropTypes.object.isRequired,
  user: PropTypes.string,
  data: PropTypes.array,
  router: PropTypes.object,
};

Index.getInitialProps = async ({ pathname, user }) => ({ pathname, user });

export default withStyles(styles)(Index);
