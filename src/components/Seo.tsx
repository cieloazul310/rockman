import * as React from "react";
import { Seo, type SeoProps } from "@cieloazul310/gatsby-theme-aoi";
import ogImage from "../assets/ogimage.png";

function RockmanSeo({ image, ...props }: SeoProps) {
  return <Seo image={image ?? ogImage} {...props} />;
}

export default RockmanSeo;
