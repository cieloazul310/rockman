import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import type { ComponentMeta } from "@storybook/react";
import { Section, SectionWrapper } from "@cieloazul310/gatsby-theme-aoi";
import Tune, { TuneBare } from "../components/Tunes/Item";
import TunesByProgram from "../components/Tunes/TunesByProgram";
import ProgramByTune from "../components/Tunes/ProgramByTune";
import program from "./data/program";
import tunes from "./data/tunes";

export default {
  title: "Tune",
  component: Tune,
  subcomponents: { TuneBare, TunesByProgram, ProgramByTune },
} as ComponentMeta<typeof Tune>;

export function Basic() {
  return (
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
  );
}

export function Program() {
  return (
    <Section>
      <Container maxWidth="md">
        <Stack spacing={1}>
          {program.playlist.map((tune) => (
            <Tune key={tune.id} tune={tune} />
          ))}
        </Stack>
      </Container>
    </Section>
  );
}

export function ByProgram() {
  return (
    <SectionWrapper spacing={1}>
      <TunesByProgram program={program} />
      <TunesByProgram program={program} />
      <TunesByProgram program={program} />
    </SectionWrapper>
  );
}

export function ByTune() {
  return (
    <SectionWrapper spacing={2}>
      {tunes.map((tune) => (
        <ProgramByTune key={tune.id} tune={tune} />
      ))}
    </SectionWrapper>
  );
}
