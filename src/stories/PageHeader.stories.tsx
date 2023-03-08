import * as React from 'react';
import Typography from '@mui/material/Typography';
import type { ComponentMeta } from '@storybook/react';
import PageHeader, { ArtistPageHeader, ProgramPageHeader } from '../templates/components/PageHeader';
import program from './data/program';

export default {
  title: 'PageHeader',
  component: PageHeader,
  subcomponents: {
    ArtistPageHeader,
    ProgramPageHeader,
  },
} as ComponentMeta<typeof PageHeader>;

export function Basic() {
  return (
    <PageHeader variant="program" image="https://i.ytimg.com/vi/zR9AlcgL6_0/0.jpg">
      <Typography variant="h6" component="h1">
        Title
      </Typography>
    </PageHeader>
  );
}

export function Program() {
  return <ProgramPageHeader program={program} />;
}
