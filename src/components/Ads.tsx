/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useLocation } from '@reach/router';
import InView from './InView';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
      padding: theme.spacing(0, 2),
      minWidth: 120,
    },
    inArticle: {
      minHeight: 120,
      maxHeight: 160,
    },
  })
);

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdBasicInner(): JSX.Element {
  const { pathname } = useLocation();
  const classes = useStyles();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <div key={pathname} className={clsx(classes.root, classes.inArticle)}>
      <Typography variant="caption">[ad]</Typography>
      <ins
        key={pathname}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7323207940463794"
        data-ad-slot="3976266583"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdBasic(): JSX.Element {
  return (
    <InView>
      <AdBasicInner />
    </InView>
  );
}

export function AdInFooter(): JSX.Element {
  const { pathname } = useLocation();
  const classes = useStyles();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <div className={classes.root} key={pathname}>
      <Typography variant="caption" component="p" align="left">
        [ad]
      </Typography>
      <ins
        key={pathname}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7323207940463794"
        data-ad-slot="5664752779"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
