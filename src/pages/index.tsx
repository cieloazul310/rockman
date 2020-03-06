import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

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
    <Layout title="ロック大陸漫遊記プレイリスト集" maxWidth="md">
      <JunkList program={recentProgram} />
    </Layout>
  );
}

export default IndexPage;
