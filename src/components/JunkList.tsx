import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ProgramSummary from './ProgramSummary';
import TuneCard from './TuneCard';
import { Program } from '../../graphql-types';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  program: Exclude<Partial<Program>, 'children' | 'internal'>;
}

function JunkList({ program }: Props) {
  const classes = useStyles();
  return (
    <div>
      <ProgramSummary program={program} />
      {program.playlist.map((tune, index) => (
        <TuneCard tune={tune} key={tune.id} />
      ))}
    </div>
  );
}

export default JunkList;
