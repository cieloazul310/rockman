import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Layout from '../layout';
import Jumbotron from '../components/Jumbotron';
import NavigationBox from '../components/NavigationBox';
import ProgramItem from '../components/ProgramItem';
// import ArtistItemContainer from '../components/ArtistItemContainer';
import ProgramTop25 from '../components/ProgramTop25';
import Section, { SectionDivider } from '../components/Section';
import Article, { Paragraph, Link } from '../components/Article';
import Stats from '../components/Stat';
import { AdBasic } from '../components/Ads';
// import { useProgramTop25 } from '../utils/graphql-hooks';
import { IndexQuery } from '../../graphql-types';

function IndexPage({ data }: PageProps<IndexQuery>): JSX.Element {
  // const top25 = useProgramTop25();
  const images = data.allProgram.edges
    .map(({ node }) => node.fields?.image ?? undefined)
    .filter((image): image is string => Boolean(image));

  return (
    <Layout>
      <Jumbotron title="ロック大陸漫遊記 プレイリスト集" footer="since 2018" image={images.length ? images[0] : undefined} />
      <SectionDivider />
      <Section>
        <Stats />
        <Article maxWidth="lg">
          <Paragraph>
            <strong>ロック大陸漫遊記プレイリスト集</strong>は、TOKYO-FM他全国38局で放送されているラジオ番組
            <strong>「SPITZ 草野マサムネのロック大陸漫遊記」</strong>
            でオンエアされた楽曲を、放送回別、アーティスト別、選曲者別、コーナー別に表示したサイトです。
          </Paragraph>
          <Paragraph>
            原則毎週日曜日 TOKYO-FM の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。
          </Paragraph>
          <Paragraph>
            <strong>SPITZ 草野マサムネのロック大陸漫遊記</strong>
            <br />
            <Link href="https://www.tfm.co.jp/manyuki/">https://www.tfm.co.jp/manyuki/</Link>
          </Paragraph>
          <Paragraph>
            全国38局放送時間一覧
            <br />
            <Link href="https://www.tfm.co.jp/manyuki/index.php?catid=3350" rel="noopener noreferrer">
              https://www.tfm.co.jp/manyuki/index.php?catid=3350
            </Link>
          </Paragraph>
        </Article>
      </Section>
      <SectionDivider />
      <Section>
        <List subheader={<ListSubheader>過去2か月の放送</ListSubheader>}>
          {data.allProgram.edges.map(({ node }, index, arr) => (
            <ProgramItem key={node.week} program={node} last={index === arr.length - 1} />
          ))}
        </List>
      </Section>
      <SectionDivider />
      <AdBasic />
      <SectionDivider />
      <Section>
        <ProgramTop25 />
      </Section>
      <SectionDivider />
      <Section>
        <NavigationBox />
      </Section>
    </Layout>
  );
}

export default IndexPage;

export const query = graphql`
  query Index {
    allProgram(sort: { fields: week, order: DESC }, limit: 8) {
      edges {
        node {
          id
          title
          week
          date(formatString: "YYYY-MM-DD")
          fields {
            slug
            image
          }
        }
      }
    }
  }
`;
