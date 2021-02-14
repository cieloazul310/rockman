import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout/TabLayout';
import TabPane from '../layout/TabPane';
import Tab from '../components/MuiTab';
import Section, { SectionDivider } from '../components/Section';
import Article, { Paragraph } from '../components/Article';
import ProgramItem from '../components/ProgramItem';
import Jumbotron from '../components/Jumbotron';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import { useSortProgramNode } from '../utils/useSorter';
import { useParseHash, useHash } from '../utils/useHash';
import { useAllCategories } from '../utils/graphql-hooks';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

interface WindowState {
  category?: string;
}

function CategoriesPage() {
  const categories = useAllCategories();
  const titles = React.useMemo(() => ['', ...categories.map(({ fieldValue }) => fieldValue ?? '')], [categories]);
  const initialTab = useParseHash<WindowState>(titles, (state) => state?.category ?? undefined);
  const [tab, setTab] = React.useState(initialTab);

  const sortProgramNode = useSortProgramNode();
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setTab(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  const onItemClicked = (index: number) => () => {
    setTab(index);
  };

  useHash(tab, titles);
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
          <Tab label="概要" />
          {categories.map((d, index) => (
            <Tab key={d.fieldValue ?? index} label={`${d.fieldValue} ${d.edges.length}`} />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance animateHeight={typeof window === 'object'}>
        <TabPane value={tab} index={0} disableGutters>
          <Jumbotron title="テーマ" />
          <SectionDivider />
          <Section>
            <Article>
              <Paragraph>
                ロック大陸漫遊記の放送回を「アーティスト特集」「スピッツメンバーと漫遊記」など特定のテーマで分類したページです。
              </Paragraph>
              <List>
                {categories.map((category, index) => (
                  <ListItem key={index} button onClick={onItemClicked(index + 1)}>
                    <ListItemText primary={category.fieldValue} />
                    <Typography variant="button" component="span">
                      {category.edges.length}回
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Article>
          </Section>
        </TabPane>
        {categories.map((d, index) => (
          <TabPane key={index} value={tab} index={index + 1} disableGutters>
            <Jumbotron title={d.fieldValue} footer={`全${d.edges.length}回`} />
            <SectionDivider />
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
