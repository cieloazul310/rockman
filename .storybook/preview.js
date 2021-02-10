import * as React from 'react';
import { createMuiTheme, lighten } from '@material-ui/core/styles';
import { LocationProvider, createMemorySource, createHistory } from '@reach/router';
import { withMuiTheme } from '@harelpls/storybook-addon-materialui';
import theme from '../src/gatsby-theme-aoi-top-layout/utils/theme';

const source = createMemorySource('/');
const history = createHistory(source);

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

export const decorators = [
  (Story) => <LocationProvider history={history}><Story /></LocationProvider>,
  withMuiTheme([theme, darkTheme]),
];
