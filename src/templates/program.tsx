import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layout';
import Jumbotron from '../components/Jumbotron';
import DrawerNavigation from '../components/DrawerNavigation';
import TuneCard, { TuneCardSkeleton } from '../components/TuneCard';
import PageNavigation from '../components/PageNavigation';
import { getPlaylistStrings } from '../utils/filterPlaylist';
import createDescriptionString from '../utils/createDescriptionString';
import { QueriedProgram } from '../types';
import { ProgramTemplateQuery } from '../../graphql-types';

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
  const initialTab = previous !== null ? 1 : 0;
  const [tab, setTab] = React.useState(initialTab);
  const _onChangeIndex = (index: number) => {
    console.log(initialTab, index);
    setTab(index);
  };
  const _onTransitionEnd = () => {
    if (tab === initialTab) return;
    navigate(tab < initialTab ? previous.fields.slug : next.fields.slug);
  };

  const SwipePages = React.useMemo(() => {
    return [previous, program, next]
      .filter(obj => obj !== null)
      .map((tabProgram, index) => {
        const [firstImg] = tabProgram.playlist
          .filter((tune, i) => i !== 0)
          .map(tune => tune.youtube)
          .filter(tune => tune !== '');
        return (
          <div key={index}>
            <Jumbotron
              title={tabProgram.title}
              header={`第${tabProgram.week}回 ${tabProgram.date} 全${tabProgram.playlist.length}曲`}
              subtitle={program.subtitle}
              imgUrl={
                firstImg ? `https://i.ytimg.com/vi/${firstImg}/0.jpg` : null
              }
            />
            <Container maxWidth="md">
              <Box pt={4}>
                {tabProgram.id === program.id ? (
                  <div>
                    {tabProgram.playlist.map((tune, i) => (
                      <TuneCard key={tune.id} tune={tune} />
                    ))}
                    <PageNavigation
                      previous={
                        previous
                          ? { to: previous.fields.slug, title: previous.title }
                          : null
                      }
                      next={
                        next
                          ? { to: next.fields.slug, title: next.title }
                          : null
                      }
                    />
                  </div>
                ) : (
                  <div>
                    {tabProgram.playlist.map((_, i) => (
                      <TuneCardSkeleton key={i} />
                    ))}
                  </div>
                )}
              </Box>
            </Container>
          </div>
        );
      });
  }, [previous, program, next]);

  const jumbotron = (
    <Jumbotron
      title={program.title}
      artists={getPlaylistStrings(program.playlist.slice(1), 'artist').join(
        '  '
      )}
    />
  );

  return (
    <Layout
      title={program.title}
      description={description}
      disableGutters
      disablePaddingTop
      componentViewports={{ BottomNav: false }}
      drawerContents={
        <DrawerNavigation
          previous={
            previous
              ? { to: previous.fields.slug, title: previous.title }
              : null
          }
          next={next ? { to: next.fields.slug, title: next.title } : null}
        />
      }
    >
      <BindKeyboardSwipeableViews
        index={tab}
        onChangeIndex={_onChangeIndex}
        onTransitionEnd={_onTransitionEnd}
        resistance
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
