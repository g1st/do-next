import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import { Provider } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';

import * as gtag from '../lib/gtag';
import withReduxStore from '../lib/with-redux-store';
import theme from '../src/theme';
import { saveCart, filterCollections } from '../util/helpers';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../styles/global.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};
    let user = null;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { token } = ctx.reduxStore.getState().authenticate;

    if (token) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/user`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      const isUser = response.data.user;

      user = isUser;
    }

    // credits http://thecodebarbarian.com/building-a-nextjs-app-with-mongodb.html
    if (ctx.req) {
      // If `req` is defined, we're rendering on the server and should use
      // MongoDB directly. One could also use the REST API, but that's slow
      // and inelegant.
      const { db } = ctx.req;
      // Note that `db` above comes from express middleware
      const data = await db.collection('works').find().toArray();
      const collectionsFromServer = filterCollections(data, user);
      pageProps = {
        ...pageProps,
        data,
        from: 'server',
        collections: collectionsFromServer,
        router,
        user,
      };
      return { pageProps };
    }

    // we are on a client and can access localStorage - no need for api call
    if (localStorage.getItem('data')) {
      const parsedData = JSON.parse(localStorage.getItem('data'));
      pageProps = {
        ...pageProps,
        data: parsedData,
        collections: filterCollections(parsedData, user),
        from: 'rest api',
        router,
        user,
      };

      return { pageProps };
    }
    // Otherwise, we're rendering on the client and need to use the API
    const works = await axios.get('/api').then((res) => res.data);

    // To populate menu for user's created collections(works in frontend)
    const collections = filterCollections(works, user);

    pageProps = {
      ...pageProps,
      data: works,
      from: 'rest api',
      collections,
      router,
      user,
    };

    return { pageProps };
  }

  componentDidMount() {
    Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

    const { reduxStore } = this.props;

    reduxStore.subscribe(() => {
      saveCart(reduxStore.getState().cart);
    });

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    localStorage.setItem('data', JSON.stringify(this.props.pageProps.data));
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
        <Head>
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <Provider store={reduxStore}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </>
    );
  }
}

export default withReduxStore(MyApp);
