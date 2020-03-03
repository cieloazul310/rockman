import * as React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import SimpleNationBar from './SimpleNationBar';
import TuneCard from './TuneCard';
import { Yaml } from '../../graphql-types';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  program: Exclude<Partial<Yaml>, 'children' | 'internal'>;
}

function JunkList({ program }: Props) {
  const classes = useStyles();
  return (
    <div>
      <Box py={6}>
        <Typography variant="subtitle2" component="span">
          第{program.week}回 {program.date}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {program.title}
        </Typography>
        {program.subtitle ? (
          <Typography variant="subtitle1" gutterBottom>
            {program.subtitle}
          </Typography>
        ) : null}
        {program.categories.length || program.guests.length ? (
          <div>
            {program.categories.map(category => (
              <Chip key={category} label={category} color="primary" />
            ))}
            {program.guests.map(guest => (
              <Chip key={guest} label={guest} icon={<FaceIcon />} />
            ))}
          </div>
        ) : null}
        <SimpleNationBar playlist={program.playlist} />
      </Box>
      {program.playlist.map((tune, index) => (
        <TuneCard tune={tune} key={tune.id} />
      ))}
    </div>
  );
}

export default JunkList;
