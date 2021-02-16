import * as React from 'react';
import Layout from 'gatsby-theme-aoi/src/layouts/TabPageLayout';
import { LayoutProps } from 'gatsby-theme-aoi/src/layout';
import useUpdateOnClient from 'gatsby-theme-aoi/src/utils/useUpdateOnClient';

function TabLayout({
  children,
  tabs,
  ...props
}: Omit<LayoutProps, 'tabSticky' | 'disableGutters' | 'componentViewports' | 'tabs'> & Required<Pick<LayoutProps, 'tabs'>>): JSX.Element {
  const isClient = useUpdateOnClient();
  return (
    <Layout tabSticky disableGutters componentViewports={{ BottomNav: false }} {...props} tabs={tabs} key={isClient}>
      {children}
    </Layout>
  );
}

export default TabLayout;
