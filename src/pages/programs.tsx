import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../layout';
import Section, { SectionDivider } from '../components/Section';
import Jumbotron from '../components/Jumbotron';
import Programs from '../components/Programs';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import { ProgramPageQuery } from '../../graphql-types';

function ProgramsPage({ data }: PageProps<ProgramPageQuery>) {
  return (
    <Layout title="放送回">
      <Jumbotron title="放送回一覧" />
      <SectionDivider />
      <Section>
        <Programs data={data.allProgram.group} />
      </Section>
      <SectionDivider />
      <AdInArticle />
      <SectionDivider />
      <Section>
        <NavigationBox />
      </Section>
    </Layout>
  );
}

export default ProgramsPage;

export const query = graphql`
  query ProgramPage {
    allProgram(sort: { fields: week, order: ASC }) {
      group(field: year) {
        fieldValue
        totalCount
        edges {
          node {
            id
            title
            week
            date(formatString: "YYYY-MM-DD")
            fields {
              slug
              image
            }
          }
        }
      }
    }
  }
`;
