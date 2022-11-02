import * as React from 'react';
import { Section, SectionDivider, Article } from '@cieloazul310/gatsby-theme-aoi';
import { ProgramPageHeader, ArtistPageHeader } from './PageHeader';
import { TuneSkeleton } from './Tune';
import { TunesByProgramSkeleton } from './TunesByProgram';
import type { ProgramBrowser, ArtistBrowser } from '../../types';

type ProgramTonarinoTabProps = {
  item: Pick<ProgramBrowser, 'week' | 'date' | 'title' | 'categories' | 'image' | 'subtitle'> & {
    playlist: unknown[];
  };
};

export function ProgramTonarinoTab({ item }: ProgramTonarinoTabProps) {
  return (
    <div>
      <ProgramPageHeader program={item} />
      <SectionDivider />
      <Section>
        <Article maxWidth="md" disableGutters>
          <TuneSkeleton />
          <TuneSkeleton />
          <TuneSkeleton />
          <TuneSkeleton />
          <TuneSkeleton />
          <TuneSkeleton />
        </Article>
      </Section>
    </div>
  );
}

type ArtistTonarinoTabProps = {
  item: Pick<ArtistBrowser, 'name' | 'nation'> & {
    program: Pick<ArtistBrowser['program'], 'image' | 'programsCount' | 'tunesCount'>;
  };
};

export function ArtistTonarinoTab({ item }: ArtistTonarinoTabProps) {
  return (
    <div>
      <ArtistPageHeader artist={item} />
      <SectionDivider />
      <Section>
        <Article maxWidth="md" disableGutters>
          <TunesByProgramSkeleton />
        </Article>
      </Section>
    </div>
  );
}
