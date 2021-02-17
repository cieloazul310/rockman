import * as React from 'react';
import ArtistItemContainer from '../src/components/ArtistItemContainer';

const stories = { title: 'ArtistItem' };
export default stories;

const data = [
  {
    name: 'スピッツ',
    image: 'https://i.ytimg.com/vi/GYmu0pLeU_c/0.jpg',
    programCount: 10,
    tunesCount: 10,
  },
  {
    name: 'Bruce Springsteen',
    image: 'https://i.ytimg.com/vi/boJhWtw-6Gg/0.jpg',
    programCount: 2,
    tunesCount: 2,
  },
  {
    name: 'Elvis Costello',
    image: 'https://i.ytimg.com/vi/XvRQDsH0Yho/0.jpg',
    programCount: 3,
    tunesCount: 3,
  },
  {
    name: 'ニューエスト・モデル',
    programCount: 1,
    tunesCount: 1,
  },
  {
    name: 'Queen',
    image: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/0.jpg',
    programCount: 6,
    tunesCount: 6,
  },
  {
    name: 'Iron Maiden',
    image: 'https://i.ytimg.com/vi/ie7GZGdgdPQ/0.jpg',
    programCount: 3,
    tunesCount: 3,
  },
  {
    name: 'Judas Priest',
    image: 'https://i.ytimg.com/vi/yMVV_HsHcX0/0.jpg',
    programCount: 3,
    tunesCount: 4,
  },
  {
    name: 'フラワーカンパニーズ',
    image: 'https://i.ytimg.com/vi/fIh0IAqObi8/0.jpg',
    programCount: 3,
    tunesCount: 6,
  },
  {
    name: 'Uriah Heep',
    image: 'https://i.ytimg.com/vi/07qum-r17A8/0.jpg',
    programCount: 3,
    tunesCount: 4,
  },
  {
    name: 'Yellow Magic Orchestra',
    image: 'https://i.ytimg.com/vi/nB5g2cUM2FQ/0.jpg',
    programCount: 1,
    tunesCount: 1,
  },
];

export function Basic(): JSX.Element {
  return <ArtistItemContainer title="関連アーティスト" artists={data} />;
}
