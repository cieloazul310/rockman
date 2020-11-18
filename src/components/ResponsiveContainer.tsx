import * as React from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

type Props = Omit<ContainerProps, 'disableGutters'>;

function ResponsiveContainer({ children, ...props }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  return (
    <Container disableGutters={isMobile} {...props}>
      {children}
    </Container>
  );
}

export default ResponsiveContainer;
