import * as React from 'react';
import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import Skeleton from '@mui/material/Skeleton';
import { AppLink, Section } from '@cieloazul310/gatsby-theme-aoi';
import Tune from './Item';
import TextSpan from '../TextSpan';
import type { Program, TuneItemFragment } from '../../../types';

type ProgramByTuneProps = {
  tune: TuneItemFragment & {
    program: Pick<Program, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'>;
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
          {tune.program.subtitle ? <Typography variant="body2">{tune.program.subtitle}</Typography> : null}
        </Box>
        <div>
          <Tune tune={tune} />
        </div>
      </Container>
    </Section>
  );
}

export default ProgramByTune;
