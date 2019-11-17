import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

import { deslugify } from '../../util/helpers';
import { clearOption } from '../../store/actions';

class NavDrawerContent extends React.Component {
  static propTypes = {
    collections: PropTypes.arrayOf(PropTypes.string),
    closingDrawer: PropTypes.func,
    clearOptionRedux: PropTypes.func
  };

  state = {
    open: true
  };

  handleToggle = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  handleClick = (href, as) => {
    const { closingDrawer, clearOptionRedux } = this.props;
    Router.push(href, as);
    closingDrawer();
    clearOptionRedux();
  };

  handleKeyDown = ({ key }, collection, href) => {
    const { clearOptionRedux } = this.props;

    if (key === 'Enter' || key === ' ') {
      if (collection) {
        this.handleClick(
          `/gallery?collection=${collection}`,
          `/gallery/${collection}`
        );
      } else {
        this.handleClick(href);
      }
      clearOptionRedux();
    }
  };

  render() {
    const { open } = this.state;
    const { collections } = this.props;
    return (
      <List>
        <ListItem button onKeyDown={e => this.handleKeyDown(e, null, '/')}>
          <Link href="/">
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem button onClick={this.handleToggle}>
          <ListItemText primary="Gallery" />
          {open ? <ArrowDropUp /> : <ArrowDropDown />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItem
              button
              key="gallery"
              onKeyDown={e => this.handleKeyDown(e, null, '/gallery')}
            >
              <ListItemText
                inset
                primary="SHOW ALL"
                style={{ paddingLeft: '16px' }}
                onClick={() =>
                  this.handleClick(`/gallery?collection=gallery`, `/gallery`)
                }
              />
            </ListItem>
            {collections.map(collection => (
              <ListItem
                button
                key={collection}
                onKeyDown={e => this.handleKeyDown(e, collection)}
              >
                <ListItemText
                  inset
                  primary={deslugify(collection).toUpperCase()}
                  style={{ paddingLeft: '16px' }}
                  onClick={() =>
                    this.handleClick(
                      `/gallery?collection=${collection}`,
                      `/gallery/${collection}`
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem
          button
          to="/about"
          onKeyDown={e => this.handleKeyDown(e, null, '/about')}
        >
          <Link href="/about">
            <ListItemText primary="About" />
          </Link>
        </ListItem>
        <ListItem
          button
          to="/wheretofind"
          onKeyDown={e => this.handleKeyDown(e, null, '/wheretofind')}
        >
          <Link href="/wheretofind">
            <ListItemText primary="Where To Find" />
          </Link>
        </ListItem>
        <ListItem
          button
          to="/contact"
          onKeyDown={e => this.handleKeyDown(e, null, '/contact')}
        >
          <Link href="/contact">
            <ListItemText primary="Contact" />
          </Link>
        </ListItem>
      </List>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  clearOptionRedux: () => dispatch(clearOption())
});

export default connect(null, mapDispatchToProps)(NavDrawerContent);
