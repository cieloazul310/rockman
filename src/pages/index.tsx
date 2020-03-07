import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import JunkList from '../components/JunkList';
import { IndexQuery } from '../../graphql-types';

interface Props {
  //location: LocationWithState;
}

function IndexPage(props: Props) {
  console.log(props);
  const data = useStaticQuery<IndexQuery>(graphql`
    query Index {
      allProgram(sort: { fields: week, order: DESC }, limit: 1) {
        edges {
          node {
            id
            title
            week
            date(formatString: "YYYY-MM-DD")
            subtitle
            year
            categories
            guests
            playlist {
              artist
              corner
              id
              index
              indexInWeek
              kana
              label
              producer
              nation
              selector
              title
              week
              year
              youtube
            }
          }
        }
      }
    }
  `);
  const recentProgram = data.allProgram.edges[0].node;

  return (
    <Layout maxWidth="md">
      <Typography variant="h5" component="h2">
        最新のプレイリスト
      </Typography>
      <JunkList program={recentProgram} />
    </Layout>
  );
}

export default IndexPage;
