import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Section, SectionDivider, Jumbotron } from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../layout';
import Programs from '../components/Programs';
import { AdBasic } from '../components/Ads';
import { ProgramList } from '../../types';

type ProgramsPageQueryData = {
  allProgram: {
    group: {
      fieldValue: string;
      totalCount: number;
      edges: {
        node: ProgramList;
      }[];
    }[];
  };
};

function ProgramsPage({ data }: PageProps<ProgramsPageQueryData>) {
  const { palette } = useTheme();
  return (
    <Layout title="放送回">
      <Jumbotron disableGradient={palette.mode === 'light'} maxWidth="md">
        <Typography variant="h5" component="h2" gutterBottom>
          放送回一覧
        </Typography>
      </Jumbotron>
      <SectionDivider />
      <Section>
        <Container maxWidth="md" disableGutters>
          <Programs data={data.allProgram.group} />
        </Container>
      </Section>
      <SectionDivider />
      <AdBasic />
      <SectionDivider />
    </Layout>
  );
}

export default ProgramsPage;

export const query = graphql`
  query {
    allProgram(sort: { fields: week, order: ASC }) {
      group(field: year) {
        fieldValue
        totalCount
        edges {
          node {
            id
            title
            slug
            week
            date(formatString: "YYYY-MM-DD")
            image
          }
        }
      }
    }
  }
`;
