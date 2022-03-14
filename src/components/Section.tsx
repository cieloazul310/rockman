import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: theme.palette.background.paper,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 1),
      },
    },
    divider: {
      paddingBottom: theme.spacing(2),
    },
  })
);

interface Props {
  children: React.ReactNode;
}

function Section({ children }: Props): JSX.Element {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

export default Section;

export function SectionDivider(): JSX.Element {
  const classes = useStyles();
  return <div className={classes.divider} />;
}
