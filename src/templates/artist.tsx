import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layout';
import Jumbotron from '../components/Jumbotron';
import LazyViewer from '../components/LazyViewer';
import { TuneCardSkeleton } from '../components/TuneCard';
import DrawerNavigation from '../components/DrawerNavigation';
import PageNavigation, { createNavigationProps } from '../components/PageNavigation';
import {
  ArtistTemplateQuery,
  Program,
  ProgramPlaylist
} from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

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
  const { previous, next, current, fieldValue } = pageContext;
  const programs = data.allProgram.edges;
  const items = [previous, current, next].filter(obj => obj !== null);
  const initialTab = previous !== null ? 1 : 0;
  const [tab, setTab] = React.useState(initialTab);
  const _onChangeIndex = (index: number) => {
    setTab(index);
  };
  const _onTransitionEnd = () => {
    if (tab === initialTab) return;
    navigate(
      `/artist/${tab > initialTab ? next.fieldValue : previous.fieldValue}`
    );
  };

  const SwipePages = React.useMemo(() => {
    return items.map((item, index) => (
      <div key={index}>
        <Jumbotron
          title={item.fieldValue}
          subtitle={`登場回: ${item.edges.length} 曲数: ${item.tunes.length}`}
          imgUrl={item.img}
        />
        <Container maxWidth="md">
          <Box pt={4}>
            {item.fieldValue === fieldValue ? (
              <div>
                <LazyViewer
                  programs={programs.map(({ node }) => node)}
                  filter={tune => tune.artist === fieldValue}
                />
                <PageNavigation
                  {...createNavigationProps(previous, next, '/artist')}
                />
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
                  <TuneCardSkeleton />
                  <TuneCardSkeleton />
                  <TuneCardSkeleton />
                </Box>
              </div>
            )}
          </Box>
        </Container>
      </div>
    ));
  }, [previous, programs, next]);

  return (
    <Layout
      title={fieldValue}
      disableGutters
      disablePaddingTop
      componentViewports={{ BottomNav: false }}
      drawerContents={<DrawerNavigation {...createNavigationProps(previous, next, '/artist')} />}
    >
      <BindKeyboardSwipeableViews
        index={tab}
        onChangeIndex={_onChangeIndex}
        onTransitionEnd={_onTransitionEnd}
        resistance
        enableMouseEvents
      >
        {SwipePages}
      </BindKeyboardSwipeableViews>
    </Layout>
  );
}

export default ArtistTemplate;

export const query = graphql`
  query ArtistTemplate($fieldValue: String!) {
    allProgram(
      filter: { playlist: { elemMatch: { artist: { glob: $fieldValue } } } }
      sort: { fields: week, order: ASC }
    ) {
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
