import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { createMuiTheme, lighten } from '@material-ui/core/styles';
import { LocationProvider, createMemorySource, createHistory } from '@reach/router';
import { withMuiTheme } from '@harelpls/storybook-addon-materialui';
import theme from '../src/gatsby-theme-aoi-top-layout/utils/theme';

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw any errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// This global variable is prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/';
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

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
