import * as React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import getNationColor from '../utils/getNationColor';
import { ProgramPlaylist } from '../../graphql-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '.5em',
      fontWeight: theme.typography.fontWeightBold,
    },
    bar: {
      height: 16,
      display: 'flex',
      overflow: 'hidden',
      borderRadius: 8,
    },
    barInner: {
      display: 'flex',
      justifyContent: 'center',
      transition: theme.transitions.create(['width', 'background']),
      '&:last-child': {
        flex: 1,
      },
    },
  })
);

interface Props {
  playlist: Pick<ProgramPlaylist, "nation">[];
}

function SimpleNationBar({ playlist }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const isDark = theme.palette.type === 'dark';
  const nations = React.useMemo(
    () =>
      playlist
        .map(tune => tune.nation)
        .reduce(
          (accum, curr) =>
            accum.map(d => d[0]).indexOf(curr) < 0
              ? [
                  ...accum,
                  [curr, playlist.filter(d => d.nation === curr).length],
                ]
              : [...accum],
          []
        )
        .sort((a, b) => b[1] - a[1]),
    [playlist]
  );

  return (
    <div className={classes.root}>
      <div className={classes.bar}>
        {nations.map((nation, index) => (
          <Tooltip key={index} arrow title={`${nation[1]}曲`}>
            <div
              key={index}
              className={classes.barInner}
              style={{
                width: `${Math.round((nation[1] * 100) / playlist.length)}%`,
                background: getNationColor(nation[0], isDark),
                color: theme.palette.getContrastText(
                  getNationColor(nation[0], isDark)
                ),
              }}
            >
              <span>{nation[0]}</span>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

export default SimpleNationBar;
