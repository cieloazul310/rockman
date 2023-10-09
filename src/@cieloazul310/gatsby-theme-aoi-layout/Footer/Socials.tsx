/* eslint react/jsx-props-no-spreading: warn */
import * as React from "react";
import Stack from "@mui/material/Stack";
import { SocialLink, useSiteMetadata } from "@cieloazul310/gatsby-theme-aoi";

function Socials() {
  const { social } = useSiteMetadata();
  return (
    <address>
      <Stack direction="row" spacing={1} justifyContent="center">
        {social.map(({ name, url }) => (
          <SocialLink key={name} name={name} url={url} />
        ))}
      </Stack>
    </address>
  );
}

export default Socials;
