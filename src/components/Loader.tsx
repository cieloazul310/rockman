import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

interface StylesProps {
  height: number;
}

const useStyles = makeStyles<Theme, StylesProps>(() =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: ({ height }) => height,
    },
  })
);

interface Props {
  height?: number;
}

function Loader({ height = 120 }: Props): JSX.Element {
  const classes = useStyles({ height });
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}

Loader.defaultProps = {
  height: 120,
};

export default Loader;
