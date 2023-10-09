import * as React from "react";
import type { ComponentMeta } from "@storybook/react";
import ArtistItem from "../components/ArtistItem/Item";
import ArtistItemContainer from "../components/ArtistItem/Container";
import { artists } from "./data/artists";

export default {
  title: "ArtistItem",
  component: ArtistItem,
  subcomponents: {
    ArtistItemContainer,
  },
} as ComponentMeta<typeof ArtistItem>;

export function Basic() {
  return <ArtistItemContainer artists={artists} title="Example" />;
}
