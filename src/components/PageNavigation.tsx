import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    prev: {
      textAlign: 'left',
      padding: theme.spacing(1),
    },
    next: {
      textAlign: 'right',
      padding: theme.spacing(1),
    },
  })
);

interface NavigationProps {
  to: string;
  label: string;
}

interface Props {
  prev?: NavigationProps;
  next?: NavigationProps;
}

function PageNavigation({ prev, next }: Props) {
  console.log(prev, next);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {prev ? (
        <div className={classes.prev}>
          <Button
            component={GatsbyLink}
            variant="outlined"
            to={prev.to}
          >
            <ArrowBackIcon />
            {prev.label}
          </Button>
        </div>
      ) : null}
      {next ? (
        <div className={classes.next}>
          <Button
            component={GatsbyLink}
            variant="outlined"
            to={next.to}
          >
            {next.label}
            <ArrowForwardIcon />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default PageNavigation;

export function PageNavigationSkeleton() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.prev}>
        <Button variant="outlined">
          <Skeleton variant="circle" width={24} height={24} />
          <Skeleton variant="text" width={120} />
        </Button>
      </div>
      <div className={classes.next}>
        <Button variant="outlined">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="circle" width={24} height={24} />
        </Button>
      </div>
    </div>
  );
}
