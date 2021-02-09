import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Maybe, ProgramPlaylist } from '../../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: theme.spacing(1, 0),
    },
    left: {
      display: 'flex',
      padding: theme.spacing(1),
    },
    right: {
      display: 'flex',
      padding: theme.spacing(1),
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      [theme.breakpoints.up('md')]: {
        width: theme.spacing(11),
        height: theme.spacing(11),
      },
    },
  })
);

interface Props {
  tune: Maybe<Pick<ProgramPlaylist, 'title' | 'artist' | 'indexInWeek' | 'youtube'>>;
}

function Tune({ tune }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Avatar
          className={classes.avatar}
          variant="square"
          src={tune?.youtube ? `https://i.ytimg.com/vi/${tune?.youtube}/0.jpg` : undefined}
        />
      </div>
      <div className={classes.right}>
        <Typography>{tune?.indexInWeek}.</Typography>
        <div>
          <Typography>{tune?.title}</Typography>
          <Typography variant="body2">{tune?.artist?.name}</Typography>
        </div>
      </div>
    </div>
  );
}

export default Tune;
