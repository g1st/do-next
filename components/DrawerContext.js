import React from 'react';

export const DrawerContext = React.createContext({
  drawerNav: false,
  drawerCart: false,
  toggleDrawer: () => {},
});
