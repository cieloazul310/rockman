import * as React from 'react';
import Section from '../src/components/Section';
import Article, { ArticleSection, ArticleTitle, Paragraph, H3, H4, Link } from '../src/components/Article';

const stories = { title: 'Article' };
export default stories;

function Item() {
  return (
    <ArticleSection>
      <H3>漫遊前の一曲</H3>
      <Paragraph>
        原則毎週日曜日 TOKYO-FM
        の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。原則毎週日曜日 TOKYO-FM
        の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。
      </Paragraph>
    </ArticleSection>
  );
}

function ItemH4() {
  return (
    <ArticleSection>
      <H3>漫遊前の一曲</H3>
      <Paragraph>
        原則毎週日曜日 TOKYO-FM の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。
      </Paragraph>
      <H4>放送回別オンエアリスト</H4>
      <Paragraph>
        原則毎週日曜日 TOKYO-FM の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。
      </Paragraph>
      <H4>放送回別オンエアリスト</H4>
      <Paragraph>
        原則毎週日曜日 TOKYO-FM の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。
      </Paragraph>
      <H4>放送回別オンエアリスト</H4>
      <Paragraph>
        原則毎週日曜日 TOKYO-FM の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。
      </Paragraph>
    </ArticleSection>
  );
}

export function Basic(): JSX.Element {
  return (
    <Section>
      <Article>
        <ArticleSection>
          <ArticleTitle>ロック大陸漫遊記プレイリスト集</ArticleTitle>
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
        </ArticleSection>
      </Article>
    </Section>
  );
}

export function Many(): JSX.Element {
  return (
    <Section>
      <Article>
        <ArticleSection>
          <ArticleTitle>ロック大陸漫遊記プレイリスト集</ArticleTitle>
          <Paragraph>
            <strong>ロック大陸漫遊記プレイリスト集</strong>は、TOKYO-FM他全国38局で放送されているラジオ番組
            <strong>「SPITZ 草野マサムネのロック大陸漫遊記」</strong>
            でオンエアされた楽曲を、放送回別、アーティスト別、選曲者別、コーナー別に表示したサイトです。
          </Paragraph>
        </ArticleSection>
        <Item />
        <Item />
        <ItemH4 />
      </Article>
    </Section>
  );
}
