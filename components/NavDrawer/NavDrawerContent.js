import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Router from 'next/router';

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

  handleKeyDown = ({ key }, collection, href) => {
    if (key === 'Enter' || key === ' ') {
      if (collection) {
        this.handleClick(
          `/works?collection=${collection}`,
          `/works/${collection}`
        );
      } else {
        this.handleClick(href);
      }
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
          <ListItemText primary="Works" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItem
              button
              key="works"
              onKeyDown={e => this.handleKeyDown(e, null, '/works')}
            >
              <ListItemText
                inset
                primary="SHOW ALL"
                style={{ paddingLeft: '16px' }}
                onClick={() =>
                  this.handleClick(`/works?collection=works`, `/works/works`)
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

NavDrawerContent.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  closingDrawer: PropTypes.func
};

export default NavDrawerContent;
