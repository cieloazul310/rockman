// import { ArtistItem } from './graphql-hooks';
import { Artist } from '../../types';

export type SortType = 'abc' | 'edges' | 'tunes';

interface SortArtistsOptions {
  sortType?: SortType;
  sortAsc?: boolean;
}

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

export function sortByYomi(a: ArtistItem, b: ArtistItem): number {
  return getYomi(a.node.name, a.node.kana ?? undefined).localeCompare(getYomi(b.node.name, b.node.kana ?? undefined));
}

export function sortByEdges(a: ArtistItem, b: ArtistItem): number {
  return -(a.node.programCount - b.node.programCount) || sortByYomi(a, b);
}

export function sortByTunes(a: ArtistItem, b: ArtistItem): number {
  return -(a.node.tunesCount - b.node.tunesCount) || sortByYomi(a, b);
}

export default function sortArtists(artists: ArtistItem[], options: SortArtistsOptions = {}): ArtistItem[] {
  const sortType = options.sortType || 'abc';
  if (sortType === 'edges') return [...artists].sort(sortByEdges);
  if (sortType === 'tunes') return [...artists].sort(sortByTunes);
  return [...artists].sort(sortByYomi);
}
