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
  CircularProgress
} from '@material-ui/core';

import { instagramToken } from '../../config';
import { StyledAnchorLink } from '../../styles/Shared';
import { addInstagramData } from '../../store/actions';

const styles = {
  gridWrapper: {
    margin: 0,
    width: '100%'
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  progress: {
    margin: 'auto',
    display: 'block'
  },
  buttonContainer: {
    textAlign: 'center',
    margin: '20px 0',
    marginTop: '20px',
    '@media (min-width: 960px)': {
      margin: '60px 0 40px 0'
    }
  },
  headerWrapper: {
    marginBottom: '2em',
    marginTop: '4em',
    '@media (min-width: 960px)': {
      marginBottom: '3em',
      marginTop: '9em'
  }
  }
};

class InstagramGallery extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    reduxInstagramData: PropTypes.object.isRequired,
    addInstagramData: PropTypes.func.isRequired
  };

  state = { loading: false };

  componentDidMount() {
    const {
      reduxInstagramData: { data }
    } = this.props;
    if (data.length < 1) {
      const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${instagramToken}&count=12`;
      this.fetchData(url);
    }
  }

  loadMore = () => {
    const {
      reduxInstagramData: { nextPage }
    } = this.props;

    this.fetchData(nextPage);
  };

  fetchData = url => {
    const { addInstagramData: reduxAddInstagramData } = this.props;
    this.setState({ loading: true });
    axios
      .get(url)
      .then(res => {
        const { data } = res.data;

        let {
          pagination: { next_url: nextUrl }
        } = res.data;

        const mappedData = data.map(post => ({
          image: post.images.standard_resolution.url,
          link: post.link,
          caption: post.caption.text
        }));

        if (!nextUrl) nextUrl = null;

        reduxAddInstagramData(mappedData, nextUrl);

        this.setState({
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;
    const {
      classes,
      reduxInstagramData: { data, nextPage }
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
              <Typography variant="h5" align="center" color="secondary">
                INSTAGRAM GALLERY
              </Typography>
              <Typography variant="body2" align="center">
                Follow me{' '}
                <StyledAnchorLink
                  href="https://www.instagram.com/dovilejewellery/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @dovilejewellery
                </StyledAnchorLink>
              </Typography>
            </div>
            <Grid container spacing={32} className={classes.gridWrapper}>
              {data.map(({ image, link, caption }) => (
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
                  >
                    <img
                      src={image}
                      alt={caption || 'Instagram picture'}
                      className={classes.image}
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
              {!loading && nextPage && (
                <Button
                  size="medium"
                  variant="contained"
                  color="secondary"
                  onClick={this.loadMore}
                >
                  Load More
                </Button>
              )}
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reduxInstagramData: state.instagramData
});

const mapDispatchToProps = dispatch => ({
  addInstagramData: (data, nextPage) =>
    dispatch(addInstagramData(data, nextPage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InstagramGallery));
