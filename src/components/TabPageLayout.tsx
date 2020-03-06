import * as React from 'react';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  description?: string;
}

function TabPageLayout({ children, title, description }: Props) {
  return (
    <Layout
      maxWidth="xl"
      title={title}
      description={description}
      disablePaddingTop
    >
      {children}
    </Layout>
  );
}

export default TabPageLayout;
