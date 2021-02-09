import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: theme.palette.background.paper,
    },
    divider: {
      paddingBottom: theme.spacing(2),
    },
  })
);

interface Props {
  children: React.ReactNode;
}

function Section({ children }: Props) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

export default Section;

export function SectionDivider() {
  const classes = useStyles();
  return <div className={classes.divider} />;
}
