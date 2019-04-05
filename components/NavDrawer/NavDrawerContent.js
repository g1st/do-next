import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

class NavDrawerContent extends React.Component {
  state = {
    open: true
  };

  handleToggle = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  handleClick = (href, as) => {
    const { closingDrawer } = this.props;
    Router.push(href, as);
    closingDrawer();
  };

  render() {
    const { open } = this.state;
    const { collections } = this.props;
    return (
      <List>
        <ListItem button>
          <Link href="/">
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem button onClick={this.handleToggle}>
          <ListItemText primary="Works" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            {collections.map(collection => (
              <ListItem button key={collection}>
                <ListItemText
                  inset
                  primary={collection.toUpperCase()}
                  style={{ paddingLeft: '16px' }}
                  onClick={() =>
                    this.handleClick(
                      `/works?collection=${collection}`,
                      `/works/${collection}`
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button to="/about">
          <Link href="/about">
            <ListItemText primary="About" />
          </Link>
        </ListItem>
        <ListItem button to="/contact">
          <Link href="/contact">
            <ListItemText primary="Contact" />
          </Link>
        </ListItem>
      </List>
    );
  }
}

NavDrawerContent.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  closingDrawer: PropTypes.func
};

export default NavDrawerContent;
