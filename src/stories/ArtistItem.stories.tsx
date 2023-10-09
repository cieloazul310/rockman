import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ArtistItem from "../components/ArtistItem/Item";
import ArtistItemContainer from "../components/ArtistItem/Container";
import { artists } from "./data/artists";

const meta: Meta<typeof ArtistItem> = {
  title: "Components/ArtistItem",
  component: ArtistItem,
};

export default meta;

type Story = StoryObj<typeof ArtistItem>;

export const Basic: Story = {
  render: () => <ArtistItemContainer artists={artists} title="Example" />,
};
