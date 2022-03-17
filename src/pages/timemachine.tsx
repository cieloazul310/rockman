import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { Jumbotron, Section, SectionDivider, Article, Paragraph, H3, TabPane } from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../layout/TabLayout';
import Tab from '../components/MuiTab';
import { ProgramByTune } from '../components/TunesByProgram';
import { AdBasic } from '../components/Ads';
import useSorter from '../utils/useSorter';
import { getDividedYears, getFiveYearString, getClusteredLength } from '../utils/cluster';
import { useParseHash, useHash } from '../utils/useHash';
import { ProgramBrowser, TuneFields } from '../../types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

type TimeMachinePageQueryData = {
  allTunes: {
    totalCount: number;
    tunes: (TuneFields & {
      program: Pick<ProgramBrowser, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'>;
    })[];
  };
};

function TimeMachinePage({ data }: PageProps<TimeMachinePageQueryData>) {
  const { allTunes } = data;
  const items = getDividedYears(allTunes.tunes, 5, (tune) => tune.year).sort((a, b) => b.value - a.value);

  const titles = React.useMemo(() => ['', ...items.map(({ value }) => value.toString())], [items]);
  const initialTab = useParseHash(titles);
  const [tab, setTab] = React.useState(initialTab);
  const sorter = useSorter();
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const onItemClicked = (index: number) => () => {
    setTab(index);
  };
  useHash(tab, titles);
  React.useEffect(() => {
    if (typeof window === 'object') {
      window.scrollTo(0, 0);
    }
  }, [tab]);

  return (
    <Layout
      title="ちょっぴりタイムマシン"
      tabs={
        <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          <Tab label="概要" />
          {items
            .sort((a, b) => b.value - a.value)
            .map((fifth) => (
              <Tab key={fifth.value} label={getFiveYearString(fifth.value)} />
            ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance animateHeight={typeof window === 'object'}>
        <TabPane currentTab={tab} index={0} renderNeighbor>
          <Jumbotron disableGradient maxWidth="md">
            <Typography variant="h5" component="h2" gutterBottom>
              ちょっぴりタイムマシン
            </Typography>
          </Jumbotron>
          <SectionDivider />
          <Section>
            <Article maxWidth="md">
              <Paragraph>
                ちょっぴりタイムマシンは、放送の最後にオンエアされる「最近ラジオでかかってない少し前の日本の楽曲を掘り起こそう」というコーナーです。ちょっぴりタイムマシンで放送された楽曲を年代別に分類したページです。
              </Paragraph>
              <List>
                {items.map((fifth, index) => (
                  <ListItem key={fifth.value.toString()} button onClick={onItemClicked(index + 1)}>
                    <ListItemText primary={getFiveYearString(fifth.value)} />
                    <Typography variant="button" component="span">
                      {getClusteredLength(fifth)}曲
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Article>
          </Section>
        </TabPane>
        {items.map((fifth, index) => (
          <TabPane key={fifth.value.toString()} currentTab={tab} index={index + 1} renderNeighbor>
            <Jumbotron title={getFiveYearString(fifth.value)} disableGradient maxWidth="md">
              <Typography variant="h5" component="h2" gutterBottom>
                {getFiveYearString(fifth.value)}
              </Typography>
              <Typography>全{getClusteredLength(fifth)}曲</Typography>
            </Jumbotron>
            <SectionDivider />
            {[...fifth.items]
              .sort((a, b) => sorter(a.value - b.value))
              .map((annu) => (
                <div key={annu.value}>
                  <Section>
                    <Container maxWidth="md" disableGutters>
                      <H3>{annu.value}年</H3>
                      <Typography>{annu.items.length}曲</Typography>
                    </Container>
                  </Section>
                  {annu.items.map((tune) => (
                    <ProgramByTune key={tune.id} tune={tune} />
                  ))}
                </div>
              ))}
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <AdBasic />
      <SectionDivider />
    </Layout>
  );
}

export default TimeMachinePage;

export const query = graphql`
  query {
    allTunes(corner: { eq: "ちょっぴりタイムマシン" }) {
      totalCount
      tunes {
        ...tuneFields
        program {
          id
          title
          subtitle
          week
          slug
          date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;
