import * as React from 'react';
// import { addDecorator } from '@storybook/react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
// import theme from '../src/gatsby-theme-aoi-top-layout/utils/theme';

// export default { title: 'Material-UI', decorators: [withMuiTheme()] };

export default { title: 'Material-UI' };

const variants: TypographyProps['variant'][] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'button',
  'caption',
  'overline',
  'srOnly',
];

export function MuiTypography() {
  return (
    <Container maxWidth="md">
      {variants.map((variant) => (
        <Box p={1} key={variant}>
          <Typography variant={variant}>{`MuiTypography ${variant}`}</Typography>
        </Box>
      ))}
    </Container>
  );
}
