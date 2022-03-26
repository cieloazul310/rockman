import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { teal, orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: orange,
  },
});

theme.typography.body1 = {
  ...theme.typography.body1,
  [theme.breakpoints.only('xs')]: {
    fontSize: '0.875rem',
  },
};
theme.typography.body2 = {
  ...theme.typography.body2,
  [theme.breakpoints.only('xs')]: {
    fontSize: '0.75rem',
  },
};

export default responsiveFontSizes(theme);
