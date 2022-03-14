import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

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
