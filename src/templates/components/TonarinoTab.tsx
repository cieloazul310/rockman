import * as React from 'react';
import { Section, Article } from '@cieloazul310/gatsby-theme-aoi';
import { ProgramPageHeader, ArtistPageHeader } from './PageHeader';
import { TuneBare } from '../../components/Tunes/Item';
import { TunesByProgramSkeleton } from '../../components/Tunes/Container';
import type { Program, Artist } from '../../../types';

type ProgramTonarinoTabProps = {
  item: Pick<Program, 'week' | 'date' | 'title' | 'categories' | 'image' | 'subtitle'> & {
    playlist: unknown[];
  };
};

export function ProgramTonarinoTab({ item }: ProgramTonarinoTabProps) {
  return (
    <>
      <ProgramPageHeader program={item} />
      <Section>
        <Article maxWidth="md" disableGutters>
          <TuneBare />
          <TuneBare />
          <TuneBare />
          <TuneBare />
          <TuneBare />
          <TuneBare />
        </Article>
      </Section>
    </>
  );
}

type ArtistTonarinoTabProps = {
  item: Pick<Artist, 'name' | 'nation'> & {
    program: Pick<Artist['program'], 'image' | 'programsCount' | 'tunesCount'>;
  };
};

export function ArtistTonarinoTab({ item }: ArtistTonarinoTabProps) {
  return (
    <>
      <ArtistPageHeader artist={item} />
      <Section>
        <Article maxWidth="md" disableGutters>
          <TunesByProgramSkeleton />
        </Article>
      </Section>
    </>
  );
}
