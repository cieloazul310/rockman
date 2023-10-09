import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import type { Meta, StoryObj } from "@storybook/react";
import { Section, SectionWrapper } from "@cieloazul310/gatsby-theme-aoi";
import Tune, { TuneBare } from "../components/Tunes/Item";
import TunesByProgram from "../components/Tunes/TunesByProgram";
import ProgramByTune from "../components/Tunes/ProgramByTune";
import program from "./data/program";
import tunes from "./data/tunes";

const meta: Meta<typeof Tune> = {
  title: "Components/Tune",
  component: Tune,
};

export default meta;

type Story = StoryObj<typeof Tune>;

export const Basic: Story = {
  render: () => (
    <Stack spacing={1}>
      <TuneBare
        title="Me Myself and I"
        headerText="M1."
        footerText="De La Soul (1992)"
        href="https://youtu.be/zR9AlcgL6_0"
        image="https://i.ytimg.com/vi/zR9AlcgL6_0/0.jpg"
      />
      <TuneBare />
    </Stack>
  ),
};

export const Program: Story = {
  render: () => (
    <Section>
      <Container maxWidth="md">
        <Stack spacing={1}>
          {program.playlist.map((tune) => (
            <Tune key={tune.id} tune={tune} />
          ))}
        </Stack>
      </Container>
    </Section>
  ),
};

export const ByProgram: Story = {
  render: () => (
    <SectionWrapper spacing={1}>
      <TunesByProgram program={program} />
      <TunesByProgram program={program} />
      <TunesByProgram program={program} />
    </SectionWrapper>
  ),
};

export const ByTune: Story = {
  render: () => (
    <SectionWrapper spacing={2}>
      {tunes.map((tune) => (
        <ProgramByTune key={tune.id} tune={tune} />
      ))}
    </SectionWrapper>
  ),
};
