import { PureArtist } from '../../gatsby-node/types';

export function getRelatedArtists(artist: PureArtist) {
  if (!artist) return [];
  const playlists = artist.program?.map((program) => program?.playlist ?? []);
  const playlist = playlists?.reduce((accum, curr) => [...accum, ...curr], []);
  const artists = playlist?.map((tune) => tune?.artist).filter((name) => name !== 'スピッツ' && name !== artist.name);
  const obj: { [key: string]: number } =
    artists?.reduce<{ [key: string]: number }>((accum, curr) => {
      if (!curr) return accum;
      if (curr && accum.hasOwnProperty(curr)) accum[curr] += 1;
      else accum[curr] = 1;
      return accum;
    }, {}) ?? {};
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
}
