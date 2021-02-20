import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import TextSpan from './TextSpan';
import NationLabel from './NationLabel';
import { TuneIcon } from '../icons';
import { useAvatarStyles } from '../styles';
import { Maybe, ProgramPlaylist, Artist } from '../../graphql-types';

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
    avatarContainer: {
      position: 'relative',
    },
    nationLabel: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  })
);

export interface TuneProps {
  tune: Maybe<
    Pick<ProgramPlaylist, 'id' | 'title' | 'indexInWeek' | 'corner' | 'selector' | 'year' | 'youtube' | 'nation'> & {
      artist?: Maybe<Pick<Artist, 'name' | 'slug'>>;
    }
  >;
}

function Tune({ tune }: TuneProps): JSX.Element {
  const classes = useStyles();
  const avatarClass = useAvatarStyles();
  const avatar = (
    <div className={classes.avatarContainer}>
      <Avatar
        className={avatarClass.avatar}
        variant="square"
        src={tune?.youtube ? `https://i.ytimg.com/vi/${tune?.youtube}/0.jpg` : undefined}
      >
        <TuneIcon />
      </Avatar>
      <div className={classes.nationLabel}>
        <NationLabel nation={tune?.nation ?? ''} />
      </div>
    </div>
  );
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        {tune?.youtube ? (
          <a href={`https://youtu.be/${tune?.youtube}`} target="_blank" rel="noopener noreferrer">
            {avatar}
          </a>
        ) : (
          avatar
        )}
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
              {tune?.artist?.name !== 'スピッツ' ? (
                <AppLink to={tune?.artist?.slug ?? '#'} color="inherit">
                  {tune?.artist?.name}
                </AppLink>
              ) : (
                'スピッツ'
              )}
            </TextSpan>
            <TextSpan color="textSecondary">{`(${tune?.year})`}</TextSpan>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Tune;

export function TuneSkeleton(): JSX.Element {
  const classes = useStyles({});
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
