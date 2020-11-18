import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    artwork: {},
    card: {},
  })
);

interface Props {
  title: string;
}

function Card({ title }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.artwork}></div>
      <div className={classes.card}>{title}</div>
    </div>
  );
}

export default Card;
