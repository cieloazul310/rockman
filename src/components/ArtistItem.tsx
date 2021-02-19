import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import { Maybe, Artist } from '../../graphql-types';

interface StylesProps {
  image?: string | null;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: theme.spacing(1),
    },
    item: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
    },
    imageContainer: {
      width: '100%',
      display: 'flex',
      position: 'relative',
    },
    image: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 300 : 700],
      backgroundImage: ({ image }) => (image ? `url(${image})` : undefined),
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      paddingBottom: '100%',
      width: '100%',
    },
    label: {
      position: 'absolute',
      top: 0,
      left: 0,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.dark,
      padding: theme.spacing(0, 1),
    },
    name: {
      padding: theme.spacing(1, 0),
    },
  })
);

export interface ArtistItemProps {
  artist?: Maybe<Pick<Artist, 'name' | 'image' | 'tunesCount' | 'programCount' | 'slug'>>;
}

function isolateTouch(event: React.TouchEvent) {
  event.stopPropagation();
}

function ArtistItem({ artist }: ArtistItemProps): JSX.Element {
  const classes = useStyles({ image: artist?.image });
  return (
    <AppLink
      to={artist?.slug ?? '#'}
      color="inherit"
      className={classes.root}
      onTouchMove={isolateTouch}
      onTouchStart={isolateTouch}
      onTouchEnd={isolateTouch}
    >
      <div className={classes.item}>
        <div className={classes.imageContainer}>
          <div className={classes.image} />
          <div className={classes.label}>
            <Typography variant="caption">
              {artist?.tunesCount}曲/{artist?.programCount}回
            </Typography>
          </div>
        </div>
        <div className={classes.name}>
          <Typography variant="body2">{artist?.name}</Typography>
        </div>
      </div>
    </AppLink>
  );
}

export default ArtistItem;

export function ArtistItemSkeleton(): JSX.Element {
  const classes = useStyles({});
  return (
    <AppLink to="#" color="inherit" className={classes.root}>
      <div className={classes.item}>
        <div className={classes.imageContainer}>
          <div className={classes.image} />
          <div className={classes.label}>
            <Typography variant="caption">
              <Skeleton width={40} />
            </Typography>
          </div>
        </div>
        <div className={classes.name}>
          <Typography variant="body2">
            <Skeleton />
          </Typography>
        </div>
      </div>
    </AppLink>
  );
}
