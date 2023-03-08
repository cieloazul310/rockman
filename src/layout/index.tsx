import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Layout, LayoutProps } from '@cieloazul310/gatsby-theme-aoi';

function MainLayout({ children, ...props }: LayoutProps) {
  return (
    <Layout componentViewports={{ bottomNav: false }} {...props}>
      <Stack spacing={2} bgcolor={({ palette }) => (palette.mode === 'light' ? '#fafafa' : 'background.default')}>
        {children}
      </Stack>
    </Layout>
  );
}

export default MainLayout;
