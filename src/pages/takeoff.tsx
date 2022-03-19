import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Section, SectionDivider, Article } from '@cieloazul310/gatsby-theme-aoi';
import TabPageTemplate from '../layout/TabTemplate';
import Jumbotron from '../components/Jumbotron';
import TakeOffAlbum, { TakeOffOthers } from '../components/TakeOffAlbum';
import { ProgramByTune } from '../components/TunesByProgram';
import { ProgramBrowser, SpitzAlbumBrowser, SpitzTune, TuneFields } from '../../types';

type TakeOffQueryData = {
  albums: {
    edges: {
      node: Pick<SpitzAlbumBrowser, 'id' | 'albumIdNum' | 'title' | 'year'> & {
        tunes: (SpitzTune & {
          program: Pick<ProgramBrowser, 'id' | 'date' | 'slug' | 'title' | 'subtitle' | 'week' | 'image'>[];
        })[];
      };
    }[];
  };
  others: {
    edges: {
      node: Pick<SpitzAlbumBrowser, 'id' | 'albumIdNum' | 'title' | 'year'> & {
        tunes: (SpitzTune & {
          program: Pick<ProgramBrowser, 'id' | 'date' | 'slug' | 'title' | 'subtitle' | 'week' | 'image'>[];
        })[];
      };
    }[];
  };
  notSpitz: {
    totalCount: number;
    tunes: (TuneFields & {
      program: Pick<ProgramBrowser, 'id' | 'date' | 'slug' | 'title' | 'subtitle' | 'week' | 'image'>;
    })[];
  };
};

