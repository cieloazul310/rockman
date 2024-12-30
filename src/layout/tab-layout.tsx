import * as React from "react";
import { Layout, type LayoutProps } from "@cieloazul310/gatsby-theme-aoi";

function TabLayout({
  children,
  tabs,
  ...props
}: Omit<LayoutProps, "tabSticky" | "componentViewports" | "tabs"> &
  Required<Pick<LayoutProps, "tabs">>) {
  return (
    <Layout
      tabSticky
      componentViewports={{ bottomNav: false }}
      {...props}
      tabs={tabs}
    >
      {children}
    </Layout>
  );
}

export default TabLayout;
