import * as React from "react";
import { Article } from "@cieloazul310/gatsby-theme-aoi";
import { AdInFooter } from "@/components/ads";
import InView from "@/components/in-view";
import Socials from "./Socials";
import Copyrights from "./Copyrights";

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
