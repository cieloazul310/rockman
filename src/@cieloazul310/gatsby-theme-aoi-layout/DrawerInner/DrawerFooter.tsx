import * as React from 'react';
import Typography from '@mui/material/Typography';
import Article, { Paragraph, Link } from '../../../components/Article';

function DrawerFooter(): JSX.Element {
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
  );
}
export default DrawerFooter;
