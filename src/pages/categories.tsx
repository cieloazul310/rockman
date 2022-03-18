import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { Section, SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import TabPageTemplate from '../layout/TabTemplate';
import Jumbotron from '../components/Jumbotron';
import ProgramItem from '../components/ProgramItem';
import { useSortProgramNode } from '../utils/useSorter';
import { ProgramList } from '../../types';

type WindowState = {
  category?: string;
};

type CategoriesPageQueryData = {
  allProgram: {
    group: {
      fieldValue: string;
      totalCount: number;
      edges: {
        node: ProgramList;
      }[];
    }[];
  };
};

function CategoriesPage({ data }: PageProps<CategoriesPageQueryData, unknown, WindowState>) {
  const categories = React.useMemo(() => {
    return data.allProgram.group.sort((a, b) => b.totalCount - a.totalCount || a.fieldValue.localeCompare(b.fieldValue));
  }, [data]);
  const sortProgramNode = useSortProgramNode();

  return (
    <TabPageTemplate<typeof categories[number], WindowState>
      title="テーマ"
      description="ロック大陸漫遊記の放送回を「アーティスト特集」「スピッツメンバーと漫遊記」など特定のテーマで分類したページです。"
      items={categories}
      getTitle={({ fieldValue }) => fieldValue}
      getTabTitle={({ fieldValue, edges }) => `${fieldValue} ${edges.length}`}
      getCounterText={({ edges }) => `${edges.length}回`}
      stateFunction={(state) => state?.category}
    >
      {categories.map((category) => (
        <React.Fragment key={category.fieldValue}>
          <Jumbotron title={category.fieldValue} footerText={`全${category.edges.length}回`} />
          <SectionDivider />
          <Section>
            <Container maxWidth="md" disableGutters>
              <List>
                {category.edges.sort(sortProgramNode).map(({ node }, i) => (
                  <ProgramItem key={node.id} program={node} last={i === category.edges.length - 1} />
                ))}
              </List>
            </Container>
          </Section>
        </React.Fragment>
      ))}
    </TabPageTemplate>
  );
}
/*
function CategoriesPage({ data }: PageProps<CategoriesPageQueryData, unknown, WindowState>) {
  const categories = React.useMemo(() => {
    return data.allProgram.group.sort((a, b) => b.totalCount - a.totalCount || a.fieldValue.localeCompare(b.fieldValue));
  }, [data]);
  const titles = React.useMemo(() => ['', ...categories.map(({ fieldValue }) => fieldValue ?? '')], [categories]);
  const initialTab = useParseHash<WindowState>(titles, (state) => state?.category ?? undefined);
  const [tab, setTab] = React.useState(initialTab);

  const sortProgramNode = useSortProgramNode();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="概要" />
          {categories.map((d) => (
            <Tab key={d.fieldValue} label={`${d.fieldValue} ${d.edges.length}`} />
          ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance animateHeight={typeof window === 'object'}>
        <TabPane currentTab={tab} index={0} renderNeighbor>
          <Jumbotron disableGradient maxWidth="md">
            <Typography variant="h5" component="h2" gutterBottom>
              テーマ
            </Typography>
          </Jumbotron>
          <SectionDivider />
          <Section>
            <Article maxWidth="md">
              <Paragraph>
                ロック大陸漫遊記の放送回を「アーティスト特集」「スピッツメンバーと漫遊記」など特定のテーマで分類したページです。
              </Paragraph>
              <List>
                {categories.map((category, index) => (
                  <ListItem key={category.fieldValue} button onClick={onItemClicked(index + 1)}>
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
        {categories.map((category, index) => (
          <TabPane key={category.fieldValue} currentTab={tab} index={index + 1} renderNeighbor>
            <Jumbotron title={category.fieldValue} disableGradient maxWidth="md">
              <Typography variant="h5" component="h2" gutterBottom>
                {category.fieldValue}
              </Typography>
              <Typography>全{category.edges.length}回</Typography>
            </Jumbotron>
            <SectionDivider />
            <Section>
              <Container maxWidth="md" disableGutters>
                <List>
                  {category.edges.sort(sortProgramNode).map(({ node }, i) => (
                    <ProgramItem key={node.id} program={node} last={i === category.edges.length - 1} />
                  ))}
                </List>
              </Container>
            </Section>
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <AdBasic />
      <SectionDivider />
    </Layout>
  );
}
*/

export default CategoriesPage;

export const query = graphql`
  query {
    allProgram(sort: { fields: week, order: ASC }, filter: { categories: { ne: "" } }) {
      group(field: categories) {
        totalCount
        fieldValue
        edges {
          node {
            ...programList
          }
        }
      }
    }
  }
`;
