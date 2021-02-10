import * as React from 'react';
import Section from '../src/components/Section';
import Tune, { TuneSkeleton } from '../src/components/Tune';

const stories = {
  title: 'Tune',
};
export default stories;

const data = {
  title: 'ヒバリのこころ',
  indexInWeek: 1,
  artist: {
    name: 'スピッツ',
  },
  year: 1991,
  youtube: 'GYmu0pLeU_c',
  selector: '草野マサムネ',
};

export function Basic() {
  return (
    <Section>
      <Tune tune={data} />
    </Section>
  );
}

export function Additional() {
  return (
    <Section>
      <Tune tune={{ ...data, selector: '田村明浩' }} />
      <Tune tune={{ ...data, selector: '田村明浩', corner: '漫遊前の一曲' }} />
    </Section>
  );
}

export function Multiple() {
  return (
    <Section>
      {Array.from({ length: 10 }).map((_, i) => (
        <Tune key={i} tune={{ ...data, indexInWeek: i + 1 }} />
      ))}
    </Section>
  );
}

export function Skeleton() {
  return (
    <Section>
      <Tune tune={data} />
      {Array.from({ length: 4 }).map((_, i) => (
        <TuneSkeleton key={i} />
      ))}
    </Section>
  );
}
