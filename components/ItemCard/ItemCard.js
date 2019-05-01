import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    margin: '0 auto 16px auto',
    boxShadow: 'none',
    [theme.breakpoints.up('md')]: {
      marginBottom: '32px'
    },
    '&:hover': {
      cursor: 'pointer',
      boxShadow:
        '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    },
    '@media(min-width: 460px)': {
      maxWidth: '300px'
    }
  },
  textColor: {
    color: 'rgba(0, 0, 0, 0.5)'
  },
  imageContainer: {
    paddingBottom: '100%',
    height: 0,
    position: 'relative'
  }
});

const fallbackImage = '../../static/images/logo.png';

const onCardMediaError = e => {
  if (e.target.src.indexOf('/static/images/logo.png') === -1) {
    e.target.src = fallbackImage;
  }
};

const ItemCard = ({ price, name, img, classes, id }) => (
  <Card className={classes.card}>
    <Link href={`/piece?id=${id}`} as={`/piece/${id}`}>
      <a style={{ textDecoration: 'none' }}>
        <div className={classes.imageContainer}>
          <CardMedia
            className={classes.media}
            image={img}
            title={name}
            component="img"
            onError={e => onCardMediaError(e)}
          />
        </div>
        <CardContent>
          <Typography align="center" gutterBottom variant="h6" component="h2">
            {name}
          </Typography>
          <Typography
            align="center"
            component="p"
            className={classes.textColor}
          >
            {price}£
          </Typography>
        </CardContent>
      </a>
    </Link>
  </Card>
);

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  price: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  img: PropTypes.string
};

export default withStyles(styles)(ItemCard);
