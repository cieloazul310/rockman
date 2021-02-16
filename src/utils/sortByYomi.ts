import { ArtistItem } from './graphql-hooks';

export type SortType = 'abc' | 'edges' | 'tunes';

interface SortArtistsOptions {
  sortType?: SortType;
  sortAsc?: boolean;
}

export default function sortArtists(artists: ArtistItem[], options: SortArtistsOptions = {}) {
  const sortType = options.sortType || 'abc';
  return [...artists].sort((a, b) =>
    sortType === 'edges'
      ? sortByEdges(a, b) || sortByYomi(a, b)
      : sortType === 'tunes'
      ? sortByTunes(a, b) || sortByYomi(a, b)
      : sortByYomi(a, b)
  );
}

export function sortByYomi(a: ArtistItem, b: ArtistItem) {
  return getYomi(a.fieldValue, a.kana).localeCompare(getYomi(b.fieldValue, b.kana));
}

export function sortByEdges(a: ArtistItem, b: ArtistItem) {
  return -(a.edges.length - b.edges.length);
}

export function sortByTunes(a: ArtistItem, b: ArtistItem) {
  return -(a.tunes.length - b.tunes.length);
}

export function getYomi(artistName: string, kana?: string) {
  const the = artistName.slice(0, 4);
  if (the === 'The ' || the === 'THE ' || the === 'the ') return artistName.slice(4);
  return kana || artistName;
}

export function encodeArtistName(artistName: string) {
  return encodeURIComponent(artistName.replace(/[' ']+/g, '_'));
}

export function decodeArtistName(artistName: string) {
  return decodeURIComponent(artistName.replace(/['_']+/g, ' '));
}
