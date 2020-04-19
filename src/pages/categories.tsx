import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layouts/TabPageLayout';
import TabPane from 'gatsby-theme-aoi/src/layout/TabPane';
import ListItemLink from 'gatsby-theme-aoi/src/components/ListItemLink';
import useSorter from '../utils/useSorter';
import { useAllCategories } from '../utils/graphql-hooks';

type LocationWithState = WindowLocation & {
  state?: {
    category?: string;
  };
};

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function CategoriesPage() {
  const location: LocationWithState = useLocation();
  const categories = useAllCategories();
  const initialValue =
    location.state && location.state.category
      ? categories.map(d => d.fieldValue).indexOf(location.state.category)
      : 0;
  const [tab, setTab] = React.useState(initialValue);
  const sorter = useSorter();
  const _handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setTab(index);
  };
  React.useEffect(() => {
    history.replaceState(tab, '', `#${categories[tab].fieldValue}`);
  }, [tab]);

  return (
    <Layout
      title={categories[tab].fieldValue}
      tabSticky
      componentViewports={{ BottomNav: false }}
      tabs={
        <Tabs
          value={tab}
          onChange={_handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {categories.map(d => (
            <Tab
              key={d.fieldValue}
              label={`${d.fieldValue} ${d.edges.length}`}
            />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews
        index={tab}
        onChangeIndex={_handleChangeIndex}
        resistance
      >
        {categories.map((d, index) => (
          <TabPane key={index} value={tab} index={index}>
            <List>
              {d.edges
                .sort((a, b) => sorter(a.node.week - b.node.week))
                .map(v => (
                  <ListItemLink
                    key={v.node.id}
                    to={v.node.fields.slug}
                    primaryText={v.node.title}
                    secondaryText={`第${v.node.week}回 ${v.node.date}`}
                    divider
                  />
                ))}
            </List>
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
    </Layout>
  );
}

export default CategoriesPage;
