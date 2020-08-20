import { ButtonBase, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';

import ImageWithLoading from './ImageWithLoading';
import { mediumToHighResolutionUri } from '../../util/helpers';

const styles = {
  buttonBase: {
    flexDirection: 'column',
    marginBottom: '2rem',
    '&:active': {
      cursor: 'grabbing',
    },
  },
  light: {
    fontWeight: 300,
    fontSize: '14px',
  },
  name: {
    marginTop: '0.6rem',
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif',
  },
};

const Card = ({ item, classes }) => (
  <Link href={`/piece?slug=${item.slug}`} as={`/piece/${item.slug}`}>
    <ButtonBase classes={{ root: classes.buttonBase }} focusRipple>
      <ImageWithLoading
        src={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/photos/${item.frontImage}`}
        srcSet={`${process.env.NEXT_PUBLIC_AWS_BUCKET}/photos/${
          item.frontImage
        } 1x, ${
          process.env.NEXT_PUBLIC_AWS_BUCKET
        }/photos/${mediumToHighResolutionUri(item.frontImage)} 2x`}
        alt={item.description}
      />
      <Typography variant="body1" component="span" className={classes.name}>
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Card);
