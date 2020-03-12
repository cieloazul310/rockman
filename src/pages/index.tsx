import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Layout from 'gatsby-theme-aoi/src/layout/JumbotronLayout';
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

const useStyles = makeStyles<Theme, { imgUrl: string }>((theme: Theme) =>
  createStyles({
    jumbotronBg: ({ imgUrl }) => ({
      height: '100%',
      backgroundImage: `url(${imgUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      filter: 'blur(8px) brightness(0.6)',
      transform: 'scale(1.1)'
    }),
    jumbotronText: {
      height: 345,
      color: 'white',
      position: 'absolute',
      transform: 'translate(0, -100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 2,
      padding: theme.spacing(2)
    },
    jumbotronTitle: {
      fontWeight: 'bold'
    }
  })
);

interface Props {
  //location: LocationWithState;
}

function IndexPage(props: Props) {
  console.log(props);
  const data = useStaticQuery<IndexQuery>(graphql`
    query Index {
      allProgram(sort: { fields: week, order: DESC }, limit: 4) {
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
  const classes = useStyles({
    imgUrl: `https://i.ytimg.com/vi/${firstSong.youtube}/0.jpg`
  });

  return (
    <Layout
      maxWidth="md"
      disableBottomNav
      jumbotron={
        <Box height={345} overflow="hidden">
          <div className={classes.jumbotronBg} />
          <div className={classes.jumbotronText}>
            <Typography variant="subtitle1">
              TOKYO-FM 全国38局ネットで放送中
            </Typography>
            <Typography variant="h2" className={classes.jumbotronTitle}>
              SPITZ草野マサムネのロック大陸漫遊記 プレイリスト集
            </Typography>
          </div>
        </Box>
      }
    >
      <Typography variant="h5" component="h2">
        最新のプレイリスト
      </Typography>
      {data.allProgram.edges.map(({ node }, index) => (
        <>
          <ProgramSummary
            key={index}
            program={node}
            enableLink
            defaultOpen={index === 0}
          />
          <Divider />
        </>
      ))}
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexWrap="wrap">
          <NavigationBox
            icon={<ProgramIcon />}
            label="放送回"
            to="/programs/"
          />
          <NavigationBox
            icon={<ArtistIcon />}
            label="アーティスト"
            to="/artists/"
          />
          <NavigationBox
            icon={<CategoryIcon />}
            label="放送テーマ"
            to="/categories/"
          />
          <NavigationBox
            icon={<SelectorIcon />}
            label="選曲者"
            to="/selectors/"
          />
          <NavigationBox
            icon={<CornerIcon />}
            label="コーナー"
            to="/corners/"
          />
        </Box>
      </Box>
    </Layout>
  );
}

export default IndexPage;
