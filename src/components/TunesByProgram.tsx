import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import TuneCard from './TuneCard';
import { Program, ProgramPlaylist } from '../../graphql-types';

interface Props {
  program: Pick<Program, 'week' | 'date' | 'fields' | 'title' | 'playlist'>;
  filter?: (tune?: ProgramPlaylist) => boolean;
}

function TunesByProgram({ program, filter = () => true }: Props) {
  return (
    <Box py={2}>
      <Typography variant="subtitle2" component="span">
        第{program.week}回 {program.date}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        <AppLink to={program.fields.slug}>{program.title}</AppLink>
      </Typography>
      {program.playlist.filter(filter).map(tune => (
        <TuneCard key={tune.id} tune={tune} />
      ))}
    </Box>
  );
}

export default TunesByProgram;
