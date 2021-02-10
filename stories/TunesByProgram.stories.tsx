import * as React from 'react';
import Section from '../src/components/Section';
import TunesByPrograms, { TunesByProgramSkeleton } from '../src/components/TunesByProgram';

const stories = { title: 'TunesByProgram' };
export default stories;

const data = {
  week: 10,
  date: '2021-02-10',
  fields: {
    slug: '/programs/20210010',
  },
  title: 'ヒバリのこころで漫遊記',
  playlist: [
    {
      title: 'ヒバリのこころ',
      indexInWeek: 1,
      artist: {
        name: 'スピッツ',
      },
      year: 1990,
      corner: '漫遊前の一曲',
      youtube: 'GYmu0pLeU_c',
      selector: '草野マサムネ',
    },
    {
      title: 'トゲトゲの木',
      indexInWeek: 2,
      artist: {
        name: 'スピッツ',
      },
      year: 1990,
      selector: '草野マサムネ',
    },
    {
      title: '353号線のうた',
      indexInWeek: 3,
      artist: {
        name: 'スピッツ',
      },
      year: 1990,
      selector: '草野マサムネ',
    },
    {
      title: '恋のうた',
      indexInWeek: 4,
      artist: {
        name: 'スピッツ',
      },
      year: 1990,
      selector: '草野マサムネ',
    },
    {
      title: 'おっぱい',
      indexInWeek: 5,
      artist: {
        name: 'スピッツ',
      },
      year: 1990,
      selector: '草野マサムネ',
    },
    {
      title: '死にもの狂いのカゲロウを見ていた',
      indexInWeek: 6,
      artist: {
        name: 'スピッツ',
      },
      year: 1990,
      corner: 'ちょっぴりタイムマシン',
      selector: '草野マサムネ',
    },
  ],
};

export function Basic() {
  return (
    <Section>
      <TunesByPrograms program={data} />
    </Section>
  );
}

export function Skeleton() {
  return (
    <Section>
      <TunesByProgramSkeleton />
    </Section>
  );
}
