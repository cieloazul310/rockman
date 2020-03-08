import * as React from 'react';
//import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ProgramSummary from './ProgramSummary';
import TuneCard from './TuneCard';
import { QueriedProgram } from '../types';

//const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  program: QueriedProgram;
}

function JunkList({ program }: Props) {
  //const classes = useStyles();
  return (
    <div>
      <ProgramSummary program={program} defaultOpen />
      {program.playlist.map((tune, index) => (
        <TuneCard tune={tune} key={tune.id} />
      ))}
    </div>
  );
}

export default JunkList;
