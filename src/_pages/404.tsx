import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useLocation } from '@reach/router';
import { Layout } from '@cieloazul310/gatsby-theme-aoi';
import ContentBasis from '../components/ContentBasis';
import NavigationBox from '../components/NavigationBox';

function NotFoundPage() {
  const location = useLocation();
  return (
    <Layout title="Not Found">
      <Typography variant="h2" gutterBottom>
        NOT FOUND
      </Typography>
      <Typography variant="h5" gutterBottom>
        <code>{location.pathname}</code> doesn&#39;t exist.
      </Typography>
      <ContentBasis>
        <NavigationBox />
      </ContentBasis>
    </Layout>
  );
}

export default NotFoundPage;
