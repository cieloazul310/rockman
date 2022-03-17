import * as React from 'react';
import { HomeIcon, AboutIcon, ProgramIcon, CategoryIcon, SelectorIcon, TimeMachineIcon } from '../../icons';

const menu = [
  {
    title: 'Top',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    title: '放送回一覧',
    path: '/programs/',
    icon: <ProgramIcon />,
  },
  {
    title: 'テーマ',
    path: '/categories/',
    icon: <CategoryIcon />,
  },
  {
    title: '選曲者',
    path: '/selectors/',
    icon: <SelectorIcon />,
  },
  {
    title: 'ちょっぴりタイムマシン',
    path: '/timemachine/',
    icon: <TimeMachineIcon />,
  },
  {
    title: 'サイトについて',
    path: '/about/',
    icon: <AboutIcon />,
  },
];

export default menu;
