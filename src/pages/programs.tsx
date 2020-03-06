import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import Programs from '../components/Programs';

function ProgramsPage() {
  return (
    <Layout title="放送回">
      <Typography variant="h5" component="h3">
        Summary
      </Typography>
      <Programs />
    </Layout>
  );
}

export default ProgramsPage;
