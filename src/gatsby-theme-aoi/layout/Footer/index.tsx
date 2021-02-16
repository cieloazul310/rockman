import * as React from 'react';
import Box from '@material-ui/core/Box';
import Socials from 'gatsby-theme-aoi/src/layout/Footer/Socials';
import Copyrights from 'gatsby-theme-aoi/src/layout/Footer/Copyrights';
import ContentBasis from '../../../components/ContentBasis';
import { AdInFooter } from '../../../components/Ads';
import InView from '../../../components/InView';

function Footer(): JSX.Element {
  return (
    <footer>
      <Box px={2} py={4} textAlign="center">
        <ContentBasis>
          <InView>
            <AdInFooter />
          </InView>
        </ContentBasis>
        <Socials />
        <Copyrights />
      </Box>
    </footer>
  );
}

export default Footer;
