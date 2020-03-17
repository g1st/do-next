import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { Grid, ButtonBase, Typography } from '@material-ui/core';

import { WidthContainer } from '../../styles/Shared';
import ImageWithLoading from './ImageWithLoading';

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
  gridItem: {
    display: 'flex',
    justifyContent: 'center'
  },
  light: {
    fontWeight: 300
  },
  buttonBase: {
    flexDirection: 'column',
    marginBottom: '2rem'
  },
  textMargins: {
    marginBottom: '20px',
    '@media (min-width:960px)': {
      marginBottom: '40px'
    }
  },
  header: {
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif',
    fontSize: '1.75rem'
  },
  fontFamily: {
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif'
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
    <WidthContainer>
      <div className={classes.wrapper}>
        {mightAlsoLikeData.length > 0 ? (
          <>
            <div className={classes.textMargins}>
              <Typography
                variant="body1"
                color="secondary"
                className={classes.header}
              >
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
                  <Link
                    href={`/piece?slug=${item.slug}`}
                    as={`/piece/${item.slug}`}
                  >
                    <ButtonBase className={classes.buttonBase}>
                      <ImageWithLoading
                        src={`/static/uploads/${item.frontImage}`}
                        srcSet={`/static/uploads/${
                          item.frontImage
                        } 1x, /static/uploads/${item.frontImage.replace(
                          /300\./,
                          '.'
                        )} 2x`}
                        alt={item.description}
                      />
                      <Typography className={classes.fontFamily}>
                        {item.name}
                      </Typography>
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
    </WidthContainer>
  );
};

PieceGallery.propTypes = {
  currentItem: PropTypes.object,
  data: PropTypes.array,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PieceGallery);
