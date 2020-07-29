import * as React from 'react';
import { useAllArtists } from './useAllArtists';
import { schemeNations } from '../getNationColor';

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

export function useSchemeNations() {
  const allNations = useAllNations();
  type NationItem = typeof allNations[number];
  return React.useMemo(() => {
    const [schemed, notSchemed] = allNations.reduce<[NationItem[], NationItem[]]>(
      (accum, curr) => (schemeNations.includes(curr.nation) ? [[...accum[0], curr], [...accum[1]]] : [[...accum[0]], [...accum[1], curr]]),
      [[], []]
    );
    return [
      ...schemed,
      notSchemed.reduce<NationItem>(
        (accum, curr) => ({
          ...accum,
          artists: accum.artists + curr.artists,
          tunes: accum.tunes + curr.tunes,
        }),
        {
          nation: 'others',
          artists: 0,
          tunes: 0,
        }
      ),
    ];
  }, [allNations]);
}
