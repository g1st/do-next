import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';

import { DrawerContext } from '../DrawerContext';
import NavDrawerContent from './NavDrawerContent';

const styles = {
  list: {
    width: 250
  }
};

class NavDrawer extends Component {
  static contextType = DrawerContext;

  render() {
    const { classes } = this.props;

    const sideNavList = (
      <Fragment>
        <NavDrawerContent />
      </Fragment>
    );

    return (
      <div>
        <Drawer
          open={this.context.drawerNav}
          onClose={this.context.toggleDrawer('drawerNav', false)}
          onOpen={this.context.toggleDrawer('drawerNav', true)}
        >
          <div
            className={classes.list}
            tabIndex={0}
            role="button"
            onClick={this.context.toggleDrawer('drawerNav', false)}
            onKeyDown={this.context.toggleDrawer('drawerNav', false)}
          >
            {sideNavList}
          </div>
        </Drawer>
        );
      </div>
    );
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavDrawer);
