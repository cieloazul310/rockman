import type { Parameters, Decorator } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { action } from "@storybook/addon-actions";
import theme from "./themes";

declare global {
  interface Window {
    ___navigate: (pathname: string) => void;
  }
}

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = "/";

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions
window.___navigate = (pathname) => {
  action("NavigateTo:")(pathname);
};

export const decorators: Decorator[] = [
  withThemeFromJSXProvider({
    themes: {
      light: theme.light,
      dark: theme.dark,
    },
    defaultTheme: "light",
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
];

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
