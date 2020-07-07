import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import Layout from 'gatsby-theme-aoi/src/layouts/JumbotronLayout';
import ListItemLink from 'gatsby-theme-aoi/src/components/ListItemLink';
import Jumbotron from '../components/Jumbotron';
import Stat from '../components/index/Stat';
import NavigationBox from '../components/NavigationBox';
import Rank from '../components/Rank';
import ContentBasis from '../components/ContentBasis';
import { useAllPrograms, useAllArtists, useArtists } from '../utils/graphql-hooks';
import { ProgramIcon, ArtistIcon, TuneIcon } from '../icons';
import { IndexQuery } from '../../graphql-types';

function IndexPage() {
  const programs = useAllPrograms();
  const tunesLength = programs.reduce((accum, curr) => [...accum, ...curr.playlist], []).length;
  const artistsLength = useAllArtists().length;
  const edgesRankItem = useArtists('edges', 26).slice(1);
  const tunesRankItem = useArtists('tunes', 26).slice(1);

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
  //const [latest] = data.allProgram.edges;
  const [firstSong] = data.allProgram.edges.reduce((accum, { node }) => {
    return node.playlist ? [...accum, ...node.playlist.filter((tune) => tune?.youtube && tune?.youtube !== '')] : [...accum];
  }, []);
  const jumbotron = (
    <Jumbotron
      title="SPITZ草野マサムネのロック大陸漫遊記 プレイリスト集"
      header="TOKYO-FM 全国38局ネットで放送中"
      imgUrl={`https://i.ytimg.com/vi/${firstSong.youtube}/0.jpg`}
      height={346}
    />
  );

  return (
    <Layout maxWidth="md" componentViewports={{ BottomNav: false }} jumbotron={jumbotron}>
      <ContentBasis>
        <Grid container>
          <Stat icon={<ProgramIcon fontSize="inherit" />} value={programs.length} title="放送" label="回" />
          <Stat icon={<TuneIcon fontSize="inherit" />} value={tunesLength} title="曲数" label="曲" />
          <Stat icon={<ArtistIcon fontSize="inherit" />} value={artistsLength} title="アーティスト" label="組" />
        </Grid>
      </ContentBasis>
      <ContentBasis>
        <List subheader={<ListSubheader>過去2か月の放送</ListSubheader>}>
          {data.allProgram.edges.map(({ node }, index) => (
            <ListItemLink
              key={index}
              to={node.fields?.slug ?? '#'}
              primaryText={node.title ?? '放送回'}
              secondaryText={`第${node.week}回 ${node.date}`}
              divider
            />
          ))}
        </List>
      </ContentBasis>
      <ContentBasis>
        <NavigationBox />
      </ContentBasis>
      <ContentBasis>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Rank
              items={edgesRankItem}
              title="登場回数 Top25"
              itemTitle={(item) => item.fieldValue}
              itemValue={(item) => `${item.edges.length}回`}
              dense
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Rank
              items={tunesRankItem}
              title="曲数 Top25"
              itemTitle={(item) => item.fieldValue}
              itemValue={(item) => `${item.tunes.length}曲`}
              dense
            />
          </Grid>
        </Grid>
      </ContentBasis>
    </Layout>
  );
}

export default IndexPage;
