import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Section, SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import TabPageTemplate from '../layout/TabTemplate';
import Seo from '../components/Seo';
import Jumbotron from '../components/Jumbotron';
import { ProgramByTune } from '../components/TunesByProgram';
import useSorter from '../utils/useSorter';
import { getDividedYears, getFiveYearString, getClusteredLength } from '../utils/cluster';
import type { ProgramBrowser, TuneFields } from '../../types';

type TimeMachinePageQueryData = {
  allTunes: {
    totalCount: number;
    tunes: (TuneFields & {
      program: Pick<ProgramBrowser, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'>;
    })[];
  };
};

function TimeMachinePage({ data }: PageProps<TimeMachinePageQueryData>) {
  const { allTunes } = data;
  const items = getDividedYears(allTunes.tunes, 5, (tune) => tune.year).sort((a, b) => b.value - a.value);
  const sorter = useSorter();

  return (
    <TabPageTemplate<typeof items[number]>
      title="ちょっぴりタイムマシン"
      description="ちょっぴりタイムマシンは、放送の最後にオンエアされる「最近ラジオでかかってない少し前の日本の楽曲を掘り起こそう」というコーナーです。ちょっぴりタイムマシンで放送された楽曲を年代別に分類したページです。"
      items={items}
      getTitle={({ value }) => getFiveYearString(value)}
      getCounterText={(item) => `${getClusteredLength(item)}曲`}
    >
      {items.map((fifth) => (
        <React.Fragment key={fifth.value.toString()}>
          <Jumbotron title={getFiveYearString(fifth.value)} footerText={`全${getClusteredLength(fifth)}曲`} />
          <SectionDivider />
          {[...fifth.items]
            .sort((a, b) => sorter(a.value - b.value))
            .map((annu) => (
              <div key={annu.value}>
                <Section>
                  <Container maxWidth="md" disableGutters>
                    <Box display="flex" alignItems="baseline" borderBottom={1} borderColor="secondary.dark" px={1} my={2}>
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
              </div>
            ))}
        </React.Fragment>
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
        ...tuneFields
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
