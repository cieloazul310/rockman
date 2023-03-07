import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { AppLink, Section } from '@cieloazul310/gatsby-theme-aoi';
import Tune, { TuneBare } from './Item';
import TextSpan from '../TextSpan';
import type { Program, TuneItemFragment } from '../../../types';

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
          {footerText ? <Typography variant="body2">{footerText}</Typography> : null}
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
  program: Pick<Program, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'> & {
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
