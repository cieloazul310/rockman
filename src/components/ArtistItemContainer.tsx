import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import { Article } from '@cieloazul310/gatsby-theme-aoi';
// import Skeleton from '@mui/material/Skeleton';
import ArtistItem from './ArtistItem';
import { MinimumArtist } from '../../types';

function isolateTouch(event: React.TouchEvent) {
  event.stopPropagation();
}

type ArtistItemContainerProps = {
  title: string;
  artists: MinimumArtist[];
};

function ArtistItemContainer({ artists, title }: ArtistItemContainerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  return (
    <Container maxWidth="md" disableGutters sx={{ py: 1 }}>
      <Box p={1}>
        <Typography>{title}</Typography>
      </Box>
      <Box
        sx={{ overflowX: { xs: 'auto', sm: 'unset' }, WebkitOverflowScrolling: { xs: 'touch', sm: 'unset' } }}
        onTouchMove={isolateTouch}
        onTouchStart={isolateTouch}
        onTouchEnd={isolateTouch}
      >
        <Grid container={!isMobile} sx={{ display: { xs: 'flex', sm: undefined }, width: { xs: 'max-content', sm: 1 } }}>
          {artists
            .filter((artist) => artist.name !== 'スピッツ')
            .map((artist) => (
              <Grid
                sx={{ width: { xs: '33vw', sm: 'unset' } }}
                item={!isMobile || undefined}
                key={artist?.name}
                sm={!isMobile ? 2 : undefined}
              >
                <ArtistItem artist={artist} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default ArtistItemContainer;
/*
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
*/
