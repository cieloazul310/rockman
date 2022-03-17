import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useLocation } from '@reach/router';
import { Layout, Jumbotron, Section, SectionDivider, Article, Alert } from '@cieloazul310/gatsby-theme-aoi';

function NotFoundPage() {
  const location = useLocation();
  return (
    <Layout title="Not Found">
      <Jumbotron disableGradient maxWidth="md">
        <Typography variant="h5" component="h2" gutterBottom>
          Not Found
        </Typography>
      </Jumbotron>
      <SectionDivider />
      <Section>
        <Article maxWidth="md">
          <Alert severity="warning">
            <code>{location.pathname}</code> doesn&#39;t exist.
          </Alert>
        </Article>
      </Section>
    </Layout>
  );
}

export default NotFoundPage;
