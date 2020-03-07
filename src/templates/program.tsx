import * as React from 'react';
import Helmet from 'react-helmet';
import { graphql, navigate, withPrefix } from 'gatsby';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SwipeableViews, { OnSwitchingCallback } from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../components/TabPageLayout';
import JunkList from '../components/JunkList';
import WeekSummaryBox from '../components/ProgramSummary';
import { TuneCardSkeleton } from '../components/TuneCard';
import PageNavigation, {
  PageNavigationSkeleton,
} from '../components/PageNavigation';
import createDescriptionString from '../utils/createDescriptionString';
import { QueriedProgram } from '../types';
import { ProgramTemplateQuery } from '../../graphql-types';

function SkeletonPage({ program }: { program: QueriedProgram }) {
  return (
    <Container maxWidth="md" disableGutters>
      <Box>
        <WeekSummaryBox program={program} />
        <TuneCardSkeleton />
        <TuneCardSkeleton />
        <TuneCardSkeleton />
        <TuneCardSkeleton />
        <TuneCardSkeleton />
        <TuneCardSkeleton />
        <TuneCardSkeleton />
        <TuneCardSkeleton />
        <PageNavigationSkeleton />
      </Box>
    </Container>
  );
}

interface Props {
  data: ProgramTemplateQuery;
  pageContext: {
    slug: string;
    previous: QueriedProgram;
    next: QueriedProgram;
  };
}
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function ProgramTemplate({ data, pageContext }: Props) {
  const { program } = data;
  const { previous, next } = pageContext;
  const description = createDescriptionString(program);
  const _onSwiped: OnSwitchingCallback = (index: number, type) => {
    if (type !== 'end') return;

    if (previous && index === 0) {
      navigate(previous.fields.slug);
    } else if (index === 2 || (!previous && index === 1)) {
      navigate(next.fields.slug);
    }
  };

  const SwipePages = React.useMemo(() => {
    return [previous, program, next]
      .filter(obj => obj !== null)
      .map((tabProgram, index) =>
        tabProgram.id === program.id ? (
          <Container key={index} maxWidth="md" disableGutters>
            <Box>
              <JunkList program={tabProgram} />
              <PageNavigation
                prev={
                  previous
                    ? { to: previous.fields.slug, label: previous.title }
                    : null
                }
                next={next ? { to: next.fields.slug, label: next.title } : null}
              />
            </Box>
          </Container>
        ) : (
          <SkeletonPage key={index} program={tabProgram} />
        )
      );
  }, [previous, program, next]);

  return (
    <Layout title={program.title} description={description}>
      <Helmet>
        {previous ? (
          <link rel="prefetch" href={withPrefix(previous.fields.slug)} />
        ) : null}
        {next ? (
          <link rel="prefetch" href={withPrefix(next.fields.slug)} />
        ) : null}
      </Helmet>
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

export default ProgramTemplate;

export const query = graphql`
  query ProgramTemplate($slug: String!) {
    program(fields: { slug: { eq: $slug } }) {
      id
      date(formatString: "YYYY-MM-DD")
      subtitle
      title
      week
      year
      guests
      categories
      playlist {
        artist
        corner
        id
        index
        indexInWeek
        label
        kana
        name
        nation
        producer
        selector
        title
        year
        week
        youtube
      }
    }
  }
`;
