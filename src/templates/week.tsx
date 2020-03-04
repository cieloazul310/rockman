import * as React from 'react';
import Helmet from 'react-helmet';
import { graphql, navigate } from 'gatsby';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import JunkList from '../components/JunkList';
import WeekSummaryBox from '../components/WeekSummaryBox';
import { TuneCardSkeleton } from '../components/TuneCard';
import PageNavigation, {
  PageNavigationSkeleton,
} from '../components/PageNavigation';
import Weeks from '../components/Weeks';
import createDescriptionString from '../utils/createDescriptionString';
import {
  WeekTemplateQuery,
  SitePageContextNext,
  SitePageContextPrevious,
  Yaml
} from '../../graphql-types';

function SkeletonPage({ program }: { program: SitePageContextPrevious | SitePageContextNext | Partial<Yaml>}) {
  return (
    <Container maxWidth="md">
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
  data: WeekTemplateQuery;
  pageContext: {
    slug: string;
    previous: SitePageContextPrevious;
    next: SitePageContextNext;
  };
}

function WeekTemplate({ data, pageContext }: Props) {
  const program = data.yaml;
  const { previous, next } = pageContext;
  const description = createDescriptionString(program);
  const _onSwiped = (index: number, indexLatest: number) => {
    if (previous && index < indexLatest) {
      navigate(previous.fields.slug);
    } else if (next && index > indexLatest) {
      navigate(next.fields.slug);
    }
  };
  
  const SwipePages = React.useMemo(() => {
    return [previous, program, next]
      .filter(obj => obj !== null)
      .map((yaml, index) =>
        yaml.id === program.id ? (
          <Container key={index} maxWidth="md">
            <Box>
              <JunkList program={yaml} />
              <PageNavigation prev={previous} next={next} />
            </Box>
          </Container>
        ) : (
          <SkeletonPage key={index} program={yaml} />
        )
      );
  }, [previous, program, next]);
  
  return (
    <Layout
      title={program.title}
      description={description}
      drawerContents={<Weeks />}
      disablePaddingTop
    >
      <Helmet>
        {previous ? <link rel="prefetch" href={previous.fields.slug} /> : null}
        {next ? <link rel="prefetch" href={next.fields.slug} /> : null}
      </Helmet>
      <SwipeableViews
        index={!previous ? 0 : 1}
        onChangeIndex={_onSwiped}
        resistance
        enableMouseEvents
      >
        {SwipePages}
      </SwipeableViews>
    </Layout>
  );
}

export default WeekTemplate;

export const query = graphql`
  query WeekTemplate($slug: String!) {
    yaml(fields: { slug: { eq: $slug } }) {
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
