import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
// import Skeleton from '@material-ui/lab/Skeleton';
// import SwipeableViews from 'react-swipeable-views';
// import { virtualize, bindKeyboard, SlideRenderProps } from 'react-swipeable-views-utils';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import Layout from '../layout/Template';
import { ArtistPageHeader } from '../components/PageHeader';
/*
import Jumbotron from '../components/Jumbotron';
import LazyViewer from '../components/LazyViewer';
import { TuneCardSkeleton } from '../components/TuneCard';
import DrawerNavigation from '../components/DrawerNavigation';
import PageNavigation, { createNavigationProps } from '../components/PageNavigation';
import ContentBasis from '../components/ContentBasis';
import NavigationBox from '../components/NavigationBox';
import RelatedArtists from '../components/RelatedArtists';
*/
// import sortArtists from '../utils/sortByYomi';
// import { useAllArtists } from '../utils/graphql-hooks/';
import { ArtistTemplateQuery, SitePageContext, Program, ProgramPlaylist } from '../../graphql-types';

// const VirtualizedSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

interface Props {
  data: ArtistTemplateQuery;
  pageContext: SitePageContext;
}

function ArtistTemplate({ data, pageContext }: Props) {
  const { previous, next } = pageContext;
  return (
    <Layout title={data.artist?.name} disableGutters jumbotron={<ArtistPageHeader artist={data.artist} />}>
      <div>
        <Tabs indicatorColor="secondary" centered value={0}>
          <Tab label="曲" />
          <Tab label="詳細" />
        </Tabs>
        <div>
          {data.artist?.tunes?.map((tune) => (
            <p key={tune?.id}>{tune?.title}</p>
          ))}
        </div>
      </div>
      <div>
        <p>
          <AppLink to={`/artist/${previous?.name}`}>{previous?.name}</AppLink>
        </p>
        <p>
          <AppLink to={`/artist/${next?.name}`}>{next?.name}</AppLink>
        </p>
      </div>
    </Layout>
  );
  /*
  const allArtists = useAllArtists();
  const artists = React.useMemo(() => sortArtists(allArtists), [allArtists]);
  const { previous, next, index, fieldValue } = pageContext;
  const programs = data.allProgram.group.map(({ edges }) => edges[0]);
  const [loading, setLoading] = React.useState(false);
  const [tab, setTab] = React.useState(index);
  const _onChangeIndex = (i: number) => {
    setTab(i);
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (tab !== index) {
        setLoading(true);
        navigate(`/artist/${artists[tab].fieldValue}`);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [tab, artists, index]);

  function slideRenderer({ index, key }: SlideRenderProps) {
    const item = artists[index];
    return (
      <div key={key}>
        <Jumbotron title={item.fieldValue} subtitle={`登場回: ${item.edges.length} 曲数: ${item.tunes.length}`} imgUrl={item.img} />
        <Container maxWidth="md">
          <Box pt={4}>
            {item.fieldValue === fieldValue ? (
              <div>
                <LazyViewer programs={programs.map(({ node }) => node)} filter={(tune) => tune.artist === fieldValue} />
                <ContentBasis>
                  <PageNavigation {...createNavigationProps(previous, next, '/artist')} />
                </ContentBasis>
                {item.fieldValue !== 'スピッツ' ? (
                  <ContentBasis>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {item.fieldValue}と同じ回で登場したアーティスト
                    </Typography>
                    <RelatedArtists edges={programs} />
                  </ContentBasis>
                ) : null}
                <ContentBasis>
                  <NavigationBox />
                </ContentBasis>
              </div>
            ) : (
              <div>
                <Box py={2}>
                  <Typography variant="subtitle2">
                    <Skeleton variant="text" width={100} />
                  </Typography>
                  <Typography variant="h6">
                    <Skeleton variant="text" />
                  </Typography>
                  <TuneCardSkeleton />
                </Box>
              </div>
            )}
          </Box>
        </Container>
      </div>
    );
  }

  return (
    <Layout
      title={fieldValue}
      disableGutters
      disablePaddingTop
      loading={loading}
      maxWidth={false}
      componentViewports={{ BottomNav: false }}
      drawerContents={<DrawerNavigation {...createNavigationProps(previous, next, '/artist')} />}
    >
      <VirtualizedSwipeableViews
        index={tab}
        onChangeIndex={_onChangeIndex}
        slideRenderer={slideRenderer}
        slideCount={artists.length}
        resistance
      />
    </Layout>
  );
  */
}

export default ArtistTemplate;

export const query = graphql`
  query ArtistTemplate($name: String!) {
    artist(name: { eq: $name }) {
      tunesCount
      programCount
      image
      kana
      name
      nation
      program {
        date
        week
        title
        subtitle
      }
      tunes {
        corner
        id
        indexInWeek
        artist {
          name
        }
        kana
        label
        nation
        selector
        title
        week
        year
        youtube
      }
    }
  }
`;
