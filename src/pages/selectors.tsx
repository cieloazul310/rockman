import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { Section, SectionDivider, Jumbotron, Article, Paragraph, TabPane } from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../layout/TabLayout';
import Tab from '../components/MuiTab';
import LazyViewer from '../components/LazyViewer';
import { AdBasic } from '../components/Ads';
import { useParseHash, useHash } from '../utils/useHash';
import { Selector, ProgramBrowser, TuneFields } from '../../types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

type WindowState = {
  selector?: string;
};

type SelectorsPageQueryData = {
  allSelectors: (Omit<Selector, 'programs'> & {
    programs: (Pick<ProgramBrowser, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'> & {
      playlist: TuneFields[];
    })[];
  })[];
};

function SelectorsPage({ data }: PageProps<SelectorsPageQueryData, unknown, WindowState>) {
  const { allSelectors } = data;
  const titles = React.useMemo(() => ['', ...allSelectors.map(({ name }) => name)], [allSelectors]);
  const initialTab = useParseHash<WindowState>(titles, (state) => state?.selector ?? undefined);
  const [tab, setTab] = React.useState(initialTab);
  const [updater, setUpdateHeight] = React.useState<null | (() => void)>(null);
  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  const onItemClicked = (index: number) => () => {
    setTab(index);
  };
  const onSeem = React.useCallback(
    (inView: boolean) => {
      if (inView && updater) {
        updater();
      }
    },
    [updater]
  );
  const actionCallbacks = ({ updateHeight }: { updateHeight: () => void }) => {
    setUpdateHeight(() => updateHeight);
  };

  useHash(tab, titles);
  React.useEffect(() => {
    if (typeof window === 'object') {
      window.scrollTo(0, 0);
    }
  }, [tab]);

  return (
    <Layout
      title="選曲者"
      tabs={
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="概要" />
          {allSelectors.map(({ name, tunesCount }) => (
            <Tab key={name} label={`${name} ${tunesCount}`} />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews
        index={tab}
        onChangeIndex={handleChangeIndex}
        resistance
        animateHeight={typeof window === 'object'}
        action={actionCallbacks}
      >
        <TabPane index={0} currentTab={tab} renderNeighbor>
          <Jumbotron maxWidth="md" disableGradient>
            <Typography variant="h5" component="h2" gutterBottom>
              選曲者
            </Typography>
          </Jumbotron>
          <SectionDivider />
          <Section>
            <Article maxWidth="md">
              <Paragraph>ロック大陸漫遊記に登場したゲストやリクエストによる選曲を分類したページです。</Paragraph>
              <List>
                {allSelectors.map(({ name, programsCount, tunesCount }, index) => (
                  <ListItem key={name} button onClick={onItemClicked(index + 1)}>
                    <ListItemText primary={name} />
                    <Typography variant="button" component="span">
                      {tunesCount}曲/{programsCount}回
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Article>
          </Section>
        </TabPane>
        {allSelectors.map(({ name, programs, programsCount, tunesCount }, index) => (
          <TabPane key={name} currentTab={tab} index={index + 1} renderNeighbor>
            <Jumbotron maxWidth="md" disableGradient>
              <Typography variant="h5" component="h2" gutterBottom>
                {name}の選曲
              </Typography>
              <Typography>
                {tunesCount}曲/{programsCount}回
              </Typography>
            </Jumbotron>
            <SectionDivider />
            <Section>
              <LazyViewer programs={programs} divisor={15} onSeem={onSeem} />
            </Section>
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <AdBasic />
      <SectionDivider />
    </Layout>
  );
}

export default SelectorsPage;

export const query = graphql`
  query {
    allSelectors {
      name
      programs {
        id
        week
        title
        slug
        date(formatString: "YYYY-MM-DD")
        subtitle
        playlist {
          ...tuneFields
        }
      }
      programsCount
      tunesCount
    }
  }
`;
