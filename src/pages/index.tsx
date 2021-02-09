import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Layout from 'gatsby-theme-aoi/src/layouts/JumbotronLayout';
import loadable from '@loadable/component';
import Jumbotron from '../components/Jumbotron';
import NavigationBox from '../components/NavigationBox';
import ProgramItem from '../components/ProgramItem';
// import Ranks from '../components/index/Ranks';
import ContentBasis from '../components/ContentBasis';
import InView from '../components/InView';
//import Stats from '../components/index/Stat';
//import FallBack from '../components/FallBack';
import { StatsFallBack } from '../components/index/Stat';
import { AdInArticle } from '../components/Ads';
import { IndexQuery } from '../../graphql-types';
const Stats = loadable(() => import('../components/index/Stat'), {
  fallback: <StatsFallBack />,
});

function IndexPage() {
  const data = useStaticQuery<IndexQuery>(graphql`
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
  `);
  const images = data.allProgram.edges
    .map(({ node }) => node.fields?.image ?? undefined)
    .filter((image): image is string => Boolean(image));
  const jumbotron = (
    <Jumbotron
      title="SPITZ草野マサムネのロック大陸漫遊記 プレイリスト集"
      header="TOKYO-FM 全国38局ネットで放送中"
      imgUrl={images.length ? images[0] : undefined}
      height={346}
    />
  );

  return (
    <Layout maxWidth="md" componentViewports={{ BottomNav: false }} jumbotron={jumbotron}>
      <ContentBasis>
        <Stats />
      </ContentBasis>
      <ContentBasis>
        <List subheader={<ListSubheader>過去2か月の放送</ListSubheader>}>
          {data.allProgram.edges.map(({ node }) => (
            <ProgramItem key={node.week} program={node} />
          ))}
        </List>
      </ContentBasis>
      <ContentBasis>
        <NavigationBox />
      </ContentBasis>
      <ContentBasis>
        <InView>
          <AdInArticle />
        </InView>
      </ContentBasis>
      {/*<ContentBasis>
        <Ranks />
      </ContentBasis>*/}
    </Layout>
  );
}

export default IndexPage;
