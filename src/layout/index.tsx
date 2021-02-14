import * as React from 'react';
import Layout, { LayoutProps } from 'gatsby-theme-aoi/src/layout';
import useUpdateOnClient from 'gatsby-theme-aoi/src/utils/useUpdateOnClient';

function MainLayout({ children, ...props }: Omit<LayoutProps, 'disableGutters' | 'disablePaddingTop' | 'componentViewports'>) {
  const isClient = useUpdateOnClient();
  return (
    <Layout disableGutters disablePaddingTop componentViewports={{ BottomNav: false }} {...props} key={isClient}>
      {children}
    </Layout>
  );
}

export default MainLayout;
