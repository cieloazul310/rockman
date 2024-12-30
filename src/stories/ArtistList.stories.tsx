import * as React from "react";
import type { ComponentMeta } from "@storybook/react";
import ArtistListItem from "@/components/artist-list/item";
import ArtistListContainer from "@/components/artist-list/container";
import { artists } from "./data/artists";

export default {
  title: "ArtistListItem",
  component: ArtistListItem,
  subcomponents: {
    ArtistListContainer,
  },
} as ComponentMeta<typeof ArtistListItem>;

export function Basic() {
  return <ArtistListContainer artists={artists} width={480} height={400} />;
}
