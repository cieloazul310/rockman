import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
