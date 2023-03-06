import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { AppLink, Section, SectionDivider } from '@cieloazul310/gatsby-theme-aoi';
import Tune, { TuneSkeleton } from './Tune';
import TextSpan from './TextSpan';
import type { ProgramBrowser, TuneFields } from '../../types';

type TunesByProgramBareProps = {
  headerText: React.ReactNode;
  title: React.ReactNode;
  footerText?: React.ReactNode | null;
  children: React.ReactNode;
};

function TunesByProgramBare({ headerText, title, footerText, children }: TunesByProgramBareProps) {
  return (
    <section>
      <Section>
        <Container maxWidth="md" disableGutters sx={{ py: 1 }}>
          <Box p={1}>
            <Typography variant="body1" color="textSecondary">
              {headerText}
            </Typography>
            <Typography fontWeight="bold">{title}</Typography>
            {footerText ? <Typography variant="body2">{footerText}</Typography> : null}
          </Box>
          <div>{children}</div>
        </Container>
      </Section>
      <SectionDivider />
    </section>
  );
}

TunesByProgramBare.defaultProps = {
  footerText: undefined,
};

type TunesByProgramProps = {
  program: Pick<ProgramBrowser, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'> & {
    playlist: TuneFields[];
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

type ProgramByTuneProps = {
  tune: TuneFields & {
    program: Pick<ProgramBrowser, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'>;
  };
};

export function ProgramByTune({ tune }: ProgramByTuneProps) {
  return (
    <section>
      <Section>
        <Container maxWidth="md" disableGutters sx={{ py: 1 }}>
          <Box p={1}>
            <Typography variant="body2" color="textSecondary">
              <TextSpan label={`第${tune.program.week}回`} />
              <TextSpan label={tune.program.date} />
            </Typography>
            <Typography fontWeight="bold">
              <AppLink href={tune.program.slug}>{tune.program.title}</AppLink>
            </Typography>
            {tune.program.subtitle ? <Typography variant="body2">{tune.program.subtitle}</Typography> : null}
          </Box>
          <div>
            <Tune tune={tune} />
          </div>
        </Container>
      </Section>
      <SectionDivider />
    </section>
  );
}

export function TunesByProgramSkeleton() {
  return (
    <TunesByProgramBare headerText={<Skeleton width={100} />} title={<Skeleton width={260} />}>
      {Array.from({ length: 4 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TuneSkeleton key={index.toString()} />
      ))}
    </TunesByProgramBare>
  );
}
