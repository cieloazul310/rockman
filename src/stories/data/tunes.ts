import type { TuneItemFragment, Program } from '../../../types';

const tunes: (TuneItemFragment & {
  program: Pick<Program, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'>;
})[] = [
  {
    id: '2018000703',
    indexInWeek: 3,
    week: 7,
    title: 'Purgatory',
    artist: {
      name: 'Iron Maiden',
      slug: '/artist/Iron Maiden',
      nation: 'UK',
      program: {
        image: 'https://i.ytimg.com/vi/ie7GZGdgdPQ/0.jpg',
        programsCount: 6,
        tunesCount: 8,
      },
    },
    year: 1981,
    nation: 'UK',
    corner: null,
    youtube: 'ie7GZGdgdPQ',
    selector: '田村明浩',
    program: {
      id: 'c0481b2e-b104-575e-ade0-895534d7b0fd',
      title: 'スピッツメンバーと漫遊記',
      subtitle: '',
      week: 7,
      slug: '/program/20180007',
      date: '2018-02-18',
    },
  },
  {
    id: '2018003104',
    indexInWeek: 4,
    week: 31,
    title: 'The Ides of March / Wrathchild',
    artist: {
      name: 'Iron Maiden',
      slug: '/artist/Iron Maiden',
      nation: 'UK',
      program: {
        image: 'https://i.ytimg.com/vi/ie7GZGdgdPQ/0.jpg',
        programsCount: 6,
        tunesCount: 8,
      },
    },
    year: 1981,
    nation: 'UK',
    corner: null,
    youtube: 'io4ObwuO24w',
    selector: '田村明浩',
    program: {
      id: '3c963390-e028-5f36-b0a5-8617c44948fd',
      title: 'スピッツメンバーと漫遊記 田村明浩編',
      subtitle: '',
      week: 31,
      slug: '/program/20180031',
      date: '2018-08-05',
    },
  },
  {
    id: '2019008203',
    indexInWeek: 3,
    week: 82,
    title: 'Killers',
    artist: {
      name: 'Iron Maiden',
      slug: '/artist/Iron Maiden',
      nation: 'UK',
      program: {
        image: 'https://i.ytimg.com/vi/ie7GZGdgdPQ/0.jpg',
        programsCount: 6,
        tunesCount: 8,
      },
    },
    year: 1981,
    nation: 'UK',
    corner: null,
    youtube: 'w1Fw71X4uiM',
    selector: '草野マサムネ',
    program: {
      id: '76d5bbca-dadf-5fea-821e-b4f7614818f5',
      title: 'お馬さんリズムで漫遊記',
      subtitle: '',
      week: 82,
      slug: '/program/20190082',
      date: '2019-07-28',
    },
  },
  {
    id: '2019009204',
    indexInWeek: 4,
    week: 92,
    title: 'The Ides of March',
    artist: {
      name: 'Iron Maiden',
      slug: '/artist/Iron Maiden',
      nation: 'UK',
      program: {
        image: 'https://i.ytimg.com/vi/ie7GZGdgdPQ/0.jpg',
        programsCount: 6,
        tunesCount: 8,
      },
    },
    year: 1981,
    nation: 'UK',
    corner: null,
    youtube: 'rGJnjSATu50',
    selector: '草野マサムネ',
    program: {
      id: '2b377db7-7997-58ce-aebc-ddbebd246610',
      title: '水戸黄門リズムで漫遊記',
      subtitle: '',
      week: 92,
      slug: '/program/20190092',
      date: '2019-10-06',
    },
  },
  {
    id: '2021015707',
    indexInWeek: 7,
    week: 157,
    title: 'Aces High',
    artist: {
      name: 'Iron Maiden',
      slug: '/artist/Iron Maiden',
      nation: 'UK',
      program: {
        image: 'https://i.ytimg.com/vi/ie7GZGdgdPQ/0.jpg',
        programsCount: 6,
        tunesCount: 8,
      },
    },
    year: 1984,
    nation: 'UK',
    corner: null,
    youtube: 'Xg9aQvjMS60',
    selector: '三輪テツヤ',
    program: {
      id: '8973daae-a6dd-5429-92d1-bd75e963053f',
      title: 'スピッツメンバーで漫遊記 2021初春・三輪テツヤ編',
      subtitle: '田村バンドで漫遊記',
      week: 157,
      slug: '/program/20210157',
      date: '2021-01-03',
    },
  },
  {
    id: '2022021302',
    indexInWeek: 2,
    week: 213,
    title: 'Iron Maiden',
    artist: {
      name: 'Iron Maiden',
      slug: '/artist/Iron Maiden',
      nation: 'UK',
      program: {
        image: 'https://i.ytimg.com/vi/ie7GZGdgdPQ/0.jpg',
        programsCount: 6,
        tunesCount: 8,
      },
    },
    year: 1980,
    nation: 'UK',
    corner: null,
    youtube: 'L3OHi_vw4jY',
    selector: '草野マサムネ',
    program: {
      id: '41c91e15-e601-598c-9d86-40225abda563',
      title: 'ポール・ディアノで漫遊記',
      subtitle: '',
      week: 213,
      slug: '/program/20220213',
      date: '2022-01-30',
    },
  },
  {
    id: '2022021303',
    indexInWeek: 3,
    week: 213,
    title: 'Remember Tomorrow',
    artist: {
      name: 'Iron Maiden',
      slug: '/artist/Iron Maiden',
      nation: 'UK',
      program: {
        image: 'https://i.ytimg.com/vi/ie7GZGdgdPQ/0.jpg',
        programsCount: 6,
        tunesCount: 8,
      },
    },
    year: 1980,
    nation: 'UK',
    corner: null,
    youtube: 'hvoStFJFTb8',
    selector: '草野マサムネ',
    program: {
      id: '41c91e15-e601-598c-9d86-40225abda563',
      title: 'ポール・ディアノで漫遊記',
      subtitle: '',
      week: 213,
      slug: '/program/20220213',
      date: '2022-01-30',
    },
  },
  {
    id: '2022021304',
    indexInWeek: 4,
    week: 213,
    title: 'Purgatory',
    artist: {
      name: 'Iron Maiden',
      slug: '/artist/Iron Maiden',
      nation: 'UK',
      program: {
        image: 'https://i.ytimg.com/vi/ie7GZGdgdPQ/0.jpg',
        programsCount: 6,
        tunesCount: 8,
      },
    },
    year: 1981,
    nation: 'UK',
    corner: null,
    youtube: 'ie7GZGdgdPQ',
    selector: '草野マサムネ',
    program: {
      id: '41c91e15-e601-598c-9d86-40225abda563',
      title: 'ポール・ディアノで漫遊記',
      subtitle: '',
      week: 213,
      slug: '/program/20220213',
      date: '2022-01-30',
    },
  },
];

export default tunes;