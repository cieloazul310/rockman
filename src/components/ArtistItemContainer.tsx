import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Skeleton from '@mui/material/Skeleton';
import ArtistItem, { ArtistItemSkeleton, ArtistItemProps } from './ArtistItem';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(1, 0),
    },
    header: {
      padding: theme.spacing(1),
    },
    wrapper: {
      [theme.breakpoints.only('xs')]: {
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      },
    },
    container: {
      [theme.breakpoints.only('xs')]: {
        display: 'flex',
        width: 'max-content',
      },
    },
    item: {
      [theme.breakpoints.only('xs')]: {
        width: '33vw',
      },
    },
  })
);

function isolateTouch(event: React.TouchEvent) {
  event.stopPropagation();
}

interface Props {
  title: string;
  artists: ArtistItemProps['artist'][];
}

function ArtistItemContainer({ artists, title }: Props): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography>{title}</Typography>
      </div>
      <div className={classes.wrapper} onTouchMove={isolateTouch} onTouchStart={isolateTouch} onTouchEnd={isolateTouch}>
        <Grid container={!isMobile} className={classes.container}>
          {artists
            .filter((artist) => artist?.name !== 'スピッツ')
            .map((artist) => (
              <Grid className={classes.item} item={!isMobile || undefined} key={artist?.name} sm={!isMobile ? 2 : undefined}>
                <ArtistItem artist={artist} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default ArtistItemContainer;

export function ArtistItemContainerSkeleton({ length }: { length: number }): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography>
          <Skeleton width={100} />
        </Typography>
      </div>
      <div className={classes.wrapper}>
        <Grid container={!isMobile} className={classes.container}>
          {Array.from({ length }).map((_, index) => (
            <Grid className={classes.item} item={!isMobile || undefined} key={index.toString()} sm={!isMobile ? 2 : undefined}>
              <ArtistItemSkeleton />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
