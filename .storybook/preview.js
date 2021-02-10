import { createMuiTheme, lighten } from '@material-ui/core/styles';
import { muiTheme } from 'storybook-addon-material-ui';
import theme from '../src/gatsby-theme-aoi-top-layout/utils/theme';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: lighten(theme.palette.primary.main, 0.4),
    },
    secondary: {
      main: lighten(theme.palette.secondary.main, 0.4),
    },
  },
});

export const decorators = [muiTheme([theme, darkTheme])];
