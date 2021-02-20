import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useNationColor from '../utils/useNationColor';

interface StylesProps {
  background: string;
  color: string;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    nationLabel: {
      padding: '0 .2em',
      background: ({ background }) => background,
      color: ({ color }) => color,
    },
    label: {
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

interface Props {
  nation: string;
}

function NationLabel({ nation }: Props): JSX.Element {
  const [background, color] = useNationColor(nation);
  const classes = useStyles({ background, color });
  return (
    <div className={classes.nationLabel}>
      <Typography className={classes.label} variant="caption">
        {nation}
      </Typography>
    </div>
  );
}

export default NationLabel;
