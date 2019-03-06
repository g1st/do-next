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
    overflow: 'hidden',
    padding: '10px 10px 0 10px',
    [theme.breakpoints.up('md')]: {
      padding: '10px 0 0 0'
    }
  },
  gridList: {
    width: '100%'
  }
});

const Gallery = props => {
  const { classes, data, showCollection } = props;

  const filtered =
    showCollection == 'all'
      ? data
      : data.filter(item => item.group == showCollection);

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        {filtered.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <ItemCard
              id={item._id}
              price={item.price}
              name={item.name}
              img={`/static/uploads/${item.images[0].medium}`}
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
