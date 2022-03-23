import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ExternalLink } from '@cieloazul310/gatsby-theme-aoi';

function DrawerFooter() {
  return (
    <Box p={2} sx={{ wordWrap: 'break-word' }}>
      <Typography variant="subtitle2" gutterBottom color="text.secondary" mb={2}>
        About
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>ロック大陸漫遊記プレイリスト集</strong>は、TOKYO-FM他全国38局で放送されているラジオ番組
        <strong>「SPITZ 草野マサムネのロック大陸漫遊記」</strong>
        でオンエアされた楽曲を、放送回別、アーティスト別、選曲者別、コーナー別に表示したサイトです。
      </Typography>
      <Typography variant="body2" paragraph>
        原則毎週日曜日 TOKYO-FM の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>SPITZ 草野マサムネのロック大陸漫遊記</strong>
        <br />
        <ExternalLink href="https://www.tfm.co.jp/manyuki/">https://www.tfm.co.jp/manyuki/</ExternalLink>
      </Typography>
      <Typography variant="body2" paragraph>
        全国38局放送時間一覧
        <br />
        <ExternalLink href="https://www.tfm.co.jp/manyuki/index.php?catid=3350">
          https://www.tfm.co.jp/manyuki/index.php?catid=3350
        </ExternalLink>
      </Typography>
    </Box>
  );
}
export default DrawerFooter;
