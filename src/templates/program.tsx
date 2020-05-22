import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize, SlideRenderProps } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layout';
import Jumbotron from '../components/Jumbotron';
import DrawerNavigation from '../components/DrawerNavigation';
import TuneCard, { TuneCardSkeleton } from '../components/TuneCard';
import PageNavigation from '../components/PageNavigation';
import { useAllPrograms } from '../utils/graphql-hooks';
import createDescriptionString from '../utils/createDescriptionString';
import { QueriedProgram } from '../types';
import { ProgramTemplateQuery } from '../../graphql-types';

const VirtualizedSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

interface Props {
  data: ProgramTemplateQuery;
  pageContext: {
    slug: string;
    previous: QueriedProgram;
    next: QueriedProgram;
    index: number;
  };
}

function ProgramTemplate({ data, pageContext }: Props) {
  const { program } = data;
  const { previous, next, index, slug } = pageContext;
  const allPrograms = useAllPrograms();
  const description = createDescriptionString(program);
  const [loading, setLoading] = React.useState(false);
  const [tab, setTab] = React.useState(index);
  const _onChangeIndex = (i: number) => {
    setTab(i);
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (tab !== index) {
        setLoading(true);
        navigate(allPrograms[tab].fields.slug);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [tab]);

  function slideRenderer({ index, key }: SlideRenderProps) {
    const item = allPrograms[index];
    return (
      <div key={key}>
        <Jumbotron
          title={item.title}
          header={`第${item.week}回 ${item.date} 全${item.playlist.length}曲`}
          subtitle={item.subtitle || null}
          imgUrl={item.img || null}
        />
        <Container maxWidth="md">
          <Box pt={4}>
            {item.fields.slug === slug ? (
              <div>
                {program.playlist.map((tune) => (
                  <TuneCard key={tune.id} tune={tune} />
                ))}
                <PageNavigation {...createNavigationProps(previous, next)} />
              </div>
            ) : (
              <div>
                <TuneCardSkeleton />
                <TuneCardSkeleton />
                <TuneCardSkeleton />
              </div>
            )}
          </Box>
        </Container>
      </div>
    );
  }

  return (
    <Layout
      title={program.title}
      description={description}
      disableGutters
      disablePaddingTop
      loading={loading}
      componentViewports={{ BottomNav: false }}
      drawerContents={<DrawerNavigation {...createNavigationProps(previous, next)} />}
    >
      <VirtualizedSwipeableViews
        index={tab}
        onChangeIndex={_onChangeIndex}
        slideRenderer={slideRenderer}
        slideCount={allPrograms.length}
        resistance
      />
    </Layout>
  );
}

export default ProgramTemplate;

function createNavigationProps(previous: QueriedProgram, next: QueriedProgram) {
  return {
    previous: previous ? { to: previous.fields.slug, title: previous.title } : null,

    next: next ? { to: next.fields.slug, title: next.title } : null,
  };
}

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
