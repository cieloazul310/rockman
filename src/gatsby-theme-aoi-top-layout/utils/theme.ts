import teal from '@material-ui/core/colors/teal';
import orange from '@material-ui/core/colors/orange';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange,
  },
});

export default responsiveFontSizes(theme);
