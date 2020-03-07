import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../components/TabPageLayout';
import { AllDataQuery } from '../../graphql-types';
import LazyViewer from '../components/LazyViewer';
import {
  getAllTunes,
  getProgramsContainsValue,
  filterPlaylist,
} from '../utils/filterPlaylist';
import { SelectorItem } from '../types';

interface TabPaneProps {
  value: number;
  index: number;
  children: JSX.Element | JSX.Element[];
}
type LocationWithState = WindowLocation & {
  state?: {
    selector?: string;
  };
};
function TabPane({ value, index, children }: TabPaneProps) {
  return (
    <Container
      maxWidth="md"
      role="tabpanel"
      disableGutters
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      <Box py={2}>{value === index ? children : null}</Box>
    </Container>
  );
}
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function SelectorsPage() {
  const location: LocationWithState = useLocation();
  const data = useStaticQuery<AllDataQuery>(graphql`
    query {
      allProgram(
        filter: {
          playlist: { elemMatch: { selector: { nin: "草野マサムネ" } } }
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
  // [[name, programs]]
  const selectors: SelectorItem[] = React.useMemo(() => {
    const programs = data.allProgram.edges.map(d => d.node);
    const allTunes = getAllTunes(programs);
    return allTunes
      .filter(d => d.selector !== '草野マサムネ')
      .reduce<SelectorItem[]>((accum, curr) => {
        const existedIndex = accum.map(d => d[0]).indexOf(curr.selector);
        if (existedIndex < 0) {
          const programsContainsSelector = getProgramsContainsValue(
            'selector',
            curr.selector
          )(programs);
          return [
            ...accum,
            [
              curr.selector,
              programsContainsSelector,
              filterPlaylist(
                'selector',
                curr.selector
              )(programsContainsSelector).length,
            ],
          ];
        } else {
          return accum;
        }
      }, [])
      .sort((a, b) => b[2] - a[2]);
  }, [data]);
  console.log(selectors);
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
    <Layout title={`${selectors[value][0]}の選曲`}>
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
          <Tab key={d[0]} label={`${d[0]} ${d[2]}`} />
        ))}
      </Tabs>
      <BindKeyboardSwipeableViews
        index={value}
        onChangeIndex={_handleChangeIndex}
        resistance
      >
        {selectors.map((d, index) => (
          <TabPane key={index} value={value} index={index}>
            <LazyViewer
              programs={d[1]}
              divisor={15}
              filter={tune => tune.selector === d[0]}
            />
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
    </Layout>
  );
}

export default SelectorsPage;
