import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Section, { SectionDivider } from '../src/components/Section';
import { TunesByProgramSkeleton } from '../src/components/TunesByProgram';
import { ArtistItemContainerSkeleton } from '../src/components/ArtistItemContainer';

const stories = { title: 'Rhythms' };
export default stories;

export function Rhythms(): JSX.Element {
  return (
    <div>
      <Section>
        <Box height={200} display="flex" px={1} py={2} alignItems="center">
          <div>
            <Typography variant="h6" component="h2" gutterBottom>
              <Skeleton width={200} />
            </Typography>
            <Typography>
              <Skeleton width={240} />
            </Typography>
          </div>
        </Box>
      </Section>
      <SectionDivider />
      <Section>
        <TunesByProgramSkeleton />
        <TunesByProgramSkeleton />
      </Section>
      <SectionDivider />
      <Section>
        <ArtistItemContainerSkeleton length={10} />
      </Section>
    </div>
  );
}
