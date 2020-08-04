import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { fontFamily } from '../util/helpers';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      light: grey[600],
      main: grey[900],
      dark: grey[900],
    },
    error: {
      main: '#9e2146',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    h1: {
      fontFamily,
    },
    h2: {
      fontFamily,
    },
    h3: {
      fontFamily,
    },
    h4: {
      fontFamily,
    },
    h5: {
      fontFamily,
    },
    h6: {
      fontFamily,
    },
  },
});

export default theme;
