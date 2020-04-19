import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layouts/TabPageLayout';
import TabPane from 'gatsby-theme-aoi/src/layout/TabPane';
import LazyViewer from '../components/LazyViewer';
import { useSelectors } from '../utils/graphql-hooks';
import { useAllSelectors } from '../utils/graphql-hooks/useAllSelectors';

type LocationWithState = WindowLocation & {
  state?: {
    selector?: string;
  };
};
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function SelectorsPage() {
  const location: LocationWithState = useLocation();
  // [[name, programs]]
  const selectors = useAllSelectors();
  const initialSelector =
    location.hash !== '' ? decodeURI(location.hash.slice(1)) : null;
  const initialValue =
    selectors.map(d => d.fieldValue).indexOf(initialSelector) >= 0
      ? selectors.map(d => d.fieldValue).indexOf(initialSelector)
      : location.state && location.state.selector
      ? selectors.map(d => d.fieldValue).indexOf(location.state.selector)
      : 0;
  const [value, setValue] = React.useState(initialValue);
  const _handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setValue(index);
  };
  React.useEffect(() => {
    history.replaceState(value, '', `#${selectors[value].fieldValue}`);
  }, [value]);

  return (
    <Layout
      title={`${selectors[value].fieldValue}の選曲`}
      tabSticky
      componentViewports={{ BottomNav: false }}
      tabs={
        <Tabs
          value={value}
          onChange={_handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {selectors.map(d => (
            <Tab
              key={d.fieldValue}
              label={`${d.fieldValue} ${d.playlist.length}`}
            />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews
        index={value}
        onChangeIndex={_handleChangeIndex}
        resistance
      >
        {selectors.map((d, index) => (
          <TabPane key={index} value={value} index={index}>
            <LazyViewer
              programs={d.edges.map(v => v.node)}
              divisor={15}
              filter={tune => tune.selector === d.fieldValue}
            />
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
    </Layout>
  );
}

export default SelectorsPage;
