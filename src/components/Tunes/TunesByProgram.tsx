import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import { AppLink, Section } from "@cieloazul310/gatsby-theme-aoi";
import { ProgramTitleBare } from "./ProgramTitle";
import Tune, { TuneBare } from "./Item";
import TextSpan from "../TextSpan";
import type { Program, TuneItemFragment } from "../../../types";

type TunesByProgramBareProps = {
  headerText?: React.ReactNode;
  title?: React.ReactNode;
  footerText?: React.ReactNode | null;
  children: React.ReactNode;
};

function TunesByProgramBare({
  headerText = <Skeleton width={100} />,
  title = <Skeleton width={260} />,
  footerText,
  children,
}: TunesByProgramBareProps) {
  return (
    <Section py={2}>
      <Container maxWidth="md">
        <ProgramTitleBare
          headerText={headerText}
          title={title}
          footerText={footerText}
        />
        <Stack spacing={1} component="main">
          {children}
        </Stack>
      </Container>
    </Section>
  );
}

TunesByProgramBare.defaultProps = {
  headerText: <Skeleton width={100} />,
  title: <Skeleton width={260} />,
  footerText: undefined,
};

type TunesByProgramProps = {
  program: Pick<
    Program,
    "id" | "week" | "date" | "slug" | "title" | "subtitle"
  > & {
    playlist: TuneItemFragment[];
  };
};

function TunesByProgram({ program }: TunesByProgramProps) {
  const { week, date, slug, title, subtitle, playlist } = program;
  return (
    <TunesByProgramBare
      headerText={
        <>
          <TextSpan label={`第${week}回`} />
          <TextSpan label={date} />
        </>
      }
      title={<AppLink href={slug}>{title}</AppLink>}
      footerText={subtitle}
    >
      {playlist.map((tune) => (
        <Tune key={tune.id} tune={tune} />
      ))}
    </TunesByProgramBare>
  );
}

export default TunesByProgram;

export function TunesByProgramSkeleton() {
  return (
    <TunesByProgramBare>
      {Array.from({ length: 4 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TuneBare key={index.toString()} />
      ))}
    </TunesByProgramBare>
  );
}
