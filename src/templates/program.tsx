import * as React from 'react';
import { graphql, navigate } from 'gatsby';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, createStyles } from '@material-ui/core/styles';
//import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
//import SwipeableViews from 'react-swipeable-views';
// import { bindKeyboard, virtualize, SlideRenderProps } from 'react-swipeable-views-utils';
// import List from '@material-ui/core/List';
// import ListSubheader from '@material-ui/core/ListSubheader';
import Layout from '../layout/Template';
// import ListItemLink from 'gatsby-theme-aoi/src/components/ListItemLink';
import Section, { SectionDivider } from '../components/Section';
import { ProgramPageHeader } from '../components/PageHeader';
import Tune from '../components/Tune';
import ArtistItemContainer from '../components/ArtistItemContainer';
// import Jumbotron from '../components/Jumbotron';
// import DrawerNavigation from '../components/DrawerNavigation';
// import TuneCard, { TuneCardSkeleton } from '../components/TuneCard';
import PageNavigation from '../components/PageNavigation';
// import NavigationBox from '../components/NavigationBox';
// import ContentBasis from '../components/ContentBasis';
// import ResponsiveContainer from '../components/ResponsiveContainer';
// import { useAllPrograms, useCategories } from '../utils/graphql-hooks';
// import createDescriptionString from '../utils/createDescriptionString';
// import getAroundPrograms from '../utils/getAroundPrograms';
// import { QueriedProgram } from '../types';
import { ProgramTemplateQuery, SitePageContext } from '../../graphql-types';

// const VirtualizedSwipeableViews = bindKeyboard(virtualize(SwipeableViews));
/*
const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      background: theme.palette.background.paper,
    },
  })
);
*/
interface Props {
  data: ProgramTemplateQuery;
  pageContext: SitePageContext;
}

function ProgramTemplate({ data, pageContext }: Props) {
  // const classes = useStyles();
  return (
    <Layout title={data.program?.title} disableGutters jumbotron={<ProgramPageHeader program={data.program} />}>
      <Section>
        <Tabs indicatorColor="secondary" centered value={0}>
          <Tab label="曲" />
          <Tab label="詳細" />
        </Tabs>
        <div>
          {data.program?.playlist?.map((tune) => (
            <Tune key={tune?.id} tune={tune} />
          ))}
        </div>
      </Section>
      <SectionDivider />
      <Section>
        <ArtistItemContainer title="登場アーティスト" artists={data.program?.playlist?.map((tune) => tune?.artist)} />
      </Section>
      <SectionDivider />
      <Section>
        <PageNavigation variant="program" pageContext={pageContext} />
      </Section>
    </Layout>
  );
  /*
  const { program } = data;
  const { previous, next, index, slug } = pageContext;
  const allPrograms = useAllPrograms();
  const categories = useCategories((program?.categories as string[]) ?? []);
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
        navigate(allPrograms[tab]?.fields?.slug ?? '#');
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [tab, index, allPrograms]);

  function slideRenderer({ index, key }: SlideRenderProps) {
    const item = allPrograms[index];
    return (
      <div key={key}>
        <Jumbotron
          title={item.title ?? 'Artist'}
          header={`第${item.week}回 ${item.date} 全${item.playlist?.length ?? 0}曲`}
          subtitle={item.subtitle ?? undefined}
          artists={Array.from(new Set(item.playlist?.map((d) => d?.artist ?? '')))}
          imgUrl={item.fields?.image ?? undefined}
        />
        <ResponsiveContainer maxWidth="md">
          <Box pt={4}>
            {item.fields?.slug === slug ? (
              <div>
                {program?.playlist?.map((tune, index) => (tune ? <TuneCard key={tune.id ?? index} tune={tune} /> : null))}
                <ContentBasis>
                  <PageNavigation {...createNavigationProps(previous, next)} />
                </ContentBasis>
                <ContentBasis>
                  {categories.map((category, index) => (
                    <List key={index} subheader={<ListSubheader>{category.fieldValue}</ListSubheader>}>
                      {getAroundPrograms(category.edges, program?.id ?? 'dummy').map((v) => (
                        <ListItemLink
                          key={v.node.id}
                          selected={v.node.id === program?.id}
                          to={v.node.fields?.slug ?? '#'}
                          primaryText={v.node.title ?? 'Program'}
                          secondaryText={`第${v.node.week}回 ${v.node.date}`}
                          divider
                          dense
                        />
                      ))}
                    </List>
                  ))}
                </ContentBasis>
                <ContentBasis>
                  <NavigationBox />
                </ContentBasis>
              </div>
            ) : (
              <div>
                <TuneCardSkeleton />
                <TuneCardSkeleton />
                <TuneCardSkeleton />
              </div>
            )}
          </Box>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <Layout
      title={program?.title ?? '放送回'}
      description={description}
      disableGutters
      disablePaddingTop
      maxWidth={false}
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
  */
}

export default ProgramTemplate;
/*
function createNavigationProps(previous: QueriedProgram, next: QueriedProgram) {
  return {
    previous: previous ? { to: previous.fields?.slug ?? '#', title: previous.title } : null,

    next: next ? { to: next.fields?.slug ?? '#', title: next.title } : null,
  };
}
*/
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
      fields {
        image
      }
      playlist {
        artist {
          name
          image
          programCount
          tunesCount
        }
        corner
        id
        index
        indexInWeek
        label
        kana
        nation
        selector
        title
        year
        week
        youtube
      }
    }
  }
`;
