/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useLocation } from '@reach/router';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdInDrawer() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <Box p={2} overflow="hidden" key={pathname}>
      <Typography variant="caption">[ad]</Typography>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7323207940463794"
        data-ad-slot="2525174843"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </Box>
  );
}

export function AdInArticle() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <Box px={1} py={2} overflow="hidden" key={pathname}>
      <Typography variant="caption">[ad]</Typography>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-7323207940463794"
        data-ad-slot="9174058264"
      />
    </Box>
  );
}

export function AdInFooter() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <Box px={1} py={2} overflow="hidden" key={pathname}>
      <Typography variant="caption">[ad]</Typography>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7323207940463794"
        data-ad-slot="3332658358"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </Box>
  );
}
