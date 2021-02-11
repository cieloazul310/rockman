import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from 'gatsby-theme-aoi/src/layouts/TabPageLayout';
import TabPane from '../layout/TabPane';
import Section, { SectionDivider } from '../components/Section';
import ProgramItem from '../components/ProgramItem';
import Jumbotron from '../components/Jumbotron';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import useSorter from '../utils/useSorter';
import { useAllCategories } from '../utils/graphql-hooks';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function CategoriesPage() {
  const location = useLocation() as WindowLocation<{
    category?: string;
  }>;
  const { hash, state } = location;
  const categories = useAllCategories();
  const fieldValues = categories.map(({ fieldValue }) => fieldValue);
  const initialCategory = hash !== '' ? decodeURI(hash.slice(1)) : null;
  // @TODO: add Hash support
  const initialValue =
    fieldValues.indexOf(initialCategory) >= 0
      ? fieldValues.indexOf(initialCategory)
      : state?.category
      ? fieldValues.indexOf(state.category)
      : 0;
  const [tab, setTab] = React.useState(initialValue);
  const sorter = useSorter();
  const _handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setTab(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setTab(index);
  };
  React.useEffect(() => {
    if (window && typeof window === 'object') window.history.replaceState(tab, '', `#${categories[tab].fieldValue}`);
  }, [tab, categories]);
  React.useEffect(() => {
    if (typeof window === 'object') {
      window.scrollTo(0, 0);
    }
  }, [tab]);

  return (
    <Layout
      title={categories[tab]?.fieldValue ?? 'Category'}
      tabSticky
      disableGutters
      disablePaddingTop
      componentViewports={{ BottomNav: false }}
      tabs={
        <Tabs value={tab} onChange={_handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          {categories.map((d, index) => (
            <Tab key={d.fieldValue ?? index} label={`${d.fieldValue} ${d.edges.length}`} />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={_handleChangeIndex} resistance>
        {categories.map((d, index) => (
          <TabPane key={index} value={tab} index={index} disableGutters>
            <Jumbotron title={fieldValues[tab]} footer={`全${d.edges.length}回`} />
            <Section>
              <List>
                {d.edges
                  .sort((a, b) => sorter(a.node.week && b.node.week ? a.node.week - b.node.week : 0))
                  .map(({ node }, i) => (
                    <ProgramItem key={node.id} program={node} last={i === d.edges.length - 1} />
                  ))}
              </List>
            </Section>
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <AdInArticle />
      <SectionDivider />
      <Section>
        <NavigationBox />
      </Section>
    </Layout>
  );
}

export default CategoriesPage;
