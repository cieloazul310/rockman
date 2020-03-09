import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { useLocation } from '@reach/router';

import Layout from 'gatsby-theme-aoi/src/layout';

function NotFoundPage() {
  const location = useLocation();
  return (
    <Layout title="Not Found" maxWidth="md">
      <Typography variant="h2" gutterBottom>
        NOT FOUND
      </Typography>
      <Typography variant="h5" gutterBottom>
        <code>{location.pathname}</code> doesn&#39;t exist.
      </Typography>
    </Layout>
  );
}

export default NotFoundPage;
