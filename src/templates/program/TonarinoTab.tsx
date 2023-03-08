import * as React from 'react';
import { Section, SectionWrapper, Article } from '@cieloazul310/gatsby-theme-aoi';
import ProgramPageHeader from './PageHeader';
import { TuneBare } from '../../components/Tunes/Item';
import type { Program } from '../../../types';

type ProgramTonarinoTabProps = {
  item: Pick<Program, 'week' | 'date' | 'title' | 'categories' | 'image' | 'subtitle'> & {
    playlist: unknown[];
  };
};

function ProgramTonarinoTab({ item }: ProgramTonarinoTabProps) {
  return (
    <SectionWrapper>
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
    </SectionWrapper>
  );
}

export default ProgramTonarinoTab;
