import * as React from 'react';
import type { TuneProps } from '../components/Tune';
import { useSortProgram } from './useSorter';
import type { Program, TuneItemFragment } from '../../types';

function getPlaylistLength<
  T extends Pick<Program, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'> & {
    playlist: TuneItemFragment[];
  }
>(programs: T[]): number {
  return programs.reduce((accum, curr) => (curr?.playlist ? accum + curr.playlist.length : accum), 0);
}

export default function useDividedArray<T>(items: T[], divisor: number): T[][] {
  return React.useMemo(() => {
    if (items.length <= divisor) {
      return [items];
    }
    // ex. length = 105, divisor = 20, result = 6
    const result = Math.ceil(items.length / divisor);
    return Array.from({ length: result }, (_, i) => {
      return items.slice(i * divisor, (i + 1) * divisor);
    });
  }, [items, divisor]);
}

export function useDividedPrograms<
  T extends Pick<Program, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'> & {
    playlist: TuneItemFragment[];
  }
>(programs: T[], divisor: number, filter: (tune: TuneProps['tune']) => boolean = () => true): T[][] {
  const sortProgram = useSortProgram();
  return React.useMemo(() => {
    return programs.sort(sortProgram).reduce<T[][]>((accum, curr, index) => {
      const filtered = {
        ...curr,
        playlist: curr?.playlist?.filter(filter) ?? [],
      };
      if (index === 0) {
        return [[filtered]];
      }
      if (getPlaylistLength(accum[accum.length - 1]) < divisor) {
        accum[accum.length - 1].push(filtered);
        return accum;
      }
      return [...accum, [filtered]];
    }, []);
  }, [programs, divisor, filter, sortProgram]);
}
