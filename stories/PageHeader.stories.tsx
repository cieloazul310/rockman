import * as React from 'react';
import { ProgramPageHeader, ArtistPageHeader } from '../src/components/PageHeader';

const stories = { title: 'Page Header' };
export default stories;

const program = {
  id: '20210158',
  fields: {
    image: 'https://i.ytimg.com/vi/XvRQDsH0Yho/0.jpg',
    slug: 'hoge',
  },
  title: 'スピッツメンバーで漫遊記 2021初春・崎山龍男編',
  subtitle: 'ステイホーム中に練習してた曲で漫遊記',
  categories: ['スピッツメンバーと漫遊記', 'ゲスト回'],
  week: 158,
  year: 2021,
  date: '2021-01-10',
  playlist: [null, null, null, null],
};
const artist = {
  name: 'Iron Maiden',
  nation: 'UK',
  image: 'https://i.ytimg.com/vi/ie7GZGdgdPQ/0.jpg',
  programCount: 3,
  tunesCount: 3,
};

export function Program(): JSX.Element {
  return <ProgramPageHeader program={program} />;
}

export function Artist(): JSX.Element {
  return <ArtistPageHeader artist={artist} />;
}
