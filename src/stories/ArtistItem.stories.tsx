import * as React from "react";
import type { ComponentMeta } from "@storybook/react";
import ArtistItem from "@/components/artist-item/item";
import ArtistItemContainer from "@/components/artist-item/container";
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
