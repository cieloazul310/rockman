import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Layout from '../layout';
import Jumbotron from '../components/Jumbotron';
import NavigationBox from '../components/NavigationBox';
import ProgramItem from '../components/ProgramItem';
import ArtistItemContainer from '../components/ArtistItemContainer';
import Section, { SectionDivider } from '../components/Section';
import Stats from '../components/index/Stat';
import { AdInArticle } from '../components/Ads';
import { useProgramTop25 } from '../utils/graphql-hooks/useProgramTop25';
import { IndexQuery } from '../../graphql-types';

function IndexPage({ data }: PageProps<IndexQuery>) {
  /*
  const data = useStaticQuery<IndexQuery>(graphql`
    query Index {
      allProgram(sort: { fields: week, order: DESC }, limit: 8) {
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
  `);
  */
  const top25 = useProgramTop25();
  const images = data.allProgram.edges
    .map(({ node }) => node.fields?.image ?? undefined)
    .filter((image): image is string => Boolean(image));

  return (
    <Layout>
      <Jumbotron title="ロック大陸漫遊記 プレイリスト集" footer="since 2018" image={images.length ? images[0] : undefined} />
      <SectionDivider />
      <Section>
        <Stats />
      </Section>
      <SectionDivider />
      <Section>
        <List subheader={<ListSubheader>過去2か月の放送</ListSubheader>}>
          {data.allProgram.edges.map(({ node }, index, arr) => (
            <ProgramItem key={node.week} program={node} last={index === arr.length - 1} />
          ))}
        </List>
      </Section>
      <SectionDivider />
      <AdInArticle />
      <SectionDivider />
      <Section>
        <ArtistItemContainer title="登場回数Top25" artists={top25.map(({ node }) => node)} />
      </Section>
      <SectionDivider />
      <Section>
        <NavigationBox />
      </Section>
    </Layout>
  );
}

export default IndexPage;

export const query = graphql`
  query Index {
    allProgram(sort: { fields: week, order: DESC }, limit: 8) {
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
`;
