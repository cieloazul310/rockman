import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layouts/TabPageLayout';
import TabPane from 'gatsby-theme-aoi/src/layout/TabPane';
import LazyViewer from '../components/LazyViewer';
import { useCorners } from '../utils/graphql-hooks';

type LocationWithState = WindowLocation & {
  state?: {
    corner?: string;
  };
};

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function CornersPage() {
  const location: LocationWithState = useLocation();
  const corners = useCorners();
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
    <Layout
      title={`${corners[value][0]}`}
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
          {corners.map(d => (
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
        {corners.map((d, index) => (
          <TabPane key={index} value={value} index={index}>
            <LazyViewer
              programs={d[1]}
              divisor={15}
              filter={tune => tune.corner === d[0]}
            />
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
    </Layout>
  );
}

export default CornersPage;
