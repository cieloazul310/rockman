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
