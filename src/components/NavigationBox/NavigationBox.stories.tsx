import * as React from 'react';
import NavigationBox from './index';
import { HomeIcon, ProgramIcon, ArtistIcon, CategoryIcon, SelectorIcon, CornerIcon, TuneIcon } from '../../icons';

export default {
  component: NavigationBox,
  title: 'NavigationBox',
};

export function Simple() {
  return <NavigationBox icon={<HomeIcon />} label="HOME" to="/" />;
}
export function Multiple() {
  return (
    <div>
      <NavigationBox icon={<ProgramIcon />} label="放送回" to="/" />
      <NavigationBox icon={<ArtistIcon />} label="アーティスト" to="/" />
      <NavigationBox icon={<CategoryIcon />} label="放送テーマ" to="/" />
      <NavigationBox icon={<SelectorIcon />} label="選曲者" to="/" />
      <NavigationBox icon={<CornerIcon />} label="コーナー" to="/" />
    </div>
  );
}
