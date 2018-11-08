import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const NavDrawerContent = props => {
  return (
    <List>
      <ListItem button to="/">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Works" />
      </ListItem>
      <ListItem button to="/about">
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button to="/contact">
        <ListItemText primary="Contacts" />
      </ListItem>
    </List>
  );
};

export default NavDrawerContent;
