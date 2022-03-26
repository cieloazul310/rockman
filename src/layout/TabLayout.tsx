import * as React from 'react';
import { Layout, LayoutProps } from '@cieloazul310/gatsby-theme-aoi';
import ogImage from '../assets/ogImage.png';

function TabLayout({
  children,
  tabs,
  ...props
}: Omit<LayoutProps, 'tabSticky' | 'componentViewports' | 'tabs'> & Required<Pick<LayoutProps, 'tabs'>>) {
  return (
    <Layout tabSticky componentViewports={{ bottomNav: false }} {...props} tabs={tabs} image={ogImage}>
      {children}
    </Layout>
  );
}

export default TabLayout;
