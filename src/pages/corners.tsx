import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import ProgramSummary from '../components/ProgramSummary';
import { AllDataQuery, Program } from '../../graphql-types';

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

type LocationWithState = WindowLocation & {
  state?: {
    category?: string;
  };
};

function CornersPage() {
  const location: LocationWithState = useLocation();
  const data = useStaticQuery<AllDataQuery>(graphql`
    query {
      allProgram(
        sort: { fields: week, order: ASC }
        filter: { categories: { glob: "*" } }
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
          next {
            title
            fields {
              slug
            }
            week
          }
          previous {
            fields {
              slug
            }
            title
            week
          }
        }
      }
    }
  `);
  // [name, playlist]
  const categories = React.useMemo(() => {
    const cats: [string, Partial<Program>[]][] = [];
    data.allProgram.edges.forEach(({ node }) => {
      node.categories.forEach(cate => {
        const existedIndex = cats.map(d => d[0]).indexOf(cate);
        if (existedIndex < 0) {
          cats.push([cate, [node]]);
        } else {
          cats[existedIndex][1].push(node);
        }
      });
    });
    return cats.sort((a, b) => b[1].length - a[1].length);
  }, [data]);
  console.log(location);
  const initialValue =
    location.state && location.state.category
      ? categories.map(d => d[0]).indexOf(location.state.category)
      : 0;
  const [value, setValue] = React.useState(initialValue);
  const _handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Layout title={categories[value][0]} disablePaddingTop>
      <Tabs
        value={value}
        onChange={_handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {categories.map(d => (
          <Tab key={d[0]} label={`${d[0]} ${d[1].length}`} />
        ))}
      </Tabs>
      <SwipeableViews
        index={value}
        onChangeIndex={_handleChangeIndex}
        resistance
      >
        {categories.map((d, index) => (
          <TabPane key={index} value={value} index={index}>
            <div>
              {d[1].map(v => (
                <ProgramSummary key={v.id} program={v} enableLink />
              ))}
            </div>
          </TabPane>
        ))}
      </SwipeableViews>
    </Layout>
  );
}

export default CornersPage;
