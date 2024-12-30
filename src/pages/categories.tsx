import * as React from "react";
import { graphql, type PageProps } from "gatsby";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import { Section, SectionWrapper } from "@cieloazul310/gatsby-theme-aoi";
import TabPageTemplate from "@/layout/tab-template";
import Seo from "@/components/seo";
import Jumbotron from "@/components/jumbotron";
import ProgramItem from "@/components/program-list/item";
import { useSortProgram } from "@/utils/use-sorter";
import type { ProgramListFragment } from "types";

type WindowState = {
  category?: string;
};

type CategoriesPageQueryData = {
  allProgram: {
    group: {
      fieldValue: string;
      totalCount: number;
      nodes: ProgramListFragment[];
    }[];
  };
};

function CategoriesPage({
  data,
}: PageProps<CategoriesPageQueryData, unknown, WindowState>) {
  const categories = React.useMemo(() => {
    return data.allProgram.group.sort(
      (a, b) =>
        b.totalCount - a.totalCount || a.fieldValue.localeCompare(b.fieldValue),
    );
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
        <SectionWrapper key={category.fieldValue} component="article">
          <Jumbotron
            title={category.fieldValue}
            footerText={`全${category.nodes.length}回`}
            component="header"
          />
          <Section component="main">
            <Container maxWidth="md" disableGutters>
              <List>
                {category.nodes.sort(sortProgram).map((node, i) => (
                  <ProgramItem
                    key={node.id}
                    program={node}
                    last={i === category.nodes.length - 1}
                  />
                ))}
              </List>
            </Container>
          </Section>
        </SectionWrapper>
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
