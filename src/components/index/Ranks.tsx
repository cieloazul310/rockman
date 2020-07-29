import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { useInView } from 'react-intersection-observer';
import FallBack from '../FallBack';
import { EdgesRank, TunesRank } from '../ArtistsRank';
import loadable from '@loadable/component';
const DecadesRank = loadable(() => import('../DecadesRank'), {
  resolveComponent: (component) => component.DecadesRank,
  fallback: <FallBack color="primary" />,
});
const NationsRank = loadable(() => import('../DecadesRank'), {
  resolveComponent: (component) => component.NationsRank,
  fallback: <FallBack color="secondary" />,
});

const useStyles = makeStyles((theme) =>
  createStyles({
    slideRoot: {
      //padding: theme.spacing(0, 3),
    },
    gridItem: {
      padding: theme.spacing(2),
    },
    gridPaper: {
      maxHeight: 'calc(90vh - 64px)',
      overflow: 'auto',
      webkitOverflowScrolling: 'touch',
      padding: theme.spacing(2, 0),
    },
  })
);

function Ranks() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div ref={ref}>
      {isMobile ? (
        <SwipeableViews enableMouseEvents resistance className={classes.slideRoot}>
          <div className={classes.gridItem}>
            <Paper className={classes.gridPaper}>
              <EdgesRank n={25} />
            </Paper>
          </div>
          <div className={classes.gridItem}>
            <Paper className={classes.gridPaper}>
              <TunesRank n={25} />
            </Paper>
          </div>
          <div className={classes.gridItem}>
            <Paper className={classes.gridPaper}>
              <DecadesRank />
            </Paper>
          </div>
          <div className={classes.gridItem}>
            <Paper className={classes.gridPaper}>
              <NationsRank />
            </Paper>
          </div>
        </SwipeableViews>
      ) : (
        <Grid container spacing={2}>
          <Grid className={classes.gridItem} item xs={12} sm={6}>
            <Paper className={classes.gridPaper}>
              <EdgesRank n={25} />
            </Paper>
          </Grid>
          <Grid className={classes.gridItem} item xs={12} sm={6}>
            <Paper className={classes.gridPaper}>
              <TunesRank n={25} />
            </Paper>
          </Grid>
          <Grid className={classes.gridItem} item xs={12} sm={6}>
            <Paper className={classes.gridPaper}>{inView ? <DecadesRank /> : null}</Paper>
          </Grid>
          <Grid className={classes.gridItem} item xs={12} sm={6}>
            <Paper className={classes.gridPaper}>{inView ? <NationsRank /> : null}</Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Ranks;
