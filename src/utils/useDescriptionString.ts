import type { ProgramBrowser, MinimumArtist } from '../../types';

export function useProgramDescriptionString({
  week,
  title,
  date,
  subtitle,
  guests,
}: Pick<ProgramBrowser, 'week' | 'title' | 'date' | 'subtitle' | 'guests'>): string {
  const dt = new Date(date);
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const day = dt.getDate();

  return [
    `TOKYO-FM他全国39局ネットで放送中のラジオ番組`,
    `「SPITZ 草野マサムネのロック大陸漫遊記」`,
    `${year}年${month}月${day}日放送の`,
    `第${week}回`,
    `「${title}」`,
    subtitle ? `〜${subtitle}〜` : ``,
    `のプレイリスト。`,
    guests?.length ? `ゲストは${guests.join('、')}。` : ``,
  ].join('');
}

export function useArtistDescriptionString({ name, program }: Pick<MinimumArtist, 'name' | 'program'>) {
  return [
    `TOKYO-FM他全国39局ネットで放送中のラジオ番組`,
    `「SPITZ 草野マサムネのロック大陸漫遊記」`,
    `でオンエアされた${name}の楽曲一覧。`,
    `${program.programsCount}回登場、全${program.tunesCount}曲。`,
  ].join('');
}
