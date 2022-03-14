import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Article, Paragraph, ExternalLink } from '@cieloazul310/gatsby-theme-aoi';

function DrawerFooter() {
  return (
    <Article>
      <Typography variant="subtitle2" gutterBottom>
        About
      </Typography>
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
    </Article>
  );
}
export default DrawerFooter;
