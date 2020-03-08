import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

interface Props {
  icon: any;
  label: string;
  to: string;
}

function NavigationBox({ label }: Props) {
  const classes = useStyles();
  return (
    <Box>
      <div></div>
      <div></div>
    </Box>
  );
}

export default NavigationBox;
