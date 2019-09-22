/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import NavDrawer from '../NavDrawer/NavDrawer';
import CartDrawer from '../CartDrawer/CartDrawer';
import { DrawerContext } from '../DrawerContext';
import ShoppingBasket from './ShoppingBasket';
import { Wrapper, WrapSpan, Span } from '../../styles/NavBar';
import { AnchorLink } from '../../styles/Shared';

const styles = theme => ({
  flex: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
    fontWeight: 400,
    fontSize: '1.2rem',
    textTransform: 'uppercase'
  },
  toggleNav: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  toggleNavMenu: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  menuItem: {
    fontSize: '.9rem'
  },
  textColor: {
    color: '#212121'
  }
});

class NavBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    collections: PropTypes.arrayOf(PropTypes.string),
    pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    uniqueCartItems: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.toggleDrawer = (type, open) => () => {
      this.setState(() => ({
        [type]: open
      }));
    };

    this.state = {
      anchorEl: null,
      drawerNav: false,
      drawerCart: false,
      toggleDrawer: this.toggleDrawer
    };
  }

  handleNavBarChange = (event, value) => {
    // on gallery click we just opening menu, not redirecting
    if (value !== '/gallery') {
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
    const { anchorEl } = this.state;

    Router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0);
    });

    const navigation = (
      <Tabs
        value={pathname !== '/' ? pathname : false}
        onChange={this.handleNavBarChange}
        indicatorColor="secondary"
        textColor="secondary"
        centered
        className={classes.toggleNav}
      >
        {/* <Tab label="Home" value="/" to="/" /> */}
        <Tab
          classes={{ textColorSecondary: classes.textColor }}
          label={
            <WrapSpan>
              <Span>Gallery</Span>
              {anchorEl ? (
                <ArrowDropUp fontSize="small" />
              ) : (
                <ArrowDropDown fontSize="small" />
              )}
            </WrapSpan>
          }
          value="/gallery"
          aria-owns={anchorEl ? pathname : null}
          aria-haspopup="true"
          onClick={this.openMenu}
        />
        <Tab
          label="About"
          value="/about"
          classes={{ textColorSecondary: classes.textColor }}
        />
        <Tab
          label="Where to find"
          value="/wheretofind"
          classes={{ textColorSecondary: classes.textColor }}
        />
        <Tab
          label="Contact"
          value="/contact"
          classes={{ textColorSecondary: classes.textColor }}
        />
      </Tabs>
    );

    const smallMenu = (
      <IconButton
        className={classes.toggleNavMenu}
        color="inherit"
        aria-label="Menu"
        onClick={this.toggleDrawer('drawerNav', true)}
      >
        <MenuIcon />
      </IconButton>
    );

    return (
      <Wrapper>
        <DrawerContext.Provider value={this.state}>
          <NavDrawer collections={collections} />
          <CartDrawer />
        </DrawerContext.Provider>
        <AppBar>
          <Toolbar>
            {smallMenu}
            <div className={classes.flex}>
              <Typography
                variant="h6"
                component="h1"
                color="inherit"
                className={classes.flex}
              >
                <Link href="/">
                  <AnchorLink>Dovile Jewellery</AnchorLink>
                </Link>
              </Typography>
            </div>
            {navigation}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.closeMenu}
            >
              <MenuItem
                onClick={this.handleMenuItemClick('/gallery')}
                className={classes.menuItem}
              >
                SHOW ALL
              </MenuItem>
              {collections.map(collection => (
                <MenuItem
                  key={collection}
                  onClick={this.handleMenuItemClick(
                    `/gallery?collection=${collection}`,
                    `/gallery/${collection}`
                  )}
                  className={classes.menuItem}
                >
                  {collection.toUpperCase()}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              color="inherit"
              aria-label="Shopping Basket"
              onClick={this.toggleDrawer('drawerCart', true)}
            >
              <ShoppingBasket uniqueCartItems={uniqueCartItems} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  uniqueCartItems: state.cart.length
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(NavBar)));
