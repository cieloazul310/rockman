import * as React from 'react';
import Tab, { TabProps } from '@material-ui/core/Tab';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textTransform: 'none',
    },
  })
);

function MuiTab(props: TabProps) {
  const classes = useStyles();
  return <Tab classes={classes} {...props} />;
}

export default MuiTab;
