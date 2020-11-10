/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import NavDrawer from '../NavDrawer/NavDrawer';
import CartDrawer from '../CartDrawer/CartDrawer';
import { DrawerContext } from '../DrawerContext';
import ShoppingBasket from './ShoppingBasket';
import { Wrapper, WrapSpan, Span, Icon } from '../../styles/NavBar';
import { AnchorLink, LogoImage } from '../../styles/Shared';
import { deslugify } from '../../util/helpers';
import { clearOption } from '../../store/actions';
import logo from '../../public/images/logo.svg';

const styles = (theme) => ({
  flex: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    fontWeight: 400,
    fontSize: '1.2rem',
    textTransform: 'uppercase',
  },
  toggleNav: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  toggleNavMenu: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuItem: {
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    padding: '1em',
  },
  navText: {
    color: '#212121',
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
  },
  heading: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '0.75rem',
    },
  },
  title: {
    fontSize: '1rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
      fontWeight: 300,
    },
  },
  icon: {
    marginTop: '0',
  },
});

class NavBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    collections: PropTypes.arrayOf(PropTypes.string),
    pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    uniqueCartItems: PropTypes.number,
    user: PropTypes.string,
    clearOptionRedux: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.toggleDrawer = (type, open) => () => {
      this.setState(() => ({
        [type]: open,
      }));
    };

    this.state = {
      anchorEl: null,
      drawerNav: false,
      drawerCart: false,
      toggleDrawer: this.toggleDrawer,
    };
  }

  handleNavBarChange = (event, value) => {
    const { clearOptionRedux } = this.props;
    // on gallery click we just opening menu, not redirecting
    if (value !== '/gallery') {
      Router.push(value);
      clearOptionRedux();
    }
  };

  openMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (href, as) => () => {
    const { clearOptionRedux } = this.props;
    this.closeMenu();
    Router.push(href, as);
    clearOptionRedux();
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      classes,
      collections,
      pathname,
      uniqueCartItems,
      user,
    } = this.props;
    const { anchorEl } = this.state;

    Router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0);
    });

    const navigation = (
      <Tabs
        value={pathname !== '/' ? pathname : '/gallery'}
        onChange={this.handleNavBarChange}
        indicatorColor="secondary"
        textColor="secondary"
        centered
        className={classes.toggleNav}
        aria-label="main site navigation"
      >
        {user ? (
          <Tab
            label="Admin"
            value="/admin"
            classes={{ textColorSecondary: classes.navText }}
          />
        ) : (
          ''
        )}
        <Tab
          classes={{ textColorSecondary: classes.navText }}
          label={
            <WrapSpan>
              <Span>Gallery</Span>
              {anchorEl ? (
                <Icon>
                  <ArrowDropUp fontSize="small" className={classes.icon} />
                </Icon>
              ) : (
                <Icon>
                  <ArrowDropDown fontSize="small" className={classes.icon} />
                </Icon>
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
          classes={{ textColorSecondary: classes.navText }}
        />
        <Tab
          label="Where to find"
          value="/wheretofind"
          classes={{ textColorSecondary: classes.navText }}
        />
        <Tab
          label="Contact"
          value="/contact"
          classes={{ textColorSecondary: classes.navText }}
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
                className={classes.title}
              >
                <AnchorLink
                  className={classes.heading}
                  onClick={(e) => this.handleNavBarChange(e, '/')}
                >
                  <LogoImage src={logo} alt="Dovile Ko logo" />
                </AnchorLink>
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
              {collections.map((collection) => (
                <MenuItem
                  key={collection}
                  onClick={this.handleMenuItemClick(
                    `/gallery?collection=${collection}`,
                    `/gallery/${collection}`
                  )}
                  className={classes.menuItem}
                >
                  {deslugify(collection).toUpperCase()}
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

const mapStateToProps = (state) => ({
  uniqueCartItems: state.cart.length,
});

const mapDispatchToProps = (dispatch) => ({
  clearOptionRedux: () => dispatch(clearOption()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavBar));
