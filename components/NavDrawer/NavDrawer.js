import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';

import { DrawerContext } from '../DrawerContext';
import NavDrawerContent from './NavDrawerContent';

const styles = {
  list: {
    width: 250,
  },
};

class NavDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    collections: PropTypes.arrayOf(PropTypes.string),
  };

  static contextType = DrawerContext;

  render() {
    const { classes, collections } = this.props;
    const { drawerNav, toggleDrawer } = this.context;
    const sideNavList = (
      <>
        <NavDrawerContent
          collections={collections}
          closingDrawer={toggleDrawer('drawerNav', false)}
        />
      </>
    );

    return (
      <div>
        <Drawer
          open={drawerNav}
          onClose={toggleDrawer('drawerNav', false)}
          onOpen={toggleDrawer('drawerNav', true)}
        >
          <div className={classes.list} tabIndex={-1} role="button">
            {sideNavList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(NavDrawer);
