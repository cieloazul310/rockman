import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ArtistListItem from "../components/ArtistList/Item";
import ArtistListContainer from "../components/ArtistList/Container";
import { artists } from "./data/artists";

const meta: Meta<typeof ArtistListItem> = {
  title: "Components/ArtistItem",
  component: ArtistListItem,
};

export default meta;

type Story = StoryObj<typeof ArtistListItem>;

export const Basic: Story = {
  render: () => (
    <ArtistListContainer artists={artists} width={480} height={400} />
  ),
};
