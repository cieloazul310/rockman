import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layout/TabPageLayout';
import TabPane from 'gatsby-theme-aoi/src/layout/TabPane';
import LazyViewer from '../components/LazyViewer';
import { useSelectors } from '../utils/graphql-hooks';

type LocationWithState = WindowLocation & {
  state?: {
    selector?: string;
  };
};
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function SelectorsPage() {
  const location: LocationWithState = useLocation();
  // [[name, programs]]
  const selectors = useSelectors();
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
    <Layout
      title={`${selectors[value][0]}の選曲`}
      tabSticky
      tabs={
        <Tabs
          value={value}
          onChange={_handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {selectors.map(d => (
            <Tab key={d[0]} label={`${d[0]} ${d[2]}`} />
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
