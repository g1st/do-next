import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import ItemCard from '../ItemCard/ItemCard';
import PropTypes from 'prop-types';

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
      <Grid container spacing={8}>
        {filtered.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <ItemCard
              id={item._id}
              price={item.price}
              name={item.name}
              img={`/static/uploads/${item.images[0].thumb}`}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Gallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  showCollection: PropTypes.string
};

export default withWidth()(withStyles(styles)(Gallery));
