import * as React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { StoryFn, StoryContext } from '@storybook/react';

import themes from './themes';

export const withMuiTheme = (Story: StoryFn, context: StoryContext) => {
  const { theme: themeKey } = context.globals;

  // only recompute the theme if the themeKey changes
  const theme = React.useMemo(() => themes[themeKey] || themes['light'], [themeKey]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};
