import * as React from 'react';
import { useAllArtists } from './useAllArtists';

export function useAllNations() {
  const allArtists = useAllArtists();
  const nations = Array.from(new Set(allArtists.map((artist) => artist.nation)));

  return React.useMemo(() => {
    return nations
      .map((nation) => ({
        nation,
        artists: allArtists.filter((artist) => nation === artist.nation).length,
        tunes: allArtists.filter((artist) => nation === artist.nation).reduce((accum, curr) => accum + curr.tunes.length, 0),
      }))
      .sort((a, b) => b.artists - a.artists || a.nation.localeCompare(b.nation));
  }, [nations, allArtists]);
}
