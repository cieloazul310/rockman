import { Program } from '../../graphql-types';

export default function DescriptionString({
  week,
  title,
  date,
  subtitle,
  guests,
}: Partial<Program>): string {
  const dt = new Date(date);
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const day = dt.getDate();
  return [
    `スピッツ・草野マサムネがパーソナリティを務める`,
    `「SPITZ 草野マサムネのロック大陸漫遊記」`,
    `${year}年${month}月${day}日放送の`,
    `第${week}回`,
    `「${title}」`,
    subtitle ? `〜${subtitle}〜` : ``,
    `のプレイリスト。`,
    guests.length ? `ゲストは${guests.join('、')}。` : ``,
  ].join('');
}
