import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
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
import Jumbotron from '../components/Jumbotron';
import Section, { SectionDivider } from '../components/Section';
import Article, { Paragraph } from '../components/Article';
import TakeOffAlbum, { TakeOffOthers } from '../components/TakeOffAlbum';
import { TuneByProgram } from '../components/TunesByProgram';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import { useParseHash, useHash } from '../utils/useHash';
import { TakeOffQuery } from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function TakeOff({ data }: PageProps<TakeOffQuery>) {
  const { albums, others, notSpitz } = data;
  const titles = React.useMemo(() => ['', ...albums.edges.map(({ node }) => node.title), 'その他の楽曲', 'スピッツ以外の楽曲'], [albums]);
  const initialTab = useParseHash(titles);
  const [tab, setTab] = React.useState(initialTab);
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
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
        <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
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
        <TabPane index={0} value={tab} disableGutters>
          <Jumbotron title="漫遊前の一曲" />
          <SectionDivider />
          <Section>
            <Article>
              <Paragraph>
                漫遊前の一曲は、放送の1曲目にスピッツ（稀にスピッツ以外）の楽曲をオンエアするコーナーです。漫遊前の一曲で流れた楽曲をスピッツのアルバム別に分類したページです。
              </Paragraph>
              <List>
                {albums.edges.map(({ node }, index) => (
                  <ListItem key={node.id} button onClick={onItemClicked(index + 1)}>
                    <ListItemText primary={node.title} secondary={node.year} />
                    <Typography variant="button" component="span">
                      {node.tunes.filter((tune) => tune.append?.length).length}/{node.tunes.length}曲
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
          <TabPane key={index} index={index + 1} value={tab} disableGutters>
            <Jumbotron
              title={node.title}
              header={node.year}
              footer={`${node.tunes.filter((tune) => tune.append?.length).length}/${node.tunes.length}曲`}
            />
            <SectionDivider />
            <Section>
              <TakeOffAlbum album={node} />
            </Section>
          </TabPane>
        ))}
        <TabPane index={albums.edges.length + 1} value={tab} disableGutters>
          <Jumbotron title="その他の楽曲" />
          <SectionDivider />
          <Section>
            <TakeOffOthers albums={others} />
          </Section>
        </TabPane>
        <TabPane index={albums.edges.length + 2} value={tab} disableGutters>
          <Jumbotron title="スピッツ以外の楽曲" />
          <SectionDivider />
          <Section>
            {notSpitz?.map((tune) => (
              <TuneByProgram key={tune?.id} tune={tune} />
            ))}
          </Section>
        </TabPane>
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
      year
      title
      week
      youtube
      selector
      nation
      indexInWeek
      id
      corner
      artist {
        name
      }
      program {
        week
        title
        date(formatString: "YYYY-MM-DD")
        fields {
          slug
        }
      }
    }
  }

  fragment albumItem on spitzAlbum {
    id
    albumIdNum
    title
    year
    tunes {
      id
      index
      title
      append {
        title
        week
        id
        date(formatString: "YYYY-MM-DD")
        fields {
          slug
        }
      }
    }
  }
`;
