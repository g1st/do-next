import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import Link from 'next/link';

import { pluralise, deslugify } from '../../util/helpers';
import { AnchorLink } from '../../styles/Piece';

const styles = () => ({
  root: {
    marginLeft: 'auto'
  },
  textField: {
    marginLeft: 'auto',
    minWidth: '60px'
  },
  menu: {
    width: 200
  },
  svg: {
    top: '.3em',
    position: 'relative',
    color: '#595959',
    margin: '0 12px'
  },
  filterLine: {
    color: '#595959',
    letterSpacing: '1px'
  },
  menuItemText: {
    textTransform: 'lowercase',
    fontSize: '.9rem',
    color: '#595959'
  },
  iconColor: {
    color: '#595959'
  }
});

class Filter extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    option: PropTypes.string,
    handleChange: PropTypes.func,
    collection: PropTypes.string
  };

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleItemClick = category => () => {
    const { handleChange } = this.props;
    handleChange(category);
    this.setState({ anchorEl: null });
  };

  categorise = data => {
    /* extracts out categories and moves 'other' to the end of array */
    const categories = data.reduce((acc, item) => {
      if (!acc.includes(item.category)) acc.push(item.category);
      return acc;
    }, []);

    categories.push(
      categories.splice(
        categories.findIndex(cat => cat === 'other'),
        1
      )[0]
    );

    return categories;
  };

  render() {
    const { classes, data, option, collection } = this.props;

    const { anchorEl } = this.state;

    return (
      <div>
        <div>
          {collection !== 'all' ? (
            <>
              <Link href="/gallery">
                <AnchorLink>
                  <Typography
                    inline
                    variant="body2"
                    className={classes.filterLine}
                  >
                    gallery
                  </Typography>
                </AnchorLink>
              </Link>
              <ArrowRight fontSize="small" className={classes.svg} />
            </>
          ) : null}
          <Typography inline variant="body2" className={classes.filterLine}>
            {collection === 'all' ? 'all collections' : deslugify(collection)}
          </Typography>
          <ArrowRight fontSize="small" className={classes.svg} />
          <Typography inline variant="body2" className={classes.filterLine}>
            {pluralise(option)}
          </Typography>
          <IconButton
            aria-owns={anchorEl ? 'filter-gallery' : undefined}
            aria-haspopup="true"
            aria-label="Filter"
            onClick={this.handleClick}
            className={classes.iconColor}
          >
            <ArrowDropDown fontSize="small" />
          </IconButton>
        </div>
        <Menu
          id="filter-gallery"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem key="show all" onClick={this.handleItemClick('')}>
            <Typography variant="body2" className={classes.menuItemText}>
              show all
            </Typography>
          </MenuItem>
          {this.categorise(data).map(category => (
            <MenuItem
              key={category}
              value={category}
              onClick={this.handleItemClick(category)}
            >
              <Typography variant="body2" className={classes.menuItemText}>
                {pluralise(category)}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(Filter);
