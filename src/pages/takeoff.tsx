import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import { Section, SectionWrapper, Article } from '@cieloazul310/gatsby-theme-aoi';
import TabPageTemplate from '../layout/TabTemplate';
import Seo from '../components/Seo';
import Jumbotron from '../components/Jumbotron';
import TakeOffAlbum, { TakeOffOthers } from '../components/TakeOffAlbum';
import ProgramByTune from '../components/Tunes/ProgramByTune';
import type { Program, SpitzAlbum, SpitzTune, TuneItemFragment } from '../../types';

type TakeOffQueryData = {
  albums: {
    nodes: (Pick<SpitzAlbum, 'id' | 'albumIdNum' | 'title' | 'year'> & {
      tunes: (SpitzTune & {
        program: Pick<Program, 'id' | 'date' | 'slug' | 'title' | 'subtitle' | 'week' | 'image'>[];
      })[];
    })[];
  };
  others: {
    nodes: (Pick<SpitzAlbum, 'id' | 'albumIdNum' | 'title' | 'year'> & {
      tunes: (SpitzTune & {
        program: Pick<Program, 'id' | 'date' | 'slug' | 'title' | 'subtitle' | 'week' | 'image'>[];
      })[];
    })[];
  };
  notSpitz: {
    totalCount: number;
    tunes: (TuneItemFragment & {
      program: Pick<Program, 'id' | 'date' | 'slug' | 'title' | 'subtitle' | 'week' | 'image'>;
    })[];
  };
};

function TakeOff({ data }: PageProps<TakeOffQueryData>) {
  const { albums, others, notSpitz } = data;
  const items: { title: string; oaLength?: number; tunesLength?: number }[] = React.useMemo(() => {
    const albumItem = albums.nodes.map((node) => ({
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
        ...albums.nodes.map((node) => (
          <SectionWrapper component="article" key={node.id}>
            <Jumbotron
              component="header"
              title={node.title}
              headerText={node.year}
              footerText={`${node.tunes.filter((tune) => tune.program.length).length} / ${node.tunes.length}曲`}
            />
            <Section component="main">
              <Article maxWidth="md">
                <TakeOffAlbum album={node} />
              </Article>
            </Section>
          </SectionWrapper>
        )),
        <SectionWrapper key="others" component="article">
          <Jumbotron title="その他の楽曲" component="header" />
          <Section component="main">
            <Article maxWidth="md">
              <TakeOffOthers albums={others} />
            </Article>
          </Section>
        </SectionWrapper>,
        <SectionWrapper key="notSpitz" component="article">
          <Jumbotron title="スピッツ以外の楽曲" component="header" />
          {notSpitz.tunes.map((tune) => (
            <ProgramByTune key={tune.id} tune={tune} />
          ))}
        </SectionWrapper>,
      ]}
    </TabPageTemplate>
  );
}

export default TakeOff;

export function Head() {
  return <Seo title="漫遊前の一曲" />;
}

export const query = graphql`
  query TakeOff {
    albums: allSpitzAlbum(filter: { albumIdNum: { lte: 100 } }, sort: { albumIdNum: ASC }) {
      nodes {
        ...albumItem
      }
    }
    others: allSpitzAlbum(filter: { albumIdNum: { gte: 100 } }, sort: { albumIdNum: ASC }) {
      nodes {
        ...albumItem
      }
    }
    notSpitz: allTunes(corner: { eq: "漫遊前の一曲" }, artist: { ne: "スピッツ" }) {
      totalCount
      tunes {
        ...tuneItem
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
