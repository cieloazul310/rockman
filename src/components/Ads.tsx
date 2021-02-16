/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useLocation } from '@reach/router';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
      padding: theme.spacing(0, 2),
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

export function AdInDrawer(): JSX.Element {
  const { pathname } = useLocation();
  const classes = useStyles();
  React.useEffect(() => {
    if (window) {
      window.onload = () => {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      };
    }
  }, [pathname]);
  return (
    <div key={pathname} className={classes.root}>
      <Typography variant="caption">[ad]</Typography>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7323207940463794"
        data-ad-slot="2525174843"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdInArticle(): JSX.Element {
  const { pathname } = useLocation();
  const classes = useStyles();
  React.useEffect(() => {
    if (window) {
      window.onload = () => {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      };
    }
  }, [pathname]);
  return (
    <div className={clsx(classes.root, classes.inArticle)} key={pathname}>
      <Typography variant="caption" component="p" align="left">
        [ad]
      </Typography>
      <ins
        key={pathname}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-7323207940463794"
        data-ad-slot="9174058264"
      />
    </div>
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
        data-ad-slot="3332658358"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
