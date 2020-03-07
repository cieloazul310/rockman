import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { ProgramPlaylist } from '../../graphql-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '.5em',
      fontWeight: theme.typography.fontWeightBold,
      paddingTop: theme.spacing(1),
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
      textAlign: 'center',
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.grey[700]
          : theme.palette.grey[300],
      color:
        theme.palette.type === 'dark'
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
      transition: theme.transitions.create(['width', 'background']),
      borderRight: '.5px solid silver',
      '&:last-child': {
        borderRight: 'none',
        flex: 1,
      },
    },
  })
);

interface Props {
  playlist: Pick<ProgramPlaylist, 'year'>[];
}

function SimpleYearsBar({ playlist }: Props) {
  const classes = useStyles();
  const years = React.useMemo(
    () =>
      playlist
        .map(tune => tune.year)
        .reduce((accum, curr) => {
          // [[197, 1], [198, 2]]
          const existedIndex = accum
            .map(d => d[0])
            .indexOf(Math.floor(curr / 10));
          if (existedIndex < 0) {
            return [...accum, [Math.floor(curr / 10), 1]];
          } else {
            accum[existedIndex][1] += 1;
            return accum;
          }
        }, [])
        .sort((a, b) => a[0] - b[0])
        .map(d => [d[0] * 10, d[1]]),
    [playlist]
  );
  return (
    <div className={classes.root}>
      <div className={classes.bar}>
        {years.map((years, index) => (
          <Tooltip key={index} arrow title={`${years[1]}曲`}>
            <div
              key={index}
              className={classes.barInner}
              style={{
                width: `${Math.round((years[1] * 100) / playlist.length)}%`,
              }}
            >
              <span>{years[0]}s</span>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

export default SimpleYearsBar;
