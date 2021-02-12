import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import { useLocation, WindowLocation } from '@reach/router';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout/TabLayout';
import TabPane from '../layout/TabPane';
import Section, { SectionDivider } from '../components/Section';
import ProgramItem from '../components/ProgramItem';
import Jumbotron from '../components/Jumbotron';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import { useSortProgramNode } from '../utils/useSorter';
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
  const sortProgramNode = useSortProgramNode();
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setTab(newValue);
  };
  const handleChangeIndex = (index: number) => {
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
      title="テーマ"
      tabs={
        <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          {categories.map((d, index) => (
            <Tab key={d.fieldValue ?? index} label={`${d.fieldValue} ${d.edges.length}`} />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance animateHeight>
        {categories.map((d, index) => (
          <TabPane key={index} value={tab} index={index} disableGutters>
            <Jumbotron title={fieldValues[tab]} footer={`全${d.edges.length}回`} />
            <Section>
              <List>
                {d.edges.sort(sortProgramNode).map(({ node }, i) => (
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
