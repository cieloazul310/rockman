import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(2),
    },
  })
);

function FallBack(props: CircularProgressProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress {...props} />
    </div>
  );
}

export default FallBack;
