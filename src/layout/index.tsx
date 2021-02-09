import * as React from 'react';
import Layout, { LayoutProps } from 'gatsby-theme-aoi/src/layout';

function MainLayout({ children, ...props }: LayoutProps) {
  return <Layout {...props}>{children}</Layout>;
}

export default MainLayout;
