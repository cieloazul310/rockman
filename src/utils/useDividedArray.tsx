import * as React from 'react';
import useSorter from './useSorter';
import { AbstractProgram } from '../types';
import { ProgramPlaylist } from '../../graphql-types';

export default function useDividedArray<T>(items: T[], divisor: number) {
  return React.useMemo(() => {
    if (items.length <= divisor) {
      return [items];
    } else {
      // ex. length = 105, divisor = 20, result = 6
      const result = Math.ceil(items.length / divisor);
      return Array.from({ length: result }, (d, i) => {
        return items.slice(i * divisor, (i + 1) * divisor);
      });
    }
  }, [items, divisor]);
}

export function useDividedPrograms(
  programs: AbstractProgram[],
  divisor: number,
  filter: (tune: ProgramPlaylist) => boolean = () => true
): AbstractProgram[][] {
  const sorter = useSorter();
  return React.useMemo(() => {
    return programs
      .sort((a, b) => sorter(a.week && b.week ? a.week - b.week : 0))
      .reduce<AbstractProgram[][]>((accum, curr, index) => {
        const filtered = {
          ...curr,
          playlist: curr.playlist?.filter(filter) ?? [],
        };
        if (index === 0) {
          return [[filtered]];
        }
        if (getPlaylistLength(accum[accum.length - 1]) < divisor) {
          accum[accum.length - 1].push(filtered);
          return accum;
        } else {
          return [...accum, [filtered]];
        }
      }, []);
  }, [programs, divisor, filter, sorter]);
}

function getPlaylistLength(programs: AbstractProgram[]) {
  return programs.reduce((accum, curr) => (curr.playlist ? accum + curr.playlist.length : accum), 0);
}
