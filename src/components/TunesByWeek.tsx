import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { AppLink } from 'gatsby-theme-typescript-material-ui/src/components/AppLink';
import TuneCard from './TuneCard';
import { Yaml, YamlPlaylist } from '../../graphql-types';

interface Props {
  program: Pick<Yaml, 'week' | 'date' | 'fields' | 'title' | 'playlist'>;
  filter?: (tune?: YamlPlaylist) => boolean;
}

function TunesByWeek({ program, filter = () => true }: Props) {
  return (
    <div>
      <Typography variant="subtitle2" component="span">
        第{program.week}回 {program.date}
      </Typography>
      <AppLink to={program.fields.slug}>
        <Typography variant="h6" component="h3" gutterBottom>
          {program.title}
        </Typography>
      </AppLink>
      {program.playlist.filter(filter).map(tune => (
        <TuneCard key={tune.id} tune={tune} />
      ))}
    </div>
  );
}

export default TunesByWeek;
