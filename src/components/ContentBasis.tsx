import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 0),
    },
  })
);

interface Props {
  children: React.ReactNode;
}

function ContentBasis({ children }: Props): JSX.Element {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

export default ContentBasis;
