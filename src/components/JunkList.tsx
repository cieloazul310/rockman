import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Yaml } from '../../graphql-types';



interface Props {
  program: Exclude<Partial<Yaml>, "children" | "internal">;
}

function JunkList({ program }: Props) {
  return (
    <Paper>
      <Box px={2} py={4}>
        <Typography variant="subtitle2" component="span">
          第{program.week}週
        </Typography>
        <Typography variant="subtitle2" component="span">
          {program.date}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {program.title}
        </Typography>
        {program.playlist.map((tune, index) => (
          <Box key={tune.id} py={2}>
            {tune.corner ? (
              <Typography variant="subtitle2">{tune.corner}</Typography>
            ) : null}
            <Typography variant="body1">
              M{index + 1}. {tune.title} / {tune.artist}
            </Typography>
            {tune.selector !== '草野マサムネ' ? (
              <Typography variant="body2">{tune.selector}による選曲</Typography>
            ) : null}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default JunkList;
