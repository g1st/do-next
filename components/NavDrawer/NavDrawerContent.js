import React from 'react';
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
    this.setState(state => ({ open: !state.open }));
  };

  handleClick = (href, as) => {
    Router.push(href, as);
    this.props.closingDrawer();
  };

  render() {
    return (
      <List>
        <ListItem button>
          <Link href="/">
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem button onClick={this.handleToggle}>
          <ListItemText primary="Works" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div">
            {this.props.collections.map(collection => (
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

export default NavDrawerContent;
