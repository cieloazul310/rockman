import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout/TabLayout';
import TabPane from '../layout/TabPane';
import Tab from '../components/MuiTab';
import Jumbotron from '../components/Jumbotron';
import Section, { SectionDivider } from '../components/Section';
import { TuneByProgram } from '../components/TunesByProgram';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import Article, { Paragraph } from '../components/Article';
import useSorter from '../utils/useSorter';
import { getDividedYears, getFiveYearString, getClusteredLength } from '../utils/cluster';
import { useParseHash, useHash } from '../utils/useHash';
import { TimeMachineQuery } from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const useStyles = makeStyles((theme) =>
  createStyles({
    year: {
      padding: theme.spacing(2, 0),
    },
    yearHeader: {
      padding: theme.spacing(0, 1),
    },
  })
);

function TimeMachinePage({ data }: PageProps<TimeMachineQuery>) {
  const items = getDividedYears(data.allTunes ?? [], 5, (tune) => tune?.year ?? 0).sort((a, b) => b.value - a.value);
  const titles = React.useMemo(() => ['', ...items.map(({ value }) => value.toString())], [items]);
  const initialTab = useParseHash(titles);
  const [tab, setTab] = React.useState(initialTab);
  const classes = useStyles();
  const sorter = useSorter();
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
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
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance animateHeight>
        <TabPane value={tab} index={0} disableGutters>
          <Jumbotron title="ちょっぴりタイムマシン" />
          <SectionDivider />
          <Section>
            <Article>
              <Paragraph>
                ちょっぴりタイムマシンは、放送の最後にオンエアされる「最近ラジオでかかってない少し前の日本の楽曲を掘り起こそう」というコーナーです。ちょっぴりタイムマシンで放送された楽曲を年代別に分類したページです。
              </Paragraph>
              <List>
                {items.map((fifth, index) => (
                  <ListItem key={index} button onClick={onItemClicked(index + 1)}>
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
          <TabPane key={index} value={tab} index={index + 1} disableGutters>
            <Jumbotron title={getFiveYearString(fifth.value)} footer={`全${getClusteredLength(fifth)}曲`} />
            <SectionDivider />
            <Section>
              {[...fifth.items]
                .sort((a, b) => sorter(a.value - b.value))
                .map((annu) => (
                  <div key={annu.value} className={classes.year}>
                    <div className={classes.yearHeader}>
                      <Typography variant="h6">{annu.value}</Typography>
                    </div>
                    <div>
                      {annu.items.map((tune) => (
                        <TuneByProgram key={tune?.id} tune={tune} />
                      ))}
                    </div>
                  </div>
                ))}
            </Section>
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <AdInArticle />
      <SectionDivider />
      <Section>
        <NavigationBox />
      </Section>
    </Layout>
  );
}

export default TimeMachinePage;

export const query = graphql`
  query TimeMachine {
    allTunes(corner: { eq: "ちょっぴりタイムマシン" }) {
      year
      title
      week
      youtube
      selector
      nation
      indexInWeek
      id
      corner
      artist {
        name
      }
      program {
        week
        title
        date(formatString: "YYYY-MM-DD")
        fields {
          slug
        }
      }
    }
  }
`;
