import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Grid from "@mui/material/Grid";
import { Section, Article } from "@cieloazul310/gatsby-theme-aoi";
import { Stat } from "../components/Stat";
import { ArtistIcon, ProgramIcon, TuneIcon } from "../icons";

const meta: Meta<typeof Stat> = {
  title: "Components/Stat",
  component: Stat,
};

export default meta;

type Story = StoryObj<typeof Stat>;

export const Basic: Story = {
  render: () => (
    <Stat icon={<ArtistIcon />} value={100} title="アーティスト" label="組" />
  ),
};

export const WithSection: Story = {
  render: () => (
    <Section>
      <Article maxWidth="md" disableGutters>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Stat
            icon={<ProgramIcon fontSize="inherit" />}
            value={200}
            title="放送"
            label="回"
          />
          <Stat
            icon={<TuneIcon fontSize="inherit" />}
            value={2000}
            title="曲数"
            label="曲"
          />
          <Stat
            icon={<ArtistIcon fontSize="inherit" />}
            value={1248}
            title="アーティスト"
            label="組"
          />
        </Grid>
      </Article>
    </Section>
  ),
};
