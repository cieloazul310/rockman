import * as React from "react";
import { graphql, type PageProps } from "gatsby";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Section, SectionWrapper } from "@cieloazul310/gatsby-theme-aoi";
import TabPageTemplate from "@/layout/tab-template";
import Seo from "@/components/seo";
import Jumbotron from "@/components/jumbotron";
import ProgramByTune from "@/components/tunes/program-by-tune";
import useSorter from "@/utils/use-sorter";
import {
  getDividedYears,
  getFiveYearString,
  getClusteredLength,
} from "@/utils/cluster";
import type { Program, TuneItemFragment } from "types";

type TimeMachinePageQueryData = {
  allTunes: {
    totalCount: number;
    tunes: (TuneItemFragment & {
      program: Pick<
        Program,
        "id" | "week" | "date" | "slug" | "title" | "subtitle"
      >;
    })[];
  };
};

function TimeMachinePage({ data }: PageProps<TimeMachinePageQueryData>) {
  const { allTunes } = data;
  const items = getDividedYears(allTunes.tunes, 5, (tune) => tune.year).sort(
    (a, b) => b.value - a.value,
  );
  const sorter = useSorter();

  return (
    <TabPageTemplate<(typeof items)[number]>
      title="ちょっぴりタイムマシン"
      description="ちょっぴりタイムマシンは、放送の最後にオンエアされる「最近ラジオでかかってない少し前の日本の楽曲を掘り起こそう」というコーナーです。ちょっぴりタイムマシンで放送された楽曲を年代別に分類したページです。"
      items={items}
      getTitle={({ value }) => getFiveYearString(value)}
      getCounterText={(item) => `${getClusteredLength(item)}曲`}
    >
      {items.map((fifth) => (
        <SectionWrapper key={fifth.value.toString()} component="article">
          <Jumbotron
            title={getFiveYearString(fifth.value)}
            footerText={`全${getClusteredLength(fifth)}曲`}
            component="header"
          />
          <SectionWrapper spacing={1} component="main">
            {[...fifth.items]
              .sort((a, b) => sorter(a.value - b.value))
              .map((annu) => (
                <Section key={annu.value} component="article" py={2}>
                  <Container maxWidth="md">
                    <Box
                      display="flex"
                      alignItems="baseline"
                      borderBottom={1}
                      borderColor="secondary.dark"
                    >
                      <Typography variant="h5" component="h3">
                        {annu.value}年
                      </Typography>
                      <Typography ml={1}>{annu.items.length}曲</Typography>
                    </Box>
                  </Container>
                  {annu.items.map((tune) => (
                    <ProgramByTune key={tune.id} tune={tune} />
                  ))}
                </Section>
              ))}
          </SectionWrapper>
        </SectionWrapper>
      ))}
    </TabPageTemplate>
  );
}

export default TimeMachinePage;

export function Head() {
  return <Seo title="ちょっぴりタイムマシン" />;
}

export const query = graphql`
  query {
    allTunes(corner: { eq: "ちょっぴりタイムマシン" }) {
      totalCount
      tunes {
        ...tuneItem
        program {
          id
          title
          subtitle
          week
          slug
          date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;
