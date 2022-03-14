import * as React from 'react';
import Tab, { TabProps } from '@mui/material/Tab';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textTransform: 'none',
    },
  })
);

function MuiTab(props: TabProps): JSX.Element {
  const classes = useStyles();
  return <Tab classes={classes} {...props} />;
}

export default MuiTab;
