import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Layout from 'gatsby-theme-aoi/src/layout';
import Programs from '../components/Programs';

function ProgramsPage() {
  return (
    <Layout title="放送回" maxWidth="md">
      <Typography variant="h5" component="h3">
        放送回一覧
      </Typography>
      <Container maxWidth="sm" disableGutters>
        <Box py={4}>
          <Programs />
        </Box>
      </Container>
    </Layout>
  );
}

export default ProgramsPage;
