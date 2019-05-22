import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { increaseLoadedItems } from '../../store/actions';
import Filter from './Filter';
import ItemCard from '../ItemCard/ItemCard';
import { ITEMS_PER_PAGE } from '../../config';
import { FilterWrapper } from '../../styles/Gallery';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: '10px',
    '@media (min-width: 1460px)': { margin: '0 -80px' }
  },
  grid: {
    marginTop: '20px'
  },
  buttonContainer: {
    textAlign: 'center',
    marginBottom: '20px',
    '@media (min-width: 960px)': {
      paddingBottom: '40px',
      paddingTop: '20px'
    }
  },
  collection: {
    lineHeight: '48px',
    textTransform: 'uppercase'
  }
});

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    const { data, collectionsNames, reduxLoadedItems } = props;
    const collections = {
      all: { data, itemsLoaded: reduxLoadedItems.all }
    };

    const dataForSelectedCollection = (allItemsData, collection) =>
      allItemsData.filter(x => x.group === collection);

    collectionsNames.forEach(collection => {
      collections[collection] = {
        data: dataForSelectedCollection(data, collection),
        itemsLoaded: reduxLoadedItems[collection] || ITEMS_PER_PAGE
      };
    });

    this.state = {
      collections: { ...collections },
      withFilter: {}
    };
  }

  loadMore = collection => {
    const { increaseLoadedItems: increaseLoadedItemsRedux } = this.props;

    increaseLoadedItemsRedux(collection);

    this.setState(prevState => ({
      collections: {
        ...prevState.collections,
        [collection]: {
          data: prevState.collections[collection].data,
          itemsLoaded:
            prevState.collections[collection].itemsLoaded + ITEMS_PER_PAGE
        }
      }
    }));
  };

  handleChange = value => {
    const { showCollection } = this.props;

    this.setState({
      withFilter: {
        [showCollection]: { filter: value, category: value }
      }
    });
  };

  render() {
    const { classes, data, showCollection, showFilter } = this.props;

    if (data.length < 1) {
      return (
        <Typography variant="body2" align="center">
          Gallery empty.
        </Typography>
      );
    }

    const { withFilter, collections } = this.state;
    const { itemsLoaded } = collections[showCollection];

    const collectionData =
      showCollection === 'all'
        ? data
        : data.filter(item => item.group === showCollection);

    let filtered = collectionData.slice(0, itemsLoaded);
    let loadMoreButton = null;

    if (
      Object.prototype.hasOwnProperty.call(withFilter, showCollection) &&
      withFilter[showCollection].filter
    ) {
      filtered = collectionData.filter(
        item => item.category === withFilter[showCollection].category
      );
    } else if (collectionData.length > itemsLoaded) {
      loadMoreButton = (
        <div className={classes.buttonContainer}>
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            onClick={() => this.loadMore(showCollection)}
          >
            Load More
          </Button>
        </div>
      );
    }

    let filter = null;
    if (showFilter) {
      filter = (
        <FilterWrapper>
          <Filter
            collection={showCollection}
            data={collectionData}
            handleChange={this.handleChange}
            option={
              Object.prototype.hasOwnProperty.call(withFilter, showCollection)
                ? withFilter[showCollection].category
                : ''
            }
          />
        </FilterWrapper>
      );
    }

    return (
      <div>
        {filter}
        <div className={classes.root}>
          <Grid className={classes.grid} container spacing={8}>
            {filtered.map(item => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <ItemCard
                  id={item._id.toString()}
                  price={item.price}
                  name={item.name}
                  img={
                    item.frontImage
                      ? `/var/lib/dokku/data/storage/dovile-jewellery/${
                          item.frontImage
                        }`
                      : `/var/lib/dokku/data/storage/dovile-jewellery/${
                          item.images[0].medium
                        }`
                  }
                />
              </Grid>
            ))}
          </Grid>
          {loadMoreButton}
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  showCollection: PropTypes.string,
  classes: PropTypes.object,
  collectionsNames: PropTypes.arrayOf(PropTypes.string),
  reduxLoadedItems: PropTypes.object,
  increaseLoadedItems: PropTypes.func,
  showFilter: PropTypes.bool
};

const mapStateToProps = state => ({
  reduxLoadedItems: state.loadMore
});

const mapDispatchToProps = dispatch => ({
  increaseLoadedItems: collection => dispatch(increaseLoadedItems(collection))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Gallery));
