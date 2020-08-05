import React from 'react';
import PropTypes from 'prop-types';

import { initializeStore } from '../store';
import initialize from '../util/initialize';
import { loadState } from '../util/helpers';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    const persistedState = loadState();
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState, {
      cart: persistedState,
    });
  }
  return window[__NEXT_REDUX_STORE__];
}

export default function apWithRedux(App) {
  return class AppWithRedux extends React.Component {
    static propTypes = { initialReduxState: PropTypes.object };

    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows to set a custom default initialState
      const reduxStore = getOrCreateStore();
      // authentication
      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;
      initialize(appContext.ctx);

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
}
