import { createTheme } from '@mui/material/styles';
import initialMuiTheme from '../src/@cieloazul310/gatsby-theme-aoi-top-layout/theme';
import { useGetDesignTokens } from '@cieloazul310/gatsby-theme-aoi';

const getDesignTokens = useGetDesignTokens(initialMuiTheme);

const light = initialMuiTheme;
const dark = createTheme(getDesignTokens('dark'));

export default {
  light,
  dark,
};
