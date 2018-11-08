import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../src/getPageContext';
import { Provider } from 'unstated';
import Head from 'next/head';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  pageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container>
          {/* Wrap every page in Jss and Theme providers */}
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            {/* Unstated Context Provider */}
            {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
            <Provider>
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
            </Provider>
          </JssProvider>
        </Container>
      </React.Fragment>
    );
  }
}

export default MyApp;
