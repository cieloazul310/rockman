import * as React from "react";
import type { ComponentMeta } from "@storybook/react";
import Grid from "@mui/material/Grid";
import { Section, Article } from "@cieloazul310/gatsby-theme-aoi";
import { Stat } from "@/components/stat";
import { ArtistIcon, ProgramIcon, TuneIcon } from "@/icons";

export default {
  title: "Stat",
  component: Stat,
} as ComponentMeta<typeof Stat>;

export function Basic() {
  return (
    <Stat icon={<ArtistIcon />} value={100} title="アーティスト" label="組" />
  );
}

export function WithSection() {
  return (
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
  );
}
