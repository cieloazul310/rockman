import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Layout from 'gatsby-theme-aoi/src/layouts/JumbotronLayout';
import ListItemLink from 'gatsby-theme-aoi/src/components/ListItemLink';
import Jumbotron from '../components/Jumbotron';
import JunkList from '../components/JunkList';
import ProgramSummary from '../components/ProgramSummary';
import NavigationBox from '../components/NavigationBox';
import {
  ProgramIcon,
  ArtistIcon,
  CategoryIcon,
  SelectorIcon,
  CornerIcon
} from '../icons';
import { IndexQuery } from '../../graphql-types';

interface Props {
  //location: LocationWithState;
}

function IndexPage(props: Props) {
  console.log(props);
  const data = useStaticQuery<IndexQuery>(graphql`
    query Index {
      allProgram(sort: { fields: week, order: DESC }, limit: 8) {
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
            fields {
              slug
            }
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
  const [firstSong] = data.allProgram.edges.reduce(
    (accum, { node }) => [
      ...accum,
      ...node.playlist.filter(tune => tune.youtube !== '')
    ],
    []
  );
  const jumbotron = (
    <Jumbotron
      title="SPITZ草野マサムネのロック大陸漫遊記 プレイリスト集"
      header="TOKYO-FM 全国38局ネットで放送中"
      imgUrl={`https://i.ytimg.com/vi/${firstSong.youtube}/0.jpg`}
      height={346}
    />
  );

  return (
    <Layout
      maxWidth="md"
      componentViewports={{ BottomNav: false }}
      jumbotron={jumbotron}
    >
      <Typography variant="h5" component="h2">
        最新のプレイリスト
      </Typography>
      <List>
        {data.allProgram.edges.map(({ node }, index) => (
          <ListItemLink
            key={index}
            to={node.fields.slug}
            primaryText={node.title}
            secondaryText={`第${node.week}回 ${node.date}`}
            divider
          />
        ))}
      </List>
      <Grid>
        <Grid item xs={6} sm={4} md={2}>
          <NavigationBox
            icon={<ProgramIcon />}
            label="放送回"
            to="/programs/"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <NavigationBox
            icon={<ArtistIcon />}
            label="アーティスト"
            to="/artists/"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <NavigationBox
            icon={<CategoryIcon />}
            label="放送テーマ"
            to="/categories/"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <NavigationBox
            icon={<SelectorIcon />}
            label="選曲者"
            to="/selectors/"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <NavigationBox
            icon={<CornerIcon />}
            label="コーナー"
            to="/corners/"
          />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default IndexPage;
