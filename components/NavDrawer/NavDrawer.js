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
        <NavDrawerContent
          collections={this.props.collections}
          closingDrawer={this.context.toggleDrawer('drawerNav', false)}
        />
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
  classes: PropTypes.object.isRequired,
  collections: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(NavDrawer);
