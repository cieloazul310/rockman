import * as React from "react";
// import Stack from '@mui/material/Stack';
import Container from "@mui/material/Container";
// import Skeleton from '@mui/material/Skeleton';
import { Section } from "@cieloazul310/gatsby-theme-aoi";
import type { Program, TuneItemFragment } from "types";
import ProgramTitle from "./program-title";
import Tune from "./item";

type ProgramByTuneProps = {
  tune: TuneItemFragment & {
    program: Pick<
      Program,
      "id" | "week" | "date" | "slug" | "title" | "subtitle"
    >;
  };
};

function ProgramByTune({ tune }: ProgramByTuneProps) {
  return (
    <Section component="article" py={2}>
      <Container maxWidth="md">
        <ProgramTitle {...tune.program} />
        <main>
          <Tune tune={tune} />
        </main>
      </Container>
    </Section>
  );
}

export default ProgramByTune;
