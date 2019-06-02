import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { Grid, ButtonBase, Typography } from '@material-ui/core';

const styles = () => ({
  wrapper: {
    marginTop: '30px',
    '@media (min-width: 960px)': {
      marginTop: '100px'
    }
  },
  gridWrapper: {
    margin: 0,
    width: '100%'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center'
  },
  light: {
    fontWeight: 300
  },
  buttonBase: {
    flexDirection: 'column'
  }
});

const PieceGallery = ({ data, currentItem, classes }) => {
  let mightAlsoLikeData;
  mightAlsoLikeData = data.reduce((acc, item) => {
    if (
      item.group === currentItem.group &&
      item._id.toString() !== currentItem._id.toString() &&
      item.category === currentItem.category
    ) {
      acc.push(item);
    }
    return acc;
  }, []);

  if (mightAlsoLikeData.length < 1) {
    mightAlsoLikeData = data
      .reduce((acc, item) => {
        if (
          item._id.toString() !== currentItem._id.toString() &&
          item.category === currentItem.category
        ) {
          acc.push(item);
        }
        return acc;
      }, [])
      .slice(0, 9);
  }

  return (
    <div className={classes.wrapper}>
      {mightAlsoLikeData.length > 0 ? (
        <>
          <div style={{ marginBottom: '40px' }}>
            <Typography variant="body1" color="secondary">
              YOU MIGHT ALSO LIKE
            </Typography>
          </div>
          <Grid container spacing={32} className={classes.gridWrapper}>
            {mightAlsoLikeData.map(item => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item._id}
                className={classes.gridItem}
              >
                <Link href={`/piece?id=${item._id}`} as={`/piece/${item._id}`}>
                  <ButtonBase className={classes.buttonBase}>
                    <img
                      src={`/static/uploads/${item.frontImage}`}
                      alt={item.description}
                      className={classes.image}
                    />
                    <Typography>{item.name}</Typography>
                    <Typography className={classes.light}>
                      £{item.price.toFixed(2)}
                    </Typography>
                  </ButtonBase>
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}
    </div>
  );
};

PieceGallery.propTypes = {
  currentItem: PropTypes.object,
  data: PropTypes.array,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PieceGallery);