function TakeOff({ data }: PageProps<TakeOffQueryData>) {
  const { albums, others, notSpitz } = data;
  /*
  const titles = React.useMemo(() => [...albums.edges.map(({ node }) => node.title), 'その他の楽曲', 'スピッツ以外の楽曲'], [albums]);
  */
  const items: { title: string; oaLength?: number; tunesLength?: number }[] = React.useMemo(() => {
    const albumItem = albums.edges.map(({ node }) => ({
      title: node.title,
      oaLength: node.tunes.filter((tune) => tune.program.length).length,
      tunesLength: node.tunes.length,
    }));
    return [...albumItem, { title: 'その他の楽曲' }, { title: 'スピッツ以外の楽曲' }];
  }, [albums]);

  return (
    <TabPageTemplate
      title="漫遊前の一曲"
      description="漫遊前の一曲は、放送の1曲目にスピッツ（稀にスピッツ以外）の楽曲をオンエアするコーナーです。漫遊前の一曲で流れた楽曲をスピッツのアルバム別に分類したページです。"
      items={items}
      getTitle={({ title }) => title}
      getCounterText={({ oaLength, tunesLength }) => (oaLength && tunesLength ? `${oaLength}/${tunesLength}曲` : undefined)}
    >
      {[
        ...albums.edges.map(({ node }) => (
          <React.Fragment key={node.id}>
            <Jumbotron
              title={node.title}
              headerText={node.year}
              footerText={`${node.tunes.filter((tune) => tune.program.length).length}/${node.tunes.length}曲`}
            />
            <SectionDivider />
            <Section>
              <Article maxWidth="md">
                <TakeOffAlbum album={node} />
              </Article>
            </Section>
          </React.Fragment>
        )),
        <React.Fragment key="others">
          <Jumbotron title="その他の楽曲" />
          <SectionDivider />
          <Section>
            <Article maxWidth="md">
              <TakeOffOthers albums={others} />
            </Article>
          </Section>
        </React.Fragment>,
        <React.Fragment key="notSpitz">
          <Jumbotron title="スピッツ以外の楽曲" />
          <SectionDivider />
          {notSpitz.tunes.map((tune) => (
            <ProgramByTune key={tune.id} tune={tune} />
          ))}
        </React.Fragment>,
      ]}
    </TabPageTemplate>
  );
  /*
  const initialTab = useParseHash(titles);
  const [tab, setTab] = React.useState(initialTab);
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
      title="漫遊前の一曲"
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
          {albums.edges.map(({ node }) => (
            <Tab key={node.id} label={node.title} />
          ))}
          <Tab label="その他の楽曲" />
          <Tab label="スピッツ以外の楽曲" />
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance animateHeight={typeof window === 'object'}>
        <TabPane index={0} currentTab={tab} renderNeighbor>
          <Jumbotron title="漫遊前の一曲" />
          <SectionDivider />
          <Section>
            <Article maxWidth="md">
              <Paragraph>
                漫遊前の一曲は、放送の1曲目にスピッツ（稀にスピッツ以外）の楽曲をオンエアするコーナーです。漫遊前の一曲で流れた楽曲をスピッツのアルバム別に分類したページです。
              </Paragraph>
              <List>
                {albums.edges.map(({ node }, index) => (
                  <ListItem key={node.id} button onClick={onItemClicked(index + 1)}>
                    <ListItemText primary={node.title} secondary={node.year} />
                    <Typography variant="button" component="span">
                      {node.tunes.filter((tune) => tune.program.length).length}/{node.tunes.length}曲
                    </Typography>
                  </ListItem>
                ))}
                <ListItem button onClick={onItemClicked(albums.edges.length + 1)}>
                  <ListItemText primary="その他の楽曲" />
                </ListItem>
                <ListItem button onClick={onItemClicked(albums.edges.length + 2)}>
                  <ListItemText primary="スピッツ以外の楽曲" />
                </ListItem>
              </List>
            </Article>
          </Section>
        </TabPane>
        {albums.edges.map(({ node }, index) => (
          <TabPane key={node.title} index={index + 1} currentTab={tab} renderNeighbor>
            <Jumbotron
              headerText={node.year}
              title={node.title}
              footerText={`${node.tunes.filter((tune) => tune.program.length).length}/${node.tunes.length}曲`}
            />
            <SectionDivider />
            <Section>
              <Article maxWidth="md">
                <TakeOffAlbum album={node} />
              </Article>
            </Section>
          </TabPane>
        ))}
        <TabPane index={albums.edges.length + 1} currentTab={tab} renderNeighbor>
          <Jumbotron title="その他の楽曲" />
          <SectionDivider />
          <Section>
            <Article maxWidth="md">
              <TakeOffOthers albums={others} />
            </Article>
          </Section>
        </TabPane>
        <TabPane index={albums.edges.length + 2} currentTab={tab} renderNeighbor>
          <Jumbotron title="スピッツ以外の楽曲" />
          <SectionDivider />
          <Section>
            <Article maxWidth="md">
              {notSpitz.tunes.map((tune) => (
                <ProgramByTune key={tune.id} tune={tune} />
              ))}
            </Article>
          </Section>
        </TabPane>
      </BindKeyboardSwipeableViews>
      <SectionDivider />
      <AdBasic />
      <SectionDivider />
    </Layout>
  );
  */
}

export default TakeOff;

export const query = graphql`
  query TakeOff {
    albums: allSpitzAlbum(filter: { albumIdNum: { lte: 100 } }) {
      edges {
        node {
          ...albumItem
        }
      }
    }
    others: allSpitzAlbum(filter: { albumIdNum: { gte: 100 } }) {
      edges {
        node {
          ...albumItem
        }
      }
    }
    notSpitz: allTunes(corner: { eq: "漫遊前の一曲" }, artist: { ne: "スピッツ" }) {
      totalCount
      tunes {
        ...tuneFields
        program {
          id
          week
          slug
          image
          title
          subtitle
          date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }

  fragment albumItem on SpitzAlbum {
    id
    albumIdNum
    title
    year
    tunes {
      id
      index
      title
      program {
        id
        week
        slug
        image
        title
        subtitle
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
