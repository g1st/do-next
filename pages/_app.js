import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import Head from 'next/head';
import axios from 'axios';
import { Provider } from 'react-redux';
import Router from 'next/router';

import withReduxStore from '../lib/with-redux-store';
import getPageContext from '../src/getPageContext';
import { authUrl } from '../config';
import { saveCart } from '../util/helpers';
import { initGA, logPageView } from '../util/analytics';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../styles/emptyFileToFixNextjsBug.css';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};
    let user = null;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { token } = ctx.reduxStore.getState().authenticate;

    if (token) {
      const response = await axios.get(`${authUrl}/user`, {
        headers: {
          authorization: token
        }
      });

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
      const data = await db
        .collection('works')
        .find()
        .toArray();
      const collectionsFromServer = data.reduce((acc, next) => {
        if (!acc.includes(next.group)) acc.push(next.group.toLowerCase());
        return acc;
      }, []);

      pageProps = {
        ...pageProps,
        data,
        from: 'server',
        collections: collectionsFromServer,
        router,
        user
      };

      return { pageProps };
    }

    // we are on a client and can access localStorage - no need for api call
    if (localStorage.getItem('data')) {
      pageProps = {
        ...pageProps,
        data: JSON.parse(localStorage.getItem('data')),
        collections: localStorage.getItem('collections').split(','),
        from: 'rest api',
        router,
        user
      };

      return { pageProps };
    }
    // Otherwise, we're rendering on the client and need to use the API
    const works = await axios.get('/api').then(res => res.data);

    // To populate menu for user's created collections(works in frontend)
    const collections = works.reduce((acc, next) => {
      if (!acc.includes(next.group)) acc.push(next.group.toLowerCase());
      return acc;
    }, []);

    pageProps = {
      ...pageProps,
      data: works,
      from: 'rest api',
      collections,
      router,
      user
    };

    return { pageProps };
  }

  pageContext = null;

  componentDidMount() {
    initGA();
    logPageView();
    Router.router.events.on('routeChangeComplete', logPageView);

    const { reduxStore } = this.props;

    reduxStore.subscribe(() => {
      saveCart(reduxStore.getState().cart);
    });

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (
      !localStorage.getItem('data') ||
      localStorage.getItem('data') !== JSON.stringify(this.props.pageProps.data)
    ) {
      localStorage.setItem('data', JSON.stringify(this.props.pageProps.data));
      localStorage.setItem('collections', this.props.pageProps.collections);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <React.Fragment>
        <Container>
          <Head>
            <title>
              Jewellery artist Dovile Kondrasovaite | Dovile Jewellery
            </title>
            <meta
              name="Description"
              content="Contemporary amber jewellery with a delicate and modern touch by Dovile Kondrasovaite. Shop authentic handmade jewelry made by independent artist."
            />
          </Head>
          {/* Wrap every page in Jss and Theme providers */}
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />

              <Provider store={reduxStore}>
                {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
                <Component pageContext={this.pageContext} {...pageProps} />
              </Provider>
            </MuiThemeProvider>
          </JssProvider>
        </Container>
      </React.Fragment>
    );
  }
}

export default withReduxStore(MyApp);
