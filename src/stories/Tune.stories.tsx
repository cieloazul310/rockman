import * as React from 'react';
import Stack from '@mui/material/Stack';
import type { ComponentMeta } from '@storybook/react';
import Tune, { TuneBare } from '../components/Tunes/Item';
import TunesByProgram from '../components/Tunes/Container';
import program from './data/program';

export default {
  title: 'Tune',
  component: Tune,
  subcomponents: { TuneBare, TunesByProgram },
} as ComponentMeta<typeof Tune>;

export function Basic() {
  return (
    <Stack spacing={1}>
      <TuneBare
        title="Me Myself and I"
        headerText="M1."
        footerText="De La Soul (1992)"
        href="https://youtu.be/zR9AlcgL6_0"
        image="https://i.ytimg.com/vi/zR9AlcgL6_0/0.jpg"
      />
      <TuneBare />
    </Stack>
  );
}

export function Program() {
  return (
    <Stack spacing={1}>
      {program.playlist.map((tune) => (
        <Tune key={tune.id} tune={tune} />
      ))}
    </Stack>
  );
}

export function ByProgram() {
  return (
    <Stack spacing={1}>
      <TunesByProgram program={program} />
      <TunesByProgram program={program} />
      <TunesByProgram program={program} />
    </Stack>
  );
}
