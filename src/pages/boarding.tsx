import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Layout from '../layout/TabLayout';
import Jumbotron from '../components/Jumbotron';
import Section, { SectionDivider } from '../components/Section';
import TextSpan from '../components/TextSpan';
import { BoardingQuery } from '../../graphql-types';

function TakeOff({ data }: PageProps<BoardingQuery>) {
  const { albums, others, notSpitz } = data;
  console.log(others, notSpitz);
  return (
    <Layout title="漫遊前の一曲" tabs={<div />}>
      <Jumbotron title="漫遊前の一曲" />
      <SectionDivider />
      <Section>
        {albums.edges.map(({ node }) => (
          <div key={node.id}>
            <Typography variant="h6">{node.title}</Typography>
            {node.tunes.map((tune) => (
              <div key={tune.id}>
                <Typography variant="body1">
                  <TextSpan>{tune.index}.</TextSpan>
                  <TextSpan>{tune.title}</TextSpan>
                </Typography>
              </div>
            ))}
          </div>
        ))}
      </Section>
    </Layout>
  );
}

export default TakeOff;

export const query = graphql`
  query Boarding {
    albums: allSpitzAlbum(filter: { albumIdNum: { lte: 100 } }) {
      edges {
        node {
          id
          albumIdNum
          title
          year
          tunes {
            id
            index
            title
          }
        }
      }
    }
    others: allSpitzAlbum(filter: { albumIdNum: { gte: 100 } }) {
      edges {
        node {
          id
          albumIdNum
          title
          year
          tunes {
            id
            index
            title
          }
        }
      }
    }
    notSpitz: allTunes(corner: "漫遊前の一曲") {
      title
    }
  }
`;
