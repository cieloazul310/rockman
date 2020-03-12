import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layout/TabPageLayout';
import TabPane from 'gatsby-theme-aoi/src/layout/TabPane';
import ProgramSummary from '../components/ProgramSummary';
import useSorter from '../utils/useSorter';
import { useCategories } from '../utils/graphql-hooks';

type LocationWithState = WindowLocation & {
  state?: {
    category?: string;
  };
};

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function CategoriesPage() {
  const location: LocationWithState = useLocation();
  const categories = useCategories();
  const initialValue =
    location.state && location.state.category
      ? categories.map(d => d[0]).indexOf(location.state.category)
      : 0;
  const [value, setValue] = React.useState(initialValue);
  const sorter = useSorter();
  const _handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Layout
      title={categories[value][0]}
      tabSticky
      disableBottomNav
      tabs={
        <Tabs
          value={value}
          onChange={_handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {categories.map(d => (
            <Tab key={d[0]} label={`${d[0]} ${d[1].length}`} />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews
        index={value}
        onChangeIndex={_handleChangeIndex}
        resistance
      >
        {categories.map((d, index) => (
          <TabPane key={index} value={value} index={index}>
            {d[1].sort((a, b) => sorter(a.week - b.week)).map(v => (
              <React.Fragment key={v.id}>
                <ProgramSummary program={v} enableLink />
                <Divider />
              </React.Fragment>
            ))}
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
    </Layout>
  );
}

export default CategoriesPage;
