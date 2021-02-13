import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Layout from '../layout/TabLayout';
import TabPane from '../layout/TabPane';
import Jumbotron from '../components/Jumbotron';
import Section, { SectionDivider } from '../components/Section';
import TakeOffAlbum, { TakeOffOthers } from '../components/TakeOffAlbum';
import { TuneByProgram } from '../components/TunesByProgram';
import NavigationBox from '../components/NavigationBox';
import { AdInArticle } from '../components/Ads';
import { TakeOffQuery } from '../../graphql-types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

function TakeOff({ data }: PageProps<TakeOffQuery>) {
  const { albums, others, notSpitz } = data;
  const [tab, setTab] = React.useState(0);
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setTab(newValue);
  };
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
          {albums.edges.map(({ node }) => (
            <Tab key={node.id} label={node.title} />
          ))}
          <Tab label="その他の楽曲" />
          <Tab label="スピッツ以外の楽曲" />
        </Tabs>
      }
    >
      <BindKeyboardSwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance animateHeight>
        {albums.edges.map(({ node }, index) => (
          <TabPane key={index} index={index} value={tab} disableGutters>
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
        <TabPane index={albums.edges.length} value={tab} disableGutters>
          <Jumbotron title="その他の楽曲" />
          <SectionDivider />
          <Section>
            <TakeOffOthers albums={others} />
          </Section>
        </TabPane>
        <TabPane index={albums.edges.length + 1} value={tab} disableGutters>
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
