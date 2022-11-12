import * as React from 'react';
import { sortByYomi, sortByPrograms, sortByTunes } from './sortByYomi';
import type { ArtistListItem } from '../../types';

export default function useSortedArtists(artists: { node: ArtistListItem }[], sortType: 'abc' | 'programs' | 'tunes' = 'abc') {
  return React.useMemo(() => {
    if (sortType === 'programs') return [...artists].sort(sortByPrograms);
    if (sortType === 'tunes') return [...artists].sort(sortByTunes);
    return [...artists].sort(sortByYomi);
  }, [artists, sortType]);
}
