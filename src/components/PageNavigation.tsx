import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { SitePageContext } from '../../graphql-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.only('xs')]: {
        flexDirection: 'column',
      },
    },
    item: {
      width: '50%',
      flexShrink: 0,
      display: 'flex',
      [theme.breakpoints.only('xs')]: {
        width: '100%',
      },
    },
  })
);

interface Props {
  variant: 'program' | 'artist';
  pageContext: SitePageContext;
}

function PageNavigation({ variant, pageContext }: Props) {
  const { previous, next } = pageContext;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {previous ? (
        <div className={classes.item}>
          <Button
            component={GatsbyLink}
            variant="outlined"
            to={variant === 'program' ? previous?.fields?.slug ?? '#' : `/artist/${previous?.name}`}
          >
            <ArrowBackIcon />
            {variant === 'program' ? previous.title : previous.name}
          </Button>
        </div>
      ) : null}
      {next ? (
        <div className={classes.item}>
          <Button
            component={GatsbyLink}
            variant="outlined"
            to={variant === 'program' ? next?.fields?.slug ?? '#' : `/artist/${next?.name}`}
          >
            {variant === 'program' ? next.title : next.name}
            <ArrowForwardIcon />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default PageNavigation;
