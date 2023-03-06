import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { Section, SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import TabPageTemplate from '../layout/TabTemplate';
import Seo from '../components/Seo';
import Jumbotron from '../components/Jumbotron';
import ProgramItem from '../components/ProgramItem';
import { useSortProgram } from '../utils/useSorter';
import type { ProgramList } from '../../types';

type WindowState = {
  category?: string;
};

type CategoriesPageQueryData = {
  allProgram: {
    group: {
      fieldValue: string;
      totalCount: number;
      nodes: ProgramList[];
    }[];
  };
};

function CategoriesPage({ data }: PageProps<CategoriesPageQueryData, unknown, WindowState>) {
  const categories = React.useMemo(() => {
    return data.allProgram.group.sort((a, b) => b.totalCount - a.totalCount || a.fieldValue.localeCompare(b.fieldValue));
  }, [data]);
  const sortProgram = useSortProgram();

  return (
    <TabPageTemplate<(typeof categories)[number], WindowState>
      title="テーマ"
      description="ロック大陸漫遊記の放送回を「アーティスト特集」「スピッツメンバーと漫遊記」など特定のテーマで分類したページです。"
      items={categories}
      getTitle={({ fieldValue }) => fieldValue}
      getTabTitle={({ fieldValue, nodes }) => `${fieldValue} ${nodes.length}`}
      getCounterText={({ nodes }) => `${nodes.length}回`}
      stateFunction={(state) => state?.category}
    >
      {categories.map((category) => (
        <React.Fragment key={category.fieldValue}>
          <Jumbotron title={category.fieldValue} footerText={`全${category.nodes.length}回`} />
          <SectionDivider />
          <Section>
            <Container maxWidth="md" disableGutters>
              <List>
                {category.nodes.sort(sortProgram).map((node, i) => (
                  <ProgramItem key={node.id} program={node} last={i === category.nodes.length - 1} />
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

export function Head() {
  return <Seo title="テーマ" />;
}

export const query = graphql`
  {
    allProgram(sort: { week: ASC }, filter: { categories: { ne: "" } }) {
      group(field: { categories: SELECT }) {
        totalCount
        fieldValue
        nodes {
          ...programList
        }
      }
    }
  }
`;
