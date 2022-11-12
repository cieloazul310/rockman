import * as React from 'react';
import { Section, SectionDivider, Article, Paragraph, H3, H4, AppLink, ExternalLink } from '@cieloazul310/gatsby-theme-aoi';

import Layout from '../layout';
import Seo from '../components/Seo';
import Jumbotron from '../components/Jumbotron';
import { AdInSectionDivider } from '../components/Ads';

function About() {
  return (
    <Layout title="サイトについて">
      <Jumbotron title="サイトについて" />
      <SectionDivider />
      <Section>
        <Article maxWidth="md">
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
            <ExternalLink href="https://www.tfm.co.jp/manyuki/">https://www.tfm.co.jp/manyuki/</ExternalLink>
          </Paragraph>
          <Paragraph>
            全国38局放送時間一覧
            <br />
            <ExternalLink href="https://www.tfm.co.jp/manyuki/index.php?catid=3350">
              https://www.tfm.co.jp/manyuki/index.php?catid=3350
            </ExternalLink>
          </Paragraph>
          <H3>コンテンツ</H3>
          <Paragraph>
            このサイトは、<strong>放送回別</strong>オンエアリスト、<strong>アーティスト別</strong>オンエアリスト、
            <strong>テーマ別</strong>放送回、<strong>選曲者別</strong>
            オンエアリスト、<strong>漫遊前の一曲</strong>オンエアリスト、<strong>ちょっぴりタイムマシン</strong>
            オンエアリストのページで構成されています。
          </Paragraph>
          <H4>放送回別オンエアリスト</H4>
          <Paragraph>
            放送回ごとのオンエアリストです。プレイリスト左側の画像が YouTube へのリンクになっています。掲載している YouTube
            の動画は全てアーティスト公式、またはレーベル公式のものです。
          </Paragraph>
          <H4>放送回一覧</H4>
          <Paragraph>
            年別の放送回リストです。
            <br />
            <AppLink to="/programs/">放送回一覧を見る</AppLink>
          </Paragraph>
          <H4>アーティスト別オンエアリスト</H4>
          <Paragraph>
            アーティスト別のオンエアリストです。オンエアされた楽曲と放送回、同じ回に登場したアーティストを見ることができます。アーティスト毎の登場回数と曲数を計測しています。
          </Paragraph>
          <H4>テーマ別放送回</H4>
          <Paragraph>
            ロック大陸漫遊記の放送回を「ワン・アーティスト特集」「スピッツメンバーと漫遊記」など特定のテーマで分類したページです。
            <br />
            <AppLink to="/categories/">テーマ別放送回を見る</AppLink>
          </Paragraph>
          <H4>選曲者別オンエアリスト</H4>
          <Paragraph>
            ロック大陸漫遊記に登場したゲストやリクエストによる選曲を分類したページです。
            <br />
            <AppLink to="/selectors/">選曲者別オンエアリストを見る</AppLink>
          </Paragraph>
          <H4>漫遊前の一曲オンエアリスト</H4>
          <Paragraph>
            漫遊前の一曲は、放送の1曲目にスピッツ（稀にスピッツ以外）の楽曲をオンエアするコーナーです。漫遊前の一曲で流れた楽曲をスピッツのアルバム別に分類したページです。
            <br />
            <AppLink to="/takeoff/">漫遊前の一曲を見る</AppLink>
          </Paragraph>
          <H4>ちょっぴりタイムマシンオンエアリスト</H4>
          <Paragraph>
            ちょっぴりタイムマシンは、放送の最後にオンエアされる「最近ラジオでかかってない少し前の日本の楽曲を掘り起こそう」というコーナーです。ちょっぴりタイムマシンで放送された楽曲を年代別に分類したページです。
            <br />
            <AppLink to="/timemachine/">ちょっぴりタイムマシンオンエアリストを見る</AppLink>
          </Paragraph>
          <H3>サイトについて</H3>
          <Paragraph>
            <strong>ロック大陸漫遊記プレイリスト集</strong>
            <br />
            <AppLink to="/">https://cieloazul310.github.io/rockman/</AppLink>
          </Paragraph>
          <Paragraph>
            作者: <ExternalLink href="https://twitter.com/cieloazul310">@cieloazul310</ExternalLink>
            <br />
            ホームページ: <ExternalLink href="https://cieloazul310.github.io">水戸地図</ExternalLink>
            <br />
            公開日: 2021-02-14
          </Paragraph>
          <Paragraph>© 2022 cieloazul310 All rights reserved.</Paragraph>
        </Article>
      </Section>
      <AdInSectionDivider />
    </Layout>
  );
}

export default About;

export function Head() {
  return <Seo title="サイトについて" />;
}
