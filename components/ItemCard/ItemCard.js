import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import styled from 'styled-components';

const styles = theme => ({
  card: {
    maxWidth: 280,
    margin: '0 auto 50px auto',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  media: {
    [theme.breakpoints.up('xs')]: {
      height: 200
    },
    [theme.breakpoints.up('sm')]: {
      height: 220
    },
    [theme.breakpoints.up('md')]: {
      height: 220
    },
    [theme.breakpoints.up('lg')]: {
      height: 240
    },
    margin: '0 auto'
  },
  textColor: {
    color: 'rgba(0, 0, 0, 0.5)'
  }
});

const fallbackImage = '../../static/images/logo.png';

const onCardMediaError = e => {
  if (e.target.src.indexOf('/static/images/logo.png') === -1) {
    e.target.src = fallbackImage;
  }
};

const ItemCard = props => {
  const { price, name, img, classes, id } = props;
  return (
    <Card className={classes.card}>
      <Link href={`/piece?id=${id}`} as={`/piece/${id}`}>
        <a style={{ textDecoration: 'none' }}>
          <CardMedia
            className={classes.media}
            image={img}
            title={name}
            component={'img'}
            onError={e => onCardMediaError(e)}
          />
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
};

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  price: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  img: PropTypes.string
};

export default withStyles(styles)(ItemCard);
