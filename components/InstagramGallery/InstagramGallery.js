import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  Grid,
  ButtonBase,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { StyledAnchorLink } from '../../styles/Shared';
import {
  addInstagramData,
  updateInstagramVisibleItems,
} from '../../store/actions';
import ImageWithLoading from '../Gallery/ImageWithLoading';
import { INSTAGRAM_ITEMS_PER_PAGE } from '../../util/globals';

const styles = {
  gridWrapper: {
    margin: 0,
    width: '100%',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    margin: 'auto',
    display: 'block',
  },
  buttonContainer: {
    textAlign: 'center',
    margin: '20px 0',
    marginTop: '20px',
    '@media (min-width: 960px)': {
      margin: '60px 0 40px 0',
    },
  },
  headerWrapper: {
    marginBottom: '2em',
    '@media (min-width: 960px)': {
      marginBottom: '3em',
    },
  },
  heading: {
    fontSize: '1rem',
    '@media (min-width: 600px)': {
      fontSize: '1.5rem',
    },
    '@media (min-width: 960px)': {
      fontSize: '2rem',
    },
  },
  instagramSubheading: {
    fontSize: '0.75rem',
    '@media (min-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (min-width: 960px)': {
      fontSize: '0.875rem',
    },
  },
};

class InstagramGallery extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    reduxInstagramData: PropTypes.object.isRequired,
    addInstagramData: PropTypes.func.isRequired,
    updateInstagramVisibleItems: PropTypes.func.isRequired,
  };

  state = { loading: false };

  componentDidMount() {
    const {
      reduxInstagramData: { data },
    } = this.props;
    if (data.length < 1) {
      const url =
        'https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=';
      const token = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;
      const fetchUrl = url + token;
      this.fetchData(fetchUrl);
      this.renewToken();
    }
  }

  loadMore = () => {
    const {
      updateInstagramVisibleItems: reduxUpdateInstagramVisibleItems,
    } = this.props;

    reduxUpdateInstagramVisibleItems(INSTAGRAM_ITEMS_PER_PAGE);
  };

  fetchData = (url) => {
    const { addInstagramData: reduxAddInstagramData } = this.props;
    this.setState({ loading: true });
    axios
      .get(url)
      .then((res) => {
        const { data } = res.data;

        const mappedData = data.map((post) => ({
          image: post.media_url,
          link: post.permalink,
          caption: post.caption,
        }));

        reduxAddInstagramData(mappedData, INSTAGRAM_ITEMS_PER_PAGE);

        this.setState({
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  renewToken = () => {
    const token = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;

    axios.get(url).catch((e) => console.error(e));
  };

  render() {
    const { loading } = this.state;
    const {
      classes,
      reduxInstagramData: { data, currentlyVisible },
    } = this.props;
    return (
      <div>
        {loading && (
          <CircularProgress
            size={32}
            color="secondary"
            className={classes.progress}
          />
        )}
        {data.length > 0 ? (
          <>
            <div className={classes.headerWrapper}>
              <Typography
                variant="h3"
                align="center"
                color="secondary"
                className={classes.heading}
              >
                INSTAGRAM GALLERY
              </Typography>
              <Typography
                variant="body1"
                align="center"
                className={classes.instagramSubheading}
              >
                Follow{' '}
                <StyledAnchorLink
                  href="https://www.instagram.com/dovilekojewellery/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @dovilekojewellery
                </StyledAnchorLink>
              </Typography>
            </div>
            <Grid container spacing={10} className={classes.gridWrapper}>
              {data
                .slice(0, currentlyVisible)
                .map(({ image, link, caption }) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={image}
                    className={classes.gridItem}
                  >
                    <ButtonBase
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      focusRipple
                    >
                      <ImageWithLoading
                        src={image}
                        srcSet={`${image} 1x, ${image} 2x`}
                        alt={caption || 'Instagram picture'}
                      />
                    </ButtonBase>
                  </Grid>
                ))}
            </Grid>
            <div className={classes.buttonContainer}>
              {loading && (
                <CircularProgress
                  size={32}
                  color="secondary"
                  className={classes.progress}
                />
              )}
              {!loading && currentlyVisible < 24 && (
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={this.loadMore}
                >
                  Show More
                </Button>
              )}
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reduxInstagramData: state.instagramData,
});

const mapDispatchToProps = (dispatch) => ({
  addInstagramData: (data, nextPage) =>
    dispatch(addInstagramData(data, nextPage)),
  updateInstagramVisibleItems: (items) =>
    dispatch(updateInstagramVisibleItems(items)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InstagramGallery));
