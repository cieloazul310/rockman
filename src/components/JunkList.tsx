import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import WeekSummaryBox from './WeekSummaryBox';
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
      <WeekSummaryBox program={program} />
      {program.playlist.map((tune, index) => (
        <TuneCard tune={tune} key={tune.id} />
      ))}
    </div>
  );
}

export default JunkList;
