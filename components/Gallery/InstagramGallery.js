import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: 'var(--gridListWidth, 328px)',
    height: '100%'
  },
  imgFullHeight: {
    cursor: 'pointer',
    width: 320,
    height: 320
  },
  titleBar: {
    background: 'rgba(0,0,0,0.0)'
  },
  icon: {
    color: theme.palette.secondary.light
  }
});

function InstagramGallery(props) {
  const { classes } = props;

  const getGridListCols = () => {
    if (isWidthUp('lg', props.width)) {
      return 4;
    }

    if (isWidthUp('md', props.width)) {
      return 3;
    }

    if (isWidthUp('sm', props.width)) {
      return 2;
    }

    return 1;
  };

  const getGridListWidth = () => getGridListCols() * 328;

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={'auto'}
        className={classes.gridList}
        style={{ '--gridListWidth': `${getGridListWidth()}px` }}
        cols={getGridListCols()}
        spacing={8}
      >
        {props.data.map(tile => {
          const image = tile.images[props.imageSize];
          return (
            <GridListTile key={tile.id} cols={1}>
              <a href={tile.link} target="_blank" rel="noopener noreferrer">
                <img src={image.url} className={classes.imgFullHeight} />
              </a>
              <GridListTileBar
                actionIcon={
                  <IconButton
                    href={tile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FavoriteBorderIcon className={classes.icon} />
                  </IconButton>
                }
                title={
                  <span style={{ color: '#757575' }}>{tile.likes.count}</span>
                }
                titlePosition="top"
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}

InstagramGallery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(InstagramGallery));
