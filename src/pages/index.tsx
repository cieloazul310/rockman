import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import List from '@material-ui/core/List';
import ListItemAppLink from 'gatsby-theme-typescript-material-ui/src/components/ListItemAppLink';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import {
  useAppState,
  useDispatch,
} from '../gatsby-theme-typescript-material-ui/utils/AppStateContext';
import JunkList from '../components/JunkList';
import Programs from '../components/Programs';
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
    <Layout
      title="ロック大陸漫遊記プレイリスト集"
      maxWidth="md"
      drawerContents={
        <>
          <List>
            <ListItemAppLink
              to="/"
              primary="トップページ"
              selected={false}
              icon={<HomeIcon />}
            />
          </List>
          <Programs />
          <List>
            <ListItemAppLink
              to="/categories/"
              primary="カテゴリー"
              selected={false}
              icon={<HomeIcon />}
            />
            <ListItemAppLink
              to="/selectors/"
              primary="選曲者"
              selected={false}
              icon={<FaceIcon />}
            />
          </List>
        </>
      }
    >
      <JunkList program={recentProgram} />
    </Layout>
  );
}

export default IndexPage;
