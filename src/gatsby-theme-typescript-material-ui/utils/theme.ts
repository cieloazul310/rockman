import teal from '@material-ui/core/colors/teal';
import orange from '@material-ui/core/colors/orange';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'YuGothic',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default responsiveFontSizes(theme);
