import * as React from 'react';
import Layout, { LayoutProps } from 'gatsby-theme-aoi/src/layout';

function MainLayout({ children, ...props }: Omit<LayoutProps, 'disableGutters' | 'disablePaddingTop' | 'componentViewports'>) {
  return (
    <Layout disableGutters disablePaddingTop componentViewports={{ BottomNav: false }} {...props}>
      {children}
    </Layout>
  );
}

export default MainLayout;
