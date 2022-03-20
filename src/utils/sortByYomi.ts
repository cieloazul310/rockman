import { ArtistListItem } from '../../types';

export type SortType = 'abc' | 'edges' | 'tunes';

type SortArtistsOptions = {
  sortType?: SortType;
  sortAsc?: boolean;
};

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

export function sortByYomi(a: { node: Pick<ArtistListItem, 'name' | 'kana'> }, b: { node: Pick<ArtistListItem, 'name' | 'kana'> }): number {
  return getYomi(a.node.name, a.node.kana ?? undefined).localeCompare(getYomi(b.node.name, b.node.kana ?? undefined));
}

export function sortByEdges(
  a: { node: Pick<ArtistListItem, 'name' | 'kana' | 'program'> },
  b: { node: Pick<ArtistListItem, 'name' | 'kana' | 'program'> }
): number {
  return -(a.node.program.programsCount - b.node.program.programsCount) || sortByYomi(a, b);
}

export function sortByTunes(
  a: { node: Pick<ArtistListItem, 'name' | 'kana' | 'program'> },
  b: { node: Pick<ArtistListItem, 'name' | 'kana' | 'program'> }
): number {
  return -(a.node.program.tunesCount - b.node.program.tunesCount) || sortByYomi(a, b);
}

export function sortArtists(artists: { node: ArtistListItem }[], options: SortArtistsOptions = {}) {
  const sortType = options.sortType || 'abc';
  if (sortType === 'edges') return [...artists].sort(sortByEdges);
  if (sortType === 'tunes') return [...artists].sort(sortByTunes);
  return [...artists].sort(sortByYomi);
}
