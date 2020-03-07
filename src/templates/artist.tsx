import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SwipeableViews, { OnSwitchingCallback } from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
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
  const _onSwiped: OnSwitchingCallback = (index: number, type) => {
    if (type !== 'end') return;

    if (previous && index === 0) {
      navigate(`/artist/${previous[0]}/`);
    } else if (index === 2 || (!previous && index === 1)) {
      navigate(`/artist/${next[0]}/`);
    }
  };
  const SwipePages = React.useMemo(() => {
    return [previous, [artist, artistPrograms], next]
      .filter(obj => obj !== null)
      .map((tabArtist, index) =>
        tabArtist[0] === artist ? (
          <Container key={index} disableGutters>
            <Box>
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
            </Box>
          </Container>
        ) : (
          <SkeletonPage key={index} />
        )
      );
  }, [previous, artistPrograms, next]);

  return (
    <Layout title={pageContext.artist} maxWidth="md">
      <BindKeyboardSwipeableViews
        index={!previous ? 0 : 1}
        onChangeIndex={() => {}}
        onSwitching={_onSwiped}
        resistance
        enableMouseEvents
      >
        {SwipePages}
      </BindKeyboardSwipeableViews>
      {/*<Box>
        {data.allProgram.edges.map(({ node }, index) => (
          <TunesByProgram
            key={index}
            program={node}
            filter={tune => tune.artist === pageContext.artist}
          />
        ))}
        <PageNavigation
          prev={
            previous
              ? {
                  to: `/artist/${previous[0]}/`,
                  label: previous[0]
                }
              : null
          }
          next={
            next
              ? {
                  to: `/artist/${next[0]}/`,
                  label: next[0]
                }
              : null
          }
        />
        </Box>*/}
    </Layout>
  );
}

export default ArtistTemplate;

function SkeletonPage() {
  return (
    <Container disableGutters>
      <Box>
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
