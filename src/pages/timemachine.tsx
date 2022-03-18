import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Section, SectionDivider, H3 } from '@cieloazul310/gatsby-theme-aoi';
import TabPageTemplate from '../layout/TabTemplate';
import Jumbotron from '../components/Jumbotron';
import { ProgramByTune } from '../components/TunesByProgram';
import useSorter from '../utils/useSorter';
import { getDividedYears, getFiveYearString, getClusteredLength } from '../utils/cluster';
import { ProgramBrowser, TuneFields } from '../../types';

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
      title="テーマ"
      description="ロック大陸漫遊記の放送回を「アーティスト特集」「スピッツメンバーと漫遊記」など特定のテーマで分類したページです。"
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
                    <H3>{annu.value}年</H3>
                    <Typography>{annu.items.length}曲</Typography>
                  </Container>
                </Section>
                {annu.items.map((tune) => (
                  <ProgramByTune key={tune.id} tune={tune} />
                ))}
              </div>
            ))}
        </React.Fragment>
      ))}
    </TabPageTemplate>
  );
  /*
  const titles = React.useMemo(() => ['', ...items.map(({ value }) => value.toString())], [items]);
  const initialTab = useParseHash(titles);
  const [tab, setTab] = React.useState(initialTab);
  const sorter = useSorter();
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
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
      title="ちょっぴりタイムマシン"
      tabs={
        <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          <Tab label="概要" />
          {items
            .sort((a, b) => b.value - a.value)
            .map((fifth) => (
              <Tab key={fifth.value} label={getFiveYearString(fifth.value)} />
            ))}
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance animateHeight={typeof window === 'object'}>
        <TabPane currentTab={tab} index={0} renderNeighbor>
          <Jumbotron disableGradient maxWidth="md">
            <Typography variant="h5" component="h2" gutterBottom>
              ちょっぴりタイムマシン
            </Typography>
          </Jumbotron>
          <SectionDivider />
          <Section>
            <Article maxWidth="md">
              <Paragraph>
                ちょっぴりタイムマシンは、放送の最後にオンエアされる「最近ラジオでかかってない少し前の日本の楽曲を掘り起こそう」というコーナーです。ちょっぴりタイムマシンで放送された楽曲を年代別に分類したページです。
              </Paragraph>
              <List>
                {items.map((fifth, index) => (
                  <ListItem key={fifth.value.toString()} button onClick={onItemClicked(index + 1)}>
                    <ListItemText primary={getFiveYearString(fifth.value)} />
                    <Typography variant="button" component="span">
                      {getClusteredLength(fifth)}曲
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Article>
          </Section>
        </TabPane>
        {items.map((fifth, index) => (
          <TabPane key={fifth.value.toString()} currentTab={tab} index={index + 1} renderNeighbor>
            <Jumbotron title={getFiveYearString(fifth.value)} disableGradient maxWidth="md">
              <Typography variant="h5" component="h2" gutterBottom>
                {getFiveYearString(fifth.value)}
              </Typography>
              <Typography>全{getClusteredLength(fifth)}曲</Typography>
            </Jumbotron>
            <SectionDivider />
            {[...fifth.items]
              .sort((a, b) => sorter(a.value - b.value))
              .map((annu) => (
                <div key={annu.value}>
                  <Section>
                    <Container maxWidth="md" disableGutters>
                      <H3>{annu.value}年</H3>
                      <Typography>{annu.items.length}曲</Typography>
                    </Container>
                  </Section>
                  {annu.items.map((tune) => (
                    <ProgramByTune key={tune.id} tune={tune} />
                  ))}
                </div>
              ))}
          </TabPane>
        ))}
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <AdBasic />
      <SectionDivider />
    </Layout>
  );
  */
}

export default TimeMachinePage;

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
