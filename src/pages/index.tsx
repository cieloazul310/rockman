import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import {
  useAppState,
  useDispatch,
} from '../gatsby-theme-typescript-material-ui/utils/AppStateContext';
import JunkList from '../components/JunkList';
import Weeks from '../components/Weeks';
import { IndexQuery } from '../../graphql-types';

interface Props {
  //location: LocationWithState;
}

function IndexPage(props: Props) {
  console.log(props);
  const data = useStaticQuery<IndexQuery>(graphql`
    query Index {
      allYaml(sort: { fields: week, order: DESC }, limit: 1) {
        edges {
          node {
            id
            title
            week
            date
            subtitle
            year
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
  const recentProgram = data.allYaml.edges[0].node;

  return (
    <Layout
      title="ロック大陸漫遊記プレイリスト集"
      maxWidth="md"
      drawerContents={<Weeks />}
    >
      <JunkList program={recentProgram} />
    </Layout>
  );
}

export default IndexPage;
