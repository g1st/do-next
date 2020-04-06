import { ButtonBase, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';

import { awsBucket } from '../../config';
import ImageWithLoading from './ImageWithLoading';

const styles = {
  buttonBase: {
    flexDirection: 'column',
    marginBottom: '2rem',
    '&:active': {
      cursor: 'grabbing'
    }
  },
  light: {
    fontWeight: 300
  },
  name: {
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif'
  }
};

const Card = ({ item, classes }) => (
  <Link href={`/piece?slug=${item.slug}`} as={`/piece/${item.slug}`}>
    <ButtonBase classes={{ root: classes.buttonBase }} focusRipple>
      <ImageWithLoading
        src={`${awsBucket}/photos/${item.frontImage}`}
        srcSet={`${awsBucket}/photos/${
          item.frontImage
        } 1x, ${awsBucket}/photos/${item.frontImage.replace(/300\./, '.')} 2x`}
        alt={item.description}
      />
      <Typography variant="body1" className={classes.name}>
        {item.name}
      </Typography>
      <Typography component="span" className={classes.light}>
        £{item.price.toFixed(2)}
      </Typography>
    </ButtonBase>
  </Link>
);

Card.propTypes = {
  item: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Card);
