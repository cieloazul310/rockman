import * as React from 'react';
import { Article } from '@cieloazul310/gatsby-theme-aoi';
import Socials from './Socials';
import Copyrights from './Copyrights';
import { AdInFooter } from '../../../components/Ads';
import InView from '../../../components/InView';

function Footer() {
  return (
    <footer>
      <InView>
        <AdInFooter />
      </InView>
      <Article maxWidth="md">
        <Socials />
        <Copyrights />
      </Article>
    </footer>
  );
}

export default Footer;
