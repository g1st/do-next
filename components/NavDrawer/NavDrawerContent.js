import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class NavDrawerContent extends React.Component {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    return (
      <List>
        <ListItem button>
          <Link href="/">
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem button onClick={this.handleClick}>
          <ListItemText primary="Works" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItem button>
              <ListItemText
                inset
                primary="Golden"
                style={{ paddingLeft: '16px' }}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                inset
                primary="Wooden"
                style={{ paddingLeft: '16px' }}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                inset
                primary="Silver"
                style={{ paddingLeft: '16px' }}
              />
            </ListItem>
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
