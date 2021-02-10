import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import ArtistItem, { ArtistItemProps } from './ArtistItem';

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

interface Props {
  title: string;
  artists?: ArtistItemProps['artist'][] | null;
}

function ArtistItemContainer({ artists, title }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography>{title}</Typography>
      </div>
      <div className={classes.wrapper}>
        <Grid container={!isMobile} className={classes.container}>
          {artists
            ?.filter((artist) => artist?.name !== 'スピッツ')
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
