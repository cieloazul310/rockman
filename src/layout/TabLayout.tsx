import * as React from 'react';
import Layout from 'gatsby-theme-aoi/src/layouts/TabPageLayout';
import { LayoutProps } from 'gatsby-theme-aoi/src/layout';

function TabLayout({
  children,
  tabs,
  ...props
}: Omit<LayoutProps, 'tabSticky' | 'disableGutters' | 'componentViewports' | 'tabs'> & Required<Pick<LayoutProps, 'tabs'>>) {
  return (
    <Layout tabSticky disableGutters componentViewports={{ BottomNav: false }} {...props} tabs={tabs}>
      {children}
    </Layout>
  );
}

export default TabLayout;
