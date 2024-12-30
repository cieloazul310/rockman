import * as React from "react";
import { graphql, type PageProps } from "gatsby";
import Container from "@mui/material/Container";
import { Section } from "@cieloazul310/gatsby-theme-aoi";
import Layout from "@/layout";
import Seo from "@/components/seo";
import Jumbotron from "@/components/jumbotron";
import Programs from "@/components/program-list/container";
import { AdInSectionDivider } from "@/components/ads";
import type { ProgramListFragment } from "types";

type ProgramsPageQueryData = {
  allProgram: {
    group: {
      fieldValue: string;
      totalCount: number;
      nodes: ProgramListFragment[];
    }[];
  };
};

function ProgramsPage({ data }: PageProps<ProgramsPageQueryData>) {
  return (
    <Layout title="放送回">
      <Jumbotron component="header" title="放送回一覧" />
      <Section component="main">
        <Container maxWidth="md" disableGutters>
          <Programs data={data.allProgram.group} />
        </Container>
      </Section>
      <AdInSectionDivider />
    </Layout>
  );
}

export default ProgramsPage;

export function Head() {
  return <Seo title="放送回一覧" />;
}

export const query = graphql`
  {
    allProgram(sort: { week: ASC }) {
      group(field: { year: SELECT }) {
        fieldValue
        totalCount
        nodes {
          ...programList
        }
      }
    }
  }
`;
