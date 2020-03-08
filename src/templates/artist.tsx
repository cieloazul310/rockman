import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import SwipeableViews, { OnSwitchingCallback } from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import TabPane from 'gatsby-theme-typescript-material-ui/src/layout/TabPane';
import NationAvatar from '../components/NationAvatar';
import TunesByProgram from '../components/TunesByProgram';
import { TuneCardSkeleton } from '../components/TuneCard';
import PageNavigation, {
  PageNavigationSkeleton,
} from '../components/PageNavigation';
import { ArtistTemplateQuery, Program } from '../../graphql-types';

interface Props {
  data: ArtistTemplateQuery;
  pageContext: {
    artist: string;
    previous: [string, string, string, Program[]];
    next: [string, string, string, Program[]];
  };
}
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function ArtistTemplate({ data, pageContext }: Props) {
  const { previous, next, artist } = pageContext;
  const artistPrograms = data.allProgram.edges.map(({ node }) => node);
  const items = [previous, [artist, artistPrograms], next].filter(
    obj => obj !== null
  );
  const artistIndex = items.map(item => item[0]).indexOf(artist);
  const _onSwiped: OnSwitchingCallback = (index: number, type) => {
    if (type !== 'end') return;

    if (previous && index === 0) {
      navigate(`/artist/${previous[0]}/`);
    } else if (index === 2 || (!previous && index === 1)) {
      navigate(`/artist/${next[0]}/`);
    }
  };
  const SwipePages = React.useMemo(() => {
    return items.map((tabArtist, index) =>
      tabArtist[0] === artist ? (
        <TabPane key={index} index={index} value={artistIndex} maxWidth="md">
          <Typography variant="h5" component="h2">
            {artist}
          </Typography>
          <Typography variant="subtitle1">
            登場回数: {artistPrograms.length}
          </Typography>
          {artistPrograms.map((program, index) => (
            <TunesByProgram
              key={index}
              program={program}
              filter={tune => tune.artist === pageContext.artist}
            />
          ))}
          <PageNavigation
            prev={
              previous
                ? {
                    to: `/artist/${previous[0]}/`,
                    label: previous[0],
                  }
                : null
            }
            next={
              next
                ? {
                    to: `/artist/${next[0]}/`,
                    label: next[0],
                  }
                : null
            }
          />
        </TabPane>
      ) : (
        <SkeletonPage key={index} title={tabArtist[0]} />
      )
    );
  }, [previous, artistPrograms, next]);

  return (
    <Layout title={pageContext.artist} maxWidth="xl" disableGutters>
      <BindKeyboardSwipeableViews
        index={!previous ? 0 : 1}
        onChangeIndex={() => {}}
        onSwitching={_onSwiped}
        resistance
        enableMouseEvents
      >
        {SwipePages}
      </BindKeyboardSwipeableViews>
    </Layout>
  );
}

export default ArtistTemplate;

function SkeletonPage({ title }: { title: string }) {
  return (
    <Container maxWidth="md">
      <Box py={2}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle2">
          <Skeleton variant="text" width={100} />
        </Typography>
        <Typography variant="subtitle2">
          <Skeleton variant="text" width={120} />
        </Typography>
        <Typography variant="h6">
          <Skeleton variant="text" />
        </Typography>
        <TuneCardSkeleton />
        <TuneCardSkeleton />
        <TuneCardSkeleton />
        <TuneCardSkeleton />
        <PageNavigationSkeleton />
      </Box>
    </Container>
  );
}

export const query = graphql`
  query ArtistTemplate($artist: String!) {
    allProgram(
      filter: { playlist: { elemMatch: { artist: { glob: $artist } } } }
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
