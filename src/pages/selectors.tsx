import * as React from 'react';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layouts/TabPageLayout';
import TabPane from 'gatsby-theme-aoi/src/layout/TabPane';
import ContentBasis from '../components/ContentBasis';
import NavigationBox from '../components/NavigationBox';
import LazyViewer from '../components/LazyViewer';
import { useAllSelectors } from '../utils/graphql-hooks/useAllSelectors';

type LocationWithState = WindowLocation & {
  state?: {
    selector?: string;
  };
};
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function SelectorsPage() {
  const { hash, state } = useLocation() as LocationWithState;
  // [[name, programs]]
  const selectors = useAllSelectors();
  const initialSelector = hash !== '' ? decodeURI(hash.slice(1)) : null;
  const fieldValues = selectors.map(({ fieldValue }) => fieldValue);
  const initialValue =
    initialSelector && fieldValues.indexOf(initialSelector) >= 0
      ? fieldValues.indexOf(initialSelector)
      : state?.selector
      ? fieldValues.indexOf(state?.selector)
      : 0;
  const [value, setValue] = React.useState(initialValue);
  const _handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setValue(index);
  };
  React.useEffect(() => {
    if (window && typeof window === 'object') window.history.replaceState(value, '', `#${selectors[value].fieldValue}`);
  }, [value, selectors]);
  React.useEffect(() => {
    if (typeof window === 'object') {
      window.scrollTo(0, 0);
    }
  }, [value]);

  return (
    <Layout
      title={`${selectors[value].fieldValue}の選曲`}
      tabSticky
      componentViewports={{ BottomNav: false }}
      tabs={
        <Tabs value={value} onChange={_handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          {selectors.map((d) => (
            <Tab key={d.fieldValue} label={`${d.fieldValue} ${d.playlist.length}`} />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={value} onChangeIndex={_handleChangeIndex} resistance>
        {selectors.map((d, index) => (
          <TabPane key={index} value={value} index={index}>
            <LazyViewer programs={d.edges.map((v) => v.node)} divisor={15} filter={(tune) => tune.selector === d.fieldValue} />
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
      <Container maxWidth="md">
        <ContentBasis>
          <NavigationBox />
        </ContentBasis>
      </Container>
    </Layout>
  );
}

export default SelectorsPage;
