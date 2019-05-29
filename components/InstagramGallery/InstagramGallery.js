import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withInstagramFeed from 'origen-react-instagram-feed';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  ButtonBase,
  Typography,
  CircularProgress
} from '@material-ui/core';

import { StyledAnchorLink } from '../../styles/Shared';

const styles = () => ({
  wrapper: {
    '@media (min-width: 960px)': {
      margin: '-26px'
    }
  },
  image: {
    width: '100%',
    height: '100%'
  },
  progress: {
    margin: 'auto',
    display: 'block'
  }
});

const InstaGrid = ({ classes, media, account, status }) => (
  <div>
    {status === 'completed' && (
      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h5" align="center" color="secondary">
          INSTAGRAM GALLERY
        </Typography>
        <Typography variant="body2" align="center">
          Follow me{' '}
          <StyledAnchorLink href="https://www.instagram.com/dovilejewellery/">
            @dovilejewellery
          </StyledAnchorLink>
        </Typography>
      </div>
    )}
    <Grid container spacing={32} className={classes.wrapper}>
      {media &&
        status === 'completed' &&
        media.map(({ displayImage, id, postLink, accessibilityCaption }) => (
          <Grid item xs={12} sm={6} md={4} key={id || displayImage}>
            <ButtonBase
              href={postLink || `https://www.instagram.com/${account}/`}
            >
              <img
                src={displayImage}
                alt={accessibilityCaption || 'Instagram picture'}
                className={classes.image}
              />
            </ButtonBase>
          </Grid>
        ))}
      {status === 'loading' && (
        <CircularProgress
          size={32}
          color="secondary"
          className={classes.progress}
        />
      )}
      {status === 'failed' && null}
    </Grid>
  </div>
);

InstaGrid.propTypes = {
  media: PropTypes.arrayOf(PropTypes.object),
  account: PropTypes.string,
  classes: PropTypes.object.isRequired,
  status: PropTypes.string
};

export default compose(
  withInstagramFeed,
  withStyles(styles)
)(InstaGrid);
