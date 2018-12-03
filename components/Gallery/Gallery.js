import React from 'react';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ItemCard from '../ItemCard/ItemCard';

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
  const { classes, width, data } = props;
  console.log(props.data);
  const { price, name, slug, images } = props.data[0];

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
      {console.log(price, name, slug, images)}
      {console.log(data)}
      <GridList
        cellHeight={'auto'}
        className={classes.gridList}
        cols={columns[width] || 3}
        spacing={spacing[width] || 12}
      >
        {data.map(item => (
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

export default withWidth()(withStyles(styles)(Gallery));
