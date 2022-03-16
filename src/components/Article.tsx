import * as React from 'react';
import Container, { ContainerProps } from '@mui/material/Container';

function Article({ children, maxWidth, ...props }: ContainerProps) {
  return (
    <Container maxWidth={maxWidth ?? 'md'} {...props} sx={{ py: 1 }}>
      {children}
    </Container>
  );
}

export default Article;
