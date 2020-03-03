import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import getNationColor from '../utils/getNationColor';
import { YamlPlaylist } from '../../graphql-types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    fontSize: '.5em',
    fontWeight: theme.typography.fontWeightBold,
    padding: `${theme.spacing(2)}px 0`
  },
  bar: {
    height: 16,
    display: 'flex'
  },
  barInner: {
    display: 'flex',
    justifyContent: 'center',
    transition: theme.transitions.create(['width', 'background'])
  }
}))

interface Props {
  playlist: YamlPlaylist[];
}

function SimpleNationBar({ playlist }: Props) {
  const classes = useStyles();
  const nations = React.useMemo(() => playlist
    .map(tune => tune.nation)
    .reduce(
      (accum, curr) =>
        accum.map(d => d[0]).indexOf(curr) < 0
          ? [...accum, [curr, playlist.filter(d => d.nation === curr).length]]
          : [...accum],
      []
    )
    .sort((a, b) => b[1] - a[1])
  ,[playlist]);

  return (
    <div className={classes.root}>
      <div className={classes.bar}>
        {nations.map((nation, index) => (
          <div key={index} className={classes.barInner} style={{ width: `${Math.round(nation[1] * 100 / playlist.length)}%`, background: getNationColor(nation[0]) }}>
            <span>{nation[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleNationBar;