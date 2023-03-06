import type { ArtistListItem } from '../../types';

export function kanaToHira(str: string): string {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

export function getYomi(artistName: string, kana?: string | null): string {
  const the = artistName.slice(0, 4);
  if (the === 'The ' || the === 'THE ' || the === 'the ') return kanaToHira(artistName.slice(4)).toLowerCase();
  return kanaToHira(kana || artistName).toLowerCase();
}

export function sortByYomi(a: Pick<ArtistListItem, 'name' | 'kana'>, b: Pick<ArtistListItem, 'name' | 'kana'>): number {
  return getYomi(a.name, a.kana ?? undefined).localeCompare(getYomi(b.name, b.kana ?? undefined));
}

export function sortByPrograms(
  a: Pick<ArtistListItem, 'name' | 'kana' | 'program'>,
  b: Pick<ArtistListItem, 'name' | 'kana' | 'program'>
): number {
  return -(a.program.programsCount - b.program.programsCount) || sortByYomi(a, b);
}

export function sortByTunes(
  a: Pick<ArtistListItem, 'name' | 'kana' | 'program'>,
  b: Pick<ArtistListItem, 'name' | 'kana' | 'program'>
): number {
  return -(a.program.tunesCount - b.program.tunesCount) || sortByYomi(a, b);
}
