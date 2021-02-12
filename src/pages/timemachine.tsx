import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout/TabLayout';
import TabPane from '../layout/TabPane';
import Jumbotron from '../components/Jumbotron';
import Section, { SectionDivider } from '../components/Section';
import { TuneByProgram } from '../components/TunesByProgram';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import useSorter from '../utils/useSorter';
import { getDividedYears, getFiveYearString } from '../utils/cluster';
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
  const [tab, setTab] = React.useState(0);
  const classes = useStyles();
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
      tabs={
        <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          {[...items]
            .sort((a, b) => b.value - a.value)
            .map((fifth) => (
              <Tab
                key={fifth.value}
                label={`${getFiveYearString(fifth.value)} ${fifth.items.reduce((accum, curr) => accum + curr.items.length, 0)}`}
              />
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
