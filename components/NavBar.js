/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import withWidth from '@material-ui/core/withWidth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';

import NavDrawer from './NavDrawer/NavDrawer';
import CartDrawer from './CartDrawer/CartDrawer';
import { DrawerContext } from './DrawerContext';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  iconButton: {
    marginLeft: 20,
    marginRight: 0
  },
  tabIndicator: {
    display: 'none'
  },
  toggleNav: {
    [theme.breakpoints.up('md')]: {
      display: 'visible'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  toggleNavMenu: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'visible'
    }
  },
  badge: {
    color: '#ffffff',
    backgroundColor: '#EE7600'
  }
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = (type, open) => () => {
      this.setState(() => ({
        [type]: open
      }));
    };
    const { pathname } = this.props;

    this.state = {
      value: pathname,
      anchorEl: null,
      drawerNav: false,
      drawerCart: false,
      toggleDrawer: this.toggleDrawer,
      isClient: false
    };
  }

  componentDidMount() {
    this.setState({ isClient: true });
  }

  handleNavBarChange = (event, value) => {
    // on works click we just opening menu, not redirecting
    if (value !== '/works') {
      this.setState({ value });
      Router.push(value);
    }
  };

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (href, as) => () => {
    this.closeMenu();
    Router.push(href, as);
  };
  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, collections, pathname, uniqueCartItems } = this.props;
    const { value, anchorEl, isClient } = this.state;

    let shoppingBasket = <ShoppingBasketIcon />;
    if (isClient && uniqueCartItems) {
      shoppingBasket = (
        <Badge
          badgeContent={uniqueCartItems}
          classes={{
            badge: classes.badge
          }}
        >
          <ShoppingBasketIcon />
        </Badge>
      );
    }

    const navigation = (
      <Tabs
        value={value}
        onChange={this.handleNavBarChange}
        indicatorColor="secondary"
        textColor="secondary"
        centered
        classes={{ indicator: classes.tabIndicator }}
        className={classes.toggleNav}
      >
        <Tab label="Home" value="/" to="/" />
        <Tab
          label={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ paddingRight: 6 }}>Works</span>
              {anchorEl ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )}
            </div>
          }
          value="/works"
          aria-owns={anchorEl ? pathname : null}
          aria-haspopup="true"
          onClick={this.openMenu}
        />
        <Tab label="About" value="/about" to="/about" />
        <Tab label="Contact" value="/contact" to="/contact" />
      </Tabs>
    );

    const smallMenu = (
      <IconButton
        className={[classes.menuButton, classes.toggleNavMenu].join(' ')}
        color="inherit"
        aria-label="Menu"
        onClick={this.toggleDrawer('drawerNav', true)}
      >
        <MenuIcon />
      </IconButton>
    );

    return (
      <div>
        <div>
          <div className={classes.root}>
            <DrawerContext.Provider value={this.state}>
              <NavDrawer collections={collections} />
              <CartDrawer />
            </DrawerContext.Provider>
            <AppBar>
              <Toolbar>
                {smallMenu}
                <Typography
                  variant="h6"
                  component="h1"
                  color="inherit"
                  className={classes.flex}
                >
                  Dovile Jewellery
                </Typography>
                {navigation}
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.closeMenu}
                >
                  <MenuItem onClick={this.handleMenuItemClick('/works')}>
                    SHOW ALL
                  </MenuItem>
                  {collections.map(collection => (
                    <MenuItem
                      key={collection}
                      onClick={this.handleMenuItemClick(
                        `/works?collection=${collection}`,
                        `/works/${collection}`
                      )}
                    >
                      {collection.toUpperCase()}
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton
                  className={classes.iconButton}
                  color="inherit"
                  aria-label="Shopping Basket"
                  onClick={this.toggleDrawer('drawerCart', true)}
                >
                  {shoppingBasket}
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uniqueCartItems: state.cart.length
});

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  collections: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  uniqueCartItems: PropTypes.number
};

export default connect(mapStateToProps)(
  withRouter(withWidth()(withStyles(styles)(NavBar)))
);
