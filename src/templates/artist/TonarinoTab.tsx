import * as React from 'react';
import { SectionWrapper } from '@cieloazul310/gatsby-theme-aoi';
import ArtistPageHeader from './PageHeader';
import { TunesByProgramSkeleton } from '../../components/Tunes/TunesByProgram';
import type { Artist } from '../../../types';

type ArtistTonarinoTabProps = {
  item: Pick<Artist, 'name' | 'nation'> & {
    program: Pick<Artist['program'], 'image' | 'programsCount' | 'tunesCount'>;
  };
};

function ArtistTonarinoTab({ item }: ArtistTonarinoTabProps) {
  return (
    <SectionWrapper>
      <ArtistPageHeader artist={item} />
      <TunesByProgramSkeleton />
    </SectionWrapper>
  );
}

export default ArtistTonarinoTab;
