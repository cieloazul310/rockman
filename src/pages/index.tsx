import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Layout from 'gatsby-theme-aoi/src/layouts/JumbotronLayout';
import ListItemLink from 'gatsby-theme-aoi/src/components/ListItemLink';
import Jumbotron from '../components/Jumbotron';
import Stat from '../components/index/Stat';
import RadikoLink from '../components/index/RadikoLink';
import NavigationBox from '../components/NavigationBox';
import { useAllPrograms, useAllArtists } from '../utils/graphql-hooks';
import {
  ProgramIcon,
  ArtistIcon,
  CategoryIcon,
  SelectorIcon,
  CornerIcon,
  TuneIcon
} from '../icons';
import { IndexQuery } from '../../graphql-types';

interface Props {
  //location: LocationWithState;
}

function IndexPage(props: Props) {
  console.log(props);
  const programs = useAllPrograms();
  const tunesLength = programs.reduce((accum, curr) => [...accum, ...curr.playlist], []).length;
  const artistsLength = useAllArtists().length;
  
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
  const [latest] = data.allProgram.edges;
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
      <Grid container>
        <Stat
          icon={<ProgramIcon fontSize="inherit" />}
          value={programs.length}
          title="放送"
          label="回"
        />
        <Stat
          icon={<TuneIcon fontSize="inherit" />}
          value={tunesLength}
          title="曲数"
          label="曲"
        />
        <Stat
          icon={<ArtistIcon fontSize="inherit" />}
          
          value={artistsLength}
          title="アーティスト"
          label="組"
        />
      </Grid>
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
      <RadikoLink date={latest.node.date} />
      <Container maxWidth="sm">
        <Grid container>
          <Grid item sm={4} md={2}>
            <NavigationBox
              icon={<ProgramIcon />}
              label="放送回"
              to="/programs/"
            />
          </Grid>
          <Grid item sm={4} md={2}>
            <NavigationBox
              icon={<ArtistIcon />}
              label="アーティスト"
              to="/artists/"
            />
          </Grid>
          <Grid item sm={4} md={2}>
            <NavigationBox
              icon={<CategoryIcon />}
              label="放送テーマ"
              to="/categories/"
            />
          </Grid>
          <Grid item sm={4} md={2}>
            <NavigationBox
              icon={<SelectorIcon />}
              label="選曲者"
              to="/selectors/"
            />
          </Grid>
          <Grid item sm={4} md={2}>
            <NavigationBox
              icon={<CornerIcon />}
              label="コーナー"
              to="/corners/"
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default IndexPage;
