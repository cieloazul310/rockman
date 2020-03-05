import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { AllDataQuery } from '../../graphql-types';
import TunesByWeek from '../components/TunesByWeek';
import { Yaml, YamlPlaylist } from '../../graphql-types';

interface TabPaneProps {
  value: number;
  index: number;
  children: JSX.Element | JSX.Element[];
}

function TabPane({ value, index, children }: TabPaneProps) {
  return (
    <Container
      maxWidth="md"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      <Box py={2}>{value === index ? children : null}</Box>
    </Container>
  );
}

function SelectorsPage() {
  const location = useLocation();
  const data = useStaticQuery<AllDataQuery>(graphql`
    query {
      allYaml(
        filter: {
          playlist: { elemMatch: { selector: { ne: "草野マサムネ" } } }
        }
        sort: { fields: week, order: ASC }
      ) {
        edges {
          node {
            id
            title
            date(formatString: "YYYY-MM-DD")
            categories
            fields {
              slug
            }
            guests
            subtitle
            week
            year
            playlist {
              artist
              corner
              id
              indexInWeek
              index
              kana
              label
              name
              nation
              producer
              selector
              title
              week
              year
              youtube
            }
          }
        }
      }
    }
  `);
  // [[name, weeks]]
  const selectors = React.useMemo(() => {
    const weeks = data.allYaml.edges.map(d => d.node);
    const allTunes = weeks.reduce<YamlPlaylist[]>((accum, curr) => [...accum, ...curr.playlist], []);
    return allTunes
      .filter(d => d.selector !== '草野マサムネ')
      .reduce<[string, Yaml[]][]>((accum, curr) => {
        const existedIndex = accum.map(d => d[0]).indexOf(curr.selector);
        if (existedIndex < 0) {
          const weeksContainsSelector = weeks.filter(week => week.playlist.map(tune => tune.selector).indexOf(curr.selector) > 0);
          return [...accum, [curr.selector, weeksContainsSelector, filterSelector(weeksContainsSelector, curr.selector).length]];
        } else {
          return accum;
        }
      }, [])
      .sort(
        (a, b) =>
          filterSelector(b[1], b[0]).length - filterSelector(a[1], a[0]).length
      );
  }, [data]);
  console.log(selectors);
  console.log(location);
  const initialValue =
    location.state && location.state.selector
      ? selectors.map(d => d[0]).indexOf(location.state.selector)
      : 0;
  const [value, setValue] = React.useState(initialValue);
  const _handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Layout title={`${selectors[value][0]}選曲`} disablePaddingTop>
      <Tabs
        value={value}
        onChange={_handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {selectors.map(d => (
          <Tab key={d[0]} label={`${d[0]} ${d[1].length}`} />
        ))}
      </Tabs>
      <SwipeableViews
        index={value}
        onChangeIndex={_handleChangeIndex}
        resistance
      >
        {selectors.map((d, index) => (
          <TabPane key={index} value={value} index={index}>
            <div>
              {d[1].map((v, i) => (
                <TunesByWeek key={i} program={v} filter={(tune) => tune.selector === d[0]} />
              ))}
            </div>
          </TabPane>
        ))}
      </SwipeableViews>
    </Layout>
  );
}

export default SelectorsPage;

function filterSelector(weeks: Yaml[], selector: string) {
  return weeks.reduce((accum, curr) => [...accum, ...curr.playlist.filter(tune => tune.selector === selector)], []);
}