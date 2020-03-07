import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import AppLink from 'gatsby-theme-typescript-material-ui/src/components/AppLink';
import TuneCard from './TuneCard';
import { Program, ProgramPlaylist } from '../../graphql-types';

interface Props {
  program: Pick<Program, 'week' | 'date' | 'fields' | 'title' | 'playlist'>;
  filter?: (tune?: ProgramPlaylist) => boolean;
}

function TunesByProgram({ program, filter = () => true }: Props) {
  return (
    <div>
      <Typography variant="subtitle2" component="span">
        第{program.week}回 {program.date}
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom>
        <AppLink to={program.fields.slug}>{program.title}</AppLink>
      </Typography>
      {program.playlist.filter(filter).map(tune => (
        <TuneCard key={tune.id} tune={tune} />
      ))}
    </div>
  );
}

export default TunesByProgram;
