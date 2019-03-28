import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import Gallery from '../components/Gallery/Gallery';
import { increaseLoadedItems } from '../store/actions';

const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  @media (min-width: 960px) {
    padding-bottom: 40px;
    padding-top: 20px;
  }
`;

class Works extends React.Component {
  constructor(props) {
    super(props);
    const { data, collections: collectionsNames, reduxLoadedItems } = props;
    const collections = {
      all: { data, itemsLoaded: reduxLoadedItems }
    };

    const dataForSelectedCollection = (allItemsData, collection) =>
      allItemsData.filter(x => x.group === collection);

    collectionsNames.forEach(collection => {
      collections[collection] = {
        data: dataForSelectedCollection(data, collection),
        itemsLoaded: reduxLoadedItems
      };
    });

    this.state = {
      data,
      collections: { ...collections }
    };
  }

  loadMore(collection) {
    const {
      reduxLoadedItems,
      increaseLoadedItems: increaseLoadedItemsRedux
    } = this.props;

    increaseLoadedItemsRedux();

    this.setState(prevState => ({
      collections: {
        ...prevState.collections,
        [collection]: {
          data: prevState.collections[collection].data,
          itemsLoaded:
            prevState.collections[collection].itemsLoaded + reduxLoadedItems
        }
      }
    }));
  }

  render() {
    console.log(this.state);

    const {
      router,
      pathname,
      from,
      collections: collectionsNames
    } = this.props;
    const { collections } = this.state;

    let { collection: collectionToDisplay } = router.query;

    if (!collectionsNames.includes(collectionToDisplay)) {
      collectionToDisplay = 'all';
    }

    let gallery = <p>Gallery empty</p>;
    let loadMoreButton = null;

    if (
      collections[collectionToDisplay] &&
      collections[collectionToDisplay].data.length > 0
    ) {
      gallery = (
        <Gallery
          data={collections[collectionToDisplay].data.slice(
            0,
            collections[collectionToDisplay].itemsLoaded
          )}
          showCollection={collectionToDisplay}
        />
      );

      if (
        collections[collectionToDisplay].data.length >
        collections[collectionToDisplay].itemsLoaded
      ) {
        loadMoreButton = (
          <ButtonContainer>
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              onClick={() => this.loadMore(collectionToDisplay)}
            >
              Load More
            </Button>
          </ButtonContainer>
        );
      }
    }

    return (
      <Layout pathname={pathname} collections={collectionsNames}>
        <div>
          <p>This is Works page.</p>
          <p>path: {pathname}</p>
          <p>from: {from}</p>
          <Link href="/piece">
            <a>Dedicated item page</a>
          </Link>
          {gallery}
          {loadMoreButton}
        </div>
      </Layout>
    );
  }
}

Works.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  router: PropTypes.object,
  from: PropTypes.string,
  increaseLoadedItems: PropTypes.func
};

Works.getInitialProps = async ({ pathname }) => ({ pathname });

const mapStateToProps = state => ({
  reduxLoadedItems: state.loadMore
});

const mapDispatchToProps = dispatch => ({
  increaseLoadedItems: () => dispatch(increaseLoadedItems())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Works);
