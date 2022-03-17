import * as React from 'react';
import Box from '@mui/material/Box';
// import Socials from 'gatsby-theme-aoi/src/layout/Footer/Socials';
// import Copyrights from 'gatsby-theme-aoi/src/layout/Footer/Copyrights';
import { AdInFooter } from '../../../components/Ads';
import InView from '../../../components/InView';

function Footer() {
  return (
    <footer>
      <Box px={2} py={4} textAlign="center">
        <InView>
          <AdInFooter />
        </InView>
      </Box>
    </footer>
  );
}

export default Footer;
