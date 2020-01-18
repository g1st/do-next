import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { InView } from 'react-intersection-observer';

import Layout from '../components/Layout';
import LandingPageGallery from '../components/LandingPageGallery/LandingPageGallery';
import Newsletter from '../components/Newsletter/Newsletter';
import InstagramGallery from '../components/InstagramGallery/InstagramGallery';
import UpcomingEvent from '../components/UpcomingEvent/UpcomingEvent';
import GridGallery from '../components/Gallery/Gallery';

const styles = () => ({
  button: {
    display: 'block',
    margin: '60px auto 100px auto'
  }
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
      <InView triggerOnce rootMargin="300px">
        {({ inView, ref }) => (
          <div ref={ref}>
            {inView ? (
              <>
                <GridGallery
                  user={user}
                  data={data.filter(item => item.group === 'silver-flow')}
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
          </div>
        )}
      </InView>
      <InView triggerOnce rootMargin="100px">
        {({ inView, ref }) => (
          <div ref={ref}>{inView ? <InstagramGallery /> : null}</div>
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
  router: PropTypes.object
};

Index.getInitialProps = async ({ pathname, user }) => ({ pathname, user });

export default withStyles(styles)(Index);
