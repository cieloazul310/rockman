import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { AppLink, Section } from "@cieloazul310/gatsby-theme-aoi";
import type { Program, TuneItemFragment } from "types";
import Tune, { TuneBare } from "./item";
import TextSpan from "../text-span";

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
    <Section>
      <Container maxWidth="md" disableGutters sx={{ py: 1 }}>
        <Box py={1}>
          <Typography color="textSecondary">{headerText}</Typography>
          <Typography fontWeight="bold">{title}</Typography>
          {footerText ? (
            <Typography variant="body2">{footerText}</Typography>
          ) : null}
        </Box>
        {children}
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
      <Stack spacing={1}>
        {playlist.map((tune) => (
          <Tune key={tune.id} tune={tune} />
        ))}
      </Stack>
    </TunesByProgramBare>
  );
}

export default TunesByProgram;

type ProgramByTuneProps = {
  tune: TuneItemFragment & {
    program: Pick<
      Program,
      "id" | "week" | "date" | "slug" | "title" | "subtitle"
    >;
  };
};

export function ProgramByTune({ tune }: ProgramByTuneProps) {
  return (
    <Section>
      <Container maxWidth="md" disableGutters sx={{ py: 1 }}>
        <Box py={1}>
          <Typography variant="body2" color="textSecondary">
            <TextSpan label={`第${tune.program.week}回`} />
            <TextSpan label={tune.program.date} />
          </Typography>
          <Typography fontWeight="bold">
            <AppLink href={tune.program.slug}>{tune.program.title}</AppLink>
          </Typography>
          {tune.program.subtitle ? (
            <Typography variant="body2">{tune.program.subtitle}</Typography>
          ) : null}
        </Box>
        <div>
          <Tune tune={tune} />
        </div>
      </Container>
    </Section>
  );
}

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
