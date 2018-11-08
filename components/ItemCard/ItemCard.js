import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    maxWidth: 280,
    margin: '0 auto',
    marginBottom: '50px',
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

const ItemCard = props => {
  const { price, name, img, classes } = props;
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={img} title={name} />
      <CardContent>
        <Typography align="center" gutterBottom variant="h6" component="h2">
          {name}
        </Typography>
        <Typography align="center" component="p" className={classes.textColor}>
          {price}£
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(ItemCard);
