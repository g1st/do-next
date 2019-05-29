import ReactGA from 'react-ga';

export const initGA = () => {
  console.log('initialize reactGA');
  ReactGA.initialize('UA-141043136-1');
};

export const logPageView = () => {
  console.log('logging page ', window.location.pathname);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
