import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ItemCard from '../ItemCard/ItemCard';
import PropTypes from 'prop-types';

import { ItemsContainer } from '../../styles/Gallery';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: '100%'
  }
});

const Gallery = props => {
  const { classes, width, data, showCollection } = props;

  if (showCollection == 'all') {
    var filtered = data;
  } else {
    filtered = data.filter(item => item.group == showCollection);
  }

  const columns = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4
  };

  const spacing = {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1
  };
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={'auto'}
        className={classes.gridList}
        cols={columns[width] || 3}
        spacing={spacing[width] || 12}
      >
        {filtered.map(item => (
          <GridListTile key={item._id} cols={1}>
            <ItemCard
              id={item._id}
              price={item.price}
              name={item.name}
              img={`/static/uploads/${item.images[0].thumb}`}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

Gallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  showCollection: PropTypes.string
};

export default withWidth()(withStyles(styles)(Gallery));
