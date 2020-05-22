import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function DrawerFooter() {
  return (
    <Box p={2}>
      <Typography variant="subtitle2" gutterBottom>
        About
      </Typography>
      <Typography variant="body2">
        このページは、TOKYO-FM で放送されている SPITZ草野マサムネのロック大陸漫遊記のプレイリスト集です。
      </Typography>
    </Box>
  );
}
export default DrawerFooter;
