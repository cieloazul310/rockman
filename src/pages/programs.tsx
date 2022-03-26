import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Container from '@mui/material/Container';
import { Section, SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../layout';
import Jumbotron from '../components/Jumbotron';
import Programs from '../components/Programs';
import { AdInSectionDivider } from '../components/Ads';
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
  return (
    <Layout title="放送回">
      <Jumbotron title="放送回一覧" />
      <SectionDivider />
      <Section>
        <Container maxWidth="md" disableGutters>
          <Programs data={data.allProgram.group} />
        </Container>
      </Section>
      <AdInSectionDivider />
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
