import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layouts/TabPageLayout';
import TabPane from '../layout/TabPane';
import Jumbotron from '../components/Jumbotron';
import Section, { SectionDivider } from '../components/Section';
import Tune from '../components/Tune';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import useSorter from '../utils/useSorter';
import { getDividedYears, getFiveYearString } from '../utils/cluster';
import { TimeMachineQuery } from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function TimeMachinePage({ data }: PageProps<TimeMachineQuery>) {
  const [tab, setTab] = React.useState(0);
  const items = getDividedYears(data.allTunes ?? [], 5, (tune) => tune?.year ?? 0);
  const sorter = useSorter();
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setTab(newValue);
  };
  React.useEffect(() => {
    if (typeof window === 'object') {
      window.scrollTo(0, 0);
    }
  }, [tab]);

  return (
    <Layout
      title="ちょっぴりタイムマシン"
      tabSticky
      disableGutters
      componentViewports={{ BottomNav: false }}
      tabs={
        <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          {[...items]
            .sort((a, b) => b.value - a.value)
            .map((fifth) => (
              <Tab key={fifth.value} label={getFiveYearString(fifth.value)} />
            ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance animateHeight>
        {[...items]
          .sort((a, b) => b.value - a.value)
          .map((fifth, index) => (
            <TabPane key={index} value={tab} index={index} disableGutters>
              <Jumbotron
                title={getFiveYearString(fifth.value)}
                footer={`全${fifth.items.reduce((accum, curr) => accum + curr.items.length, 0)}曲`}
              />
              <SectionDivider />
              <Section>
                <Typography variant="h6" gutterBottom>
                  {getFiveYearString(fifth.value)}
                </Typography>
                <div>
                  {[...fifth.items]
                    .sort((a, b) => sorter(a.value - b.value))
                    .map((annu) => (
                      <div key={annu.value}>
                        <Typography variant="body1" gutterBottom>
                          {annu.value}
                        </Typography>
                        <div>
                          {annu.items.map((tune) => (
                            <Tune key={tune?.id} tune={tune} />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
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
    allTunes(corner: "ちょっぴりタイムマシン") {
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
    }
  }
`;
