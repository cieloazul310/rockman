import * as React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

const stories = { title: 'Material-UI' };
export default stories;

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

export function MuiTypography(): JSX.Element {
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

export function MuiTypographyPrimary(): JSX.Element {
  return (
    <Container maxWidth="md">
      {variants.map((variant) => (
        <Box p={1} key={variant}>
          <Typography variant={variant} color="primary">{`MuiTypography ${variant}`}</Typography>
        </Box>
      ))}
    </Container>
  );
}
