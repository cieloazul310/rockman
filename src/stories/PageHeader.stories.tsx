import * as React from 'react';
import type { ComponentMeta } from '@storybook/react';
import ArtistPageHeader from '../templates/artist/PageHeader';
import ProgramPageHeader from '../templates/program/PageHeader';
import program from './data/program';

export default {
  title: 'PageHeader',
  component: ProgramPageHeader,
  subcomponents: {
    ArtistPageHeader,
    ProgramPageHeader,
  },
} as ComponentMeta<typeof ProgramPageHeader>;

export function Program() {
  return <ProgramPageHeader program={program} />;
}
