import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import TextSpan from '../TextSpan';
import { TuneIcon } from '../../icons';
import { useAvatarStyles } from '../../styles';
import { Maybe, ProgramPlaylist, Artist } from '../../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: theme.spacing(1, 0),
    },
    left: {
      display: 'flex',
      padding: theme.spacing(0, 1),
      alignItems: 'center',
      flexShrink: 0,
    },
    right: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0, 1),
      flexGrow: 1,
    },
  })
);

export interface TuneProps {
  tune: Maybe<
    Pick<ProgramPlaylist, 'title' | 'indexInWeek' | 'corner' | 'selector' | 'year' | 'youtube'> & { artist?: Maybe<Pick<Artist, 'name'>> }
  >;
}

function Tune({ tune }: TuneProps) {
  const classes = useStyles();
  const avatarClass = useAvatarStyles();
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Avatar
          className={avatarClass.avatar}
          variant="square"
          src={tune?.youtube ? `https://i.ytimg.com/vi/${tune?.youtube}/0.jpg` : undefined}
        >
          <TuneIcon />
        </Avatar>
      </div>
      <div className={classes.right}>
        <Typography variant="body2" color="textSecondary">
          <TextSpan>{`M${tune?.indexInWeek}.`}</TextSpan>
          <TextSpan>{tune?.corner}</TextSpan>
          {tune?.selector && tune.selector !== '草野マサムネ' ? <TextSpan>{tune.selector}選曲</TextSpan> : null}
        </Typography>
        <div>
          <Typography>{tune?.title}</Typography>
          <Typography variant="body2">
            <TextSpan>
              <AppLink to={`/artist/${tune?.artist?.name}`} color="inherit">
                {tune?.artist?.name}
              </AppLink>
            </TextSpan>
            <TextSpan color="textSecondary">{`(${tune?.year})`}</TextSpan>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Tune;

export function TuneSkeleton() {
  const classes = useStyles();
  const avatarClass = useAvatarStyles();
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Avatar className={avatarClass.avatar} variant="square" src={undefined}>
          <TuneIcon />
        </Avatar>
      </div>
      <div className={classes.right}>
        <Typography variant="body2" color="textSecondary">
          <TextSpan>
            <Skeleton width={100} />
          </TextSpan>
        </Typography>
        <div>
          <Typography>
            <Skeleton width={160} />
          </Typography>
          <Typography variant="body2">
            <TextSpan>
              <Skeleton width={100} />
            </TextSpan>
          </Typography>
        </div>
      </div>
    </div>
  );
}
