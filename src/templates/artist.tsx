import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard, SlideRenderProps } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layout';
import Jumbotron from '../components/Jumbotron';
import LazyViewer from '../components/LazyViewer';
import { TuneCardSkeleton } from '../components/TuneCard';
import DrawerNavigation from '../components/DrawerNavigation';
import PageNavigation, { createNavigationProps } from '../components/PageNavigation';
import ContentBasis from '../components/ContentBasis';
import NavigationBox from '../components/NavigationBox';
import sortArtists from '../utils/sortByYomi';
import { useAllArtists } from '../utils/graphql-hooks/';
import { ArtistTemplateQuery, Program, ProgramPlaylist } from '../../graphql-types';

const VirtualizedSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

interface Artist {
  fieldValue: string;
  edges: Program[];
  tunes: ProgramPlaylist[];
  img?: string;
}

interface Props {
  data: ArtistTemplateQuery;
  pageContext: {
    fieldValue: string;
    previous?: Artist;
    next?: Artist;
    current: Artist;
    index: number;
  };
}

function ArtistTemplate({ data, pageContext }: Props) {
  const allArtists = useAllArtists();
  const artists = React.useMemo(() => sortArtists(allArtists), [allArtists]);
  const { previous, next, index, fieldValue } = pageContext;
  const programs = data.allProgram.edges;
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
}

export default ArtistTemplate;

export const query = graphql`
  query ArtistTemplate($fieldValue: String!) {
    allProgram(filter: { playlist: { elemMatch: { artist: { glob: $fieldValue } } } }, sort: { fields: week, order: ASC }) {
      edges {
        node {
          id
          title
          date(formatString: "YYYY-MM-DD")
          categories
          fields {
            slug
          }
          guests
          subtitle
          week
          year
          playlist {
            artist
            corner
            id
            indexInWeek
            index
            kana
            label
            name
            nation
            producer
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
`;
