import * as React from "react";
import { Layout, LayoutProps } from "@cieloazul310/gatsby-theme-aoi";

function MainLayout({ children, ...props }: LayoutProps) {
  return (
    <Layout componentViewports={{ bottomNav: false }} {...props}>
      {children}
    </Layout>
  );
}

export default MainLayout;
