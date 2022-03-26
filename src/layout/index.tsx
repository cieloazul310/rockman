import * as React from 'react';
import { Layout, LayoutProps } from '@cieloazul310/gatsby-theme-aoi';
import ogImage from '../assets/ogImage.png';

function MainLayout({ children, ...props }: LayoutProps) {
  return (
    <Layout componentViewports={{ bottomNav: false }} {...props} image={ogImage}>
      {children}
    </Layout>
  );
}

export default MainLayout;
