import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../src/getPageContext';
import { Provider } from 'unstated';
import Head from 'next/head';
import axios from 'axios';
import '../styles/emptyFileToFixNextjsBug.css';

import CartContainer from '../containers/CartContainer';

let cart = new CartContainer();

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  static async getInitialProps({ Component, ctx }) {
    var pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
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
      const collections = data.reduce((acc, next) => {
        acc.push(next.group);
        return acc;
      }, []);

      pageProps = {
        ...pageProps,
        data: JSON.stringify(data),
        from: 'server',
        collections
      };

      return { pageProps };
    }

    // we are on a client and can access localStorage - no need for api call
    if (localStorage.getItem('data')) {
      pageProps = {
        ...pageProps,
        data: localStorage.getItem('data'),
        collections: localStorage.getItem('collections').split(','),
        from: 'rest api'
      };

      return { pageProps };
    }
    // Otherwise, we're rendering on the client and need to use the API
    const works = await axios.get('/api').then(res => {
      return res.data;
    });

    const collections = works.reduce((acc, next) => {
      acc.push(next.group);
      return acc;
    }, []);

    pageProps = {
      ...pageProps,
      data: JSON.stringify(works),
      from: 'rest api',
      collections
    };

    return { pageProps };
  }

  pageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    // Save data to localStorage
    if (!localStorage.getItem('data')) {
      localStorage.setItem('data', this.props.pageProps.data);
      localStorage.setItem('collections', this.props.pageProps.collections);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container>
          <Provider inject={[cart]}>
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
                {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
                <Head>
                  <title>Dovile Jewellery</title>
                </Head>
                <Component pageContext={this.pageContext} {...pageProps} />
              </MuiThemeProvider>
            </JssProvider>
          </Provider>
        </Container>
      </React.Fragment>
    );
  }
}

export default MyApp;
