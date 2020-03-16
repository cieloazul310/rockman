import * as React from 'react';
import Helmet from 'react-helmet';
import { graphql, navigate, withPrefix } from 'gatsby';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SwipeableViews, { OnSwitchingCallback } from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layouts/JumbotronLayout';
import TabPane from 'gatsby-theme-aoi/src/layout/TabPane';
import Jumbotron from '../components/Jumbotron';
import JunkList from '../components/JunkList';
import DrawerNavigation from '../components/DrawerNavigation';
import WeekSummaryBox from '../components/ProgramSummary';
import { TuneCardSkeleton } from '../components/TuneCard';
import PageNavigation, {
  PageNavigationSkeleton
} from '../components/PageNavigation';
import createDescriptionString from '../utils/createDescriptionString';
import { QueriedProgram } from '../types';
import { ProgramTemplateQuery } from '../../graphql-types';

function SkeletonPage({ program }: { program: QueriedProgram }) {
  return (
    <Container maxWidth="md">
      <Box py={2}>
        <WeekSummaryBox program={program} />
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
          <TabPane key={index} maxWidth="md" index={index} value={index}>
            <JunkList program={tabProgram} />
            <PageNavigation
              prev={
                previous
                  ? { to: previous.fields.slug, label: previous.title }
                  : null
              }
              next={next ? { to: next.fields.slug, label: next.title } : null}
            />
          </TabPane>
        ) : (
          <SkeletonPage key={index} program={tabProgram} />
        )
      );
  }, [previous, program, next]);
  const [firstImg] = program.playlist
    .filter((tune, i) => i !== 0)
    .map(tune => tune.youtube)
    .filter(tune => tune !== '');
  
  const jumbotron = (
    <Jumbotron
      title={program.title}
      header={`第${program.week}回 ${program.date} 全${program.playlist.length}曲`}
      subtitle={program.subtitle}
      imgUrl={firstImg ? `https://i.ytimg.com/vi/${firstImg}/0.jpg` : null}
    />
  );

  return (
    <Layout
      title={program.title}
      description={description}
      componentViewports={{ BottomNav: false }}
      jumbotron={jumbotron}
      drawerContents={<DrawerNavigation previous={previous} next={next} />}
    >
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
