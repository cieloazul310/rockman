import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import YoutubeIcon from '@material-ui/icons/YouTube';
import Skeleton from '@material-ui/lab/Skeleton';
import { ArtistIcon, SelectorIcon } from '../icons';
import NationAvatar from './NationAvatar';
import { ProgramPlaylist } from '../../graphql-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    cardThumbnail: {
      flex: 'auto',
      maxWidth: '30%',
      minWidth: 100,
      backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
      display: 'flex',
    },
    cardThumbnailLink: {
      flex: 1,
      display: 'flex',
      overflow: 'hidden',
    },
    cardThumbnailInner: {
      flex: 1,
      transition: theme.transitions.create('transform'),
      '&:hover': {
        transform: 'scale(1.2)',
      },
    },
    cardRight: {
      flexGrow: 1,
    },
    cardHead: {
      padding: theme.spacing(1, 2, 0, 2),
    },
    skeleton: {
      flex: 1,
      height: '100%',
    },
  })
);

interface Props {
  tune: Pick<ProgramPlaylist, 'artist' | 'youtube' | 'title' | 'selector' | 'indexInWeek' | 'corner' | 'nation' | 'year'> &
    Partial<ProgramPlaylist>;
}

function TuneCard({ tune }: Props) {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.cardThumbnail}>
          {tune.youtube ? (
            <a className={classes.cardThumbnailLink} href={`https://youtu.be/${tune.youtube}`} target="_blank" rel="noopener noreferrer">
              <CardMedia
                className={classes.cardThumbnailInner}
                image={`https://i.ytimg.com/vi/${tune.youtube}/0.jpg`}
                title={`${tune.artist}の${tune.title}をYouTubeで視聴する`}
              />
            </a>
          ) : (
            <Skeleton variant="rect" className={classes.skeleton} />
          )}
        </div>
        <div className={classes.cardRight}>
          <div className={classes.cardHead}>
            <Typography variant="body2">
              M{tune.indexInWeek}. {tune.corner} {tune.selector !== '草野マサムネ' ? `${tune.selector}選曲` : null}
            </Typography>
          </div>
          <CardHeader avatar={<NationAvatar nation={tune.nation ?? ''} />} title={tune.title} subheader={`${tune.artist} (${tune.year})`} />
          <CardActions>
            <Tooltip title={`${tune.artist}の曲をブラウズ`}>
              <IconButton component={GatsbyLink} to={`/artist/${tune.artist}`}>
                <ArtistIcon />
              </IconButton>
            </Tooltip>
            {tune.selector !== '草野マサムネ' ? (
              <Tooltip title={`${tune.selector}選曲の曲をブラウズ`}>
                <IconButton component={GatsbyLink} to="/selectors/" state={{ selector: tune.selector }}>
                  <SelectorIcon />
                </IconButton>
              </Tooltip>
            ) : null}
            {tune.youtube ? (
              <Tooltip title="YouTube で視聴する">
                <IconButton href={`https://youtu.be/${tune.youtube}`} target="_blank" rel="noopener noreferrer">
                  <YoutubeIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </CardActions>
        </div>
      </Card>
    </div>
  );
}

export default TuneCard;

export function TuneCardSkeleton() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.cardThumbnail}>
          <Skeleton variant="rect" className={classes.skeleton} />
        </div>
        <div className={classes.cardRight}>
          <div className={classes.cardHead}>
            <Typography variant="body2">
              <Skeleton variant="text" />
            </Typography>
          </div>
          <CardHeader
            avatar={<Skeleton variant="circle" width={40} height={40} />}
            title={<Skeleton variant="text" />}
            subheader={<Skeleton variant="text" />}
          />
          <CardActions>
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="circle" width={40} height={40} />
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
