// import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

// import NavDrawer from '../NavDrawer';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  iconButton: {
    marginLeft: 20,
    marginRight: 0
  }
};

class AppNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = (type, open) => () => {
      this.setState(() => ({
        [type]: open
      }));
    };

    this.state = {
      value: 0,
      smallBar: true,
      drawerNav: false,
      drawerCart: false,
      toggleDrawer: this.toggleDrawer
    };
  }

  static async getInitialProps(ctx) {
    const { location } = ctx.pathname;
    console.log('hi');

    this.setState(() => {
      switch (location) {
        case '/':
          return { value: 0, smallBar: window.innerWidth < 800 };
        case '/works':
          return { value: 1, smallBar: window.innerWidth < 800 };
        case '/about':
          return { value: 2, smallBar: window.innerWidth < 800 };
        case '/contact':
          return { value: 3, smallBar: window.innerWidth < 800 };
        default:
          return 1;
      }
    });
    window.addEventListener('resize', this.handleWidthChange);
    return {};
  }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleWidthChange);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.smallBar !== this.state.smallBar) {
  //     return true;
  //   }
  //   if (nextState.value !== this.state.value) {
  //     return true;
  //   }
  //   if (nextState.drawerNav !== this.state.drawerNav) {
  //     return true;
  //   }
  //   if (nextState.drawerCart !== this.state.drawerCart) {
  //     return true;
  //   }
  //   return false;
  // }

  // handleChange = (event, value) => {
  //   this.setState(() => ({
  //     value
  //   }));
  // };

  // handleWidthChange = () => {
  //   this.setState(() => ({ smallBar: window.innerWidth < 800 }));
  // };
  render() {
    return <div>I'M headddddddder</div>;
  }

  // render() {
  //   const { classes } = this.props;

  //   let mobileMenu = null;
  //   let navigation = (
  //     <Tabs
  //       value={this.state.value}
  //       onChange={this.handleChange}
  //       indicatorColor="secondary"
  //       textColor="secondary"
  //       centered
  //     >
  //       <Tab
  //         label="Home"
  //         disableRipple={this.state.smallBar ? false : true}
  //         component={NavLink}
  //         to="/"
  //       />
  //       <Tab
  //         label="Works"
  //         disableRipple={this.state.smallBar ? false : true}
  //         component={NavLink}
  //         to="/works"
  //       />
  //       <Tab
  //         label="About"
  //         disableRipple={this.state.smallBar ? false : true}
  //         component={NavLink}
  //         to="/about"
  //       />
  //       <Tab
  //         label="Contact"
  //         disableRipple={this.state.smallBar ? false : true}
  //         component={NavLink}
  //         to="/contact"
  //       />
  //     </Tabs>
  //   );
  //   if (this.state.smallBar) {
  //     navigation = null;
  //     mobileMenu = (
  //       <IconButton
  //         className={classes.menuButton}
  //         color="inherit"
  //         aria-label="Menu"
  //         onClick={this.toggleDrawer('drawerNav', true)}
  //       >
  //         <MenuIcon />
  //       </IconButton>
  //     );
  //   }

  //   return (
  //     <div className={classes.root}>
  //       {/* <DrawerContext.Provider value={this.state}> */}
  //       {/* <NavDrawer />
  //         <CartDrawer /> */}
  //       {/* </DrawerContext.Provider> */}
  //       <AppBar>
  //         <Toolbar>
  //           {mobileMenu}
  //           <Typography
  //             variant="title"
  //             color="inherit"
  //             className={classes.flex}
  //           >
  //             Dovile Jewellery
  //           </Typography>
  //           {navigation}
  //           <IconButton
  //             className={classes.iconButton}
  //             color="inherit"
  //             aria-label="Shopping Basket"
  //             onClick={this.toggleDrawer('drawerCart', true)}
  //           >
  //             <ShoppingBasketIcon />
  //           </IconButton>
  //         </Toolbar>
  //       </AppBar>
  //     </div>
  //   );
  // }
}

AppNavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppNavBar);
