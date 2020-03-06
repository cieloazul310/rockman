import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
//import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import Layout from '../components/TabPageLayout';
import { AllDataQuery } from '../../graphql-types';
import LazyViewer from '../components/LazyViewer';
import { getAllTunes, getProgramsContainsValue, filterPlaylist } from '../utils/filterPlaylist';
import { CornerItem } from '../types';

interface TabPaneProps {
  value: number;
  index: number;
  children: JSX.Element | JSX.Element[];
}
type LocationWithState = WindowLocation & {
  state?: {
    corner?: string;
  };
};

function TabPane({ value, index, children }: TabPaneProps) {
  return (
    <Container
      maxWidth="md"
      role="tabpanel"
      hidden={value !== index}
      disableGutters
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      <Box py={2}>{value === index ? children : null}</Box>
    </Container>
  );
}

function CornersPage() {
  const location: LocationWithState = useLocation();
  const data = useStaticQuery<AllDataQuery>(graphql`
    query {
      allProgram(
        filter: { playlist: { elemMatch: { corner: { glob: "*" } } } }
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
  // [[name, programs, count]]
  const corners: CornerItem[] = React.useMemo(() => {
    const programs = data.allProgram.edges.map(d => d.node);
    const allTunes = getAllTunes(programs);
    return allTunes
      .filter(tune => tune.corner !== "")
      .reduce<CornerItem[]>(
        (accum, curr) => {
          const existedIndex = accum.map(d => d[0]).indexOf(curr.corner);
          if (existedIndex < 0) {
            const programsContainsCorner = getProgramsContainsValue('corner', curr.corner)(programs);

            return [
              ...accum,
              [
                curr.corner,
                programsContainsCorner,
                filterPlaylist('corner', curr.corner)(programsContainsCorner).length
              ]
            ];
          } else {
            return accum;
          }
        },
        []
      )
      .sort(
        (a, b) =>
          b[2] - a[2]
      );
  }, [data]);
  console.log(corners);
  const initialValue =
    location.state && location.state.corner
      ? corners.map(d => d[0]).indexOf(location.state.corner)
      : 0;
  const [value, setValue] = React.useState(initialValue);
  const _handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Layout title={`${corners[value][0]}`}>
      <Tabs
        value={value}
        onChange={_handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {corners.map(d => (
          <Tab key={d[0]} label={`${d[0]} ${d[2]}`} />
        ))}
      </Tabs>
      <SwipeableViews
        index={value}
        onChangeIndex={_handleChangeIndex}
        resistance
      >
        {corners.map((d, index) => (
          <TabPane key={index} value={value} index={index}>
            <LazyViewer
              programs={d[1]}
              divisor={15}
              filter={tune => tune.corner === d[0]}
            />
          </TabPane>
        ))}
      </SwipeableViews>
    </Layout>
  );
}

export default CornersPage;
