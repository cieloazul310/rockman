import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Container from '@mui/material/Container';
import { Section, Article, Paragraph, AppLink } from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../layout';
import Jumbotron from '../components/Jumbotron';
import Seo from '../components/Seo';
import ProgramItem from '../components/ProgramList/Item';
import ProgramTop25 from '../components/ArtistItem/Top25';
import Stats from '../components/Stat';
import { AdInSectionDivider } from '../components/Ads';
import type { Program } from '../../types';

type IndexPageQueryData = {
  allProgram: {
    nodes: Pick<Program, 'id' | 'title' | 'week' | 'date' | 'slug' | 'image'>[];
  };
};

function IndexPage({ data }: PageProps<IndexPageQueryData>) {
  return (
    <Layout>
      <Jumbotron component="header" maxWidth="md" title="ロック大陸漫遊記 プレイリスト集" />
      <Section py={2}>
        <Container maxWidth="md">
          <Stats />
        </Container>
      </Section>
      <Section>
        <Article maxWidth="md">
          <Paragraph>
            <strong>ロック大陸漫遊記プレイリスト集</strong>は、TOKYO-FM他全国38局で放送されているラジオ番組
            <strong>「SPITZ 草野マサムネのロック大陸漫遊記」</strong>
            でオンエアされた楽曲を、放送回別、アーティスト別、選曲者別、コーナー別に表示したサイトです。
            <br />
            原則毎週日曜日 TOKYO-FM の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。
          </Paragraph>
          <Paragraph>
            <strong>SPITZ 草野マサムネのロック大陸漫遊記</strong>
            <br />
            <AppLink href="https://www.tfm.co.jp/manyuki/">https://www.tfm.co.jp/manyuki/</AppLink>
          </Paragraph>
          <Paragraph>
            全国38局放送時間一覧
            <br />
            <AppLink href="https://www.tfm.co.jp/manyuki/index.php?catid=3350">https://www.tfm.co.jp/manyuki/index.php?catid=3350</AppLink>
          </Paragraph>
        </Article>
      </Section>
      <Section>
        <Article maxWidth="md" disableGutters>
          <List subheader={<ListSubheader>過去2か月の放送</ListSubheader>}>
            {data.allProgram.nodes.map((node, index, arr) => (
              <ProgramItem key={node.week} program={node} last={index === arr.length - 1} />
            ))}
          </List>
        </Article>
      </Section>
      <AdInSectionDivider />
      <Section>
        <ProgramTop25 />
      </Section>
    </Layout>
  );
}

export default IndexPage;

export function Head() {
  return <Seo />;
}

export const query = graphql`
  {
    allProgram(sort: { week: DESC }, limit: 8) {
      nodes {
        id
        title
        week
        date(formatString: "YYYY-MM-DD")
        slug
        image
      }
    }
  }
`;
