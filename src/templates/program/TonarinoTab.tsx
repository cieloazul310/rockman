import * as React from "react";
import { Section, SectionWrapper } from "@cieloazul310/gatsby-theme-aoi";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ProgramPageHeader from "./PageHeader";
import { TuneBare } from "../../components/Tunes/Item";
import type { Program } from "../../../types";

type ProgramTonarinoTabProps = {
  item: Pick<
    Program,
    "week" | "date" | "title" | "categories" | "image" | "subtitle"
  > & {
    playlist: unknown[];
  };
};

function ProgramTonarinoTab({ item }: ProgramTonarinoTabProps) {
  return (
    <SectionWrapper>
      <ProgramPageHeader program={item} />
      <Section py={2}>
        <Container maxWidth="md">
          <Stack spacing={1}>
            <TuneBare />
            <TuneBare />
            <TuneBare />
            <TuneBare />
            <TuneBare />
            <TuneBare />
          </Stack>
        </Container>
      </Section>
    </SectionWrapper>
  );
}

export default ProgramTonarinoTab;
