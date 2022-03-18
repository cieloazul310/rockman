/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation } from '@reach/router';
import InView from './InView';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdBasicInner() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <Box key={pathname} sx={{ overflow: 'hidden', px: 2, minWidth: 120, minHeight: 120, maxHeight: 160 }}>
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
    </Box>
  );
}

export function AdBasic() {
  return (
    <InView>
      <AdBasicInner />
    </InView>
  );
}

export function AdInSectionDivider() {
  return (
    <Box py={1} bgcolor={({ palette }) => (palette.mode === 'light' ? '#fafafa' : '#000')}>
      <AdBasic />
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
    <Box sx={{ overflow: 'hidden', px: 2, minWidth: 120 }} key={pathname}>
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
    </Box>
  );
}
