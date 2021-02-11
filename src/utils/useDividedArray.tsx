import * as React from 'react';
import { TuneProps } from '../components/Tune';
import { TunesByProgramProps } from '../components/TunesByProgram';
import { useSortProgram } from './useSorter';

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

export function useDividedPrograms<T extends TunesByProgramProps['program']>(
  programs: T[],
  divisor: number,
  filter: (tune: TuneProps['tune']) => boolean = () => true
): T[][] {
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
      } else {
        return [...accum, [filtered]];
      }
    }, []);
  }, [programs, divisor, filter, sortProgram]);
}

function getPlaylistLength<T extends TunesByProgramProps['program']>(programs: T[]): number {
  return programs.reduce((accum, curr) => (curr?.playlist ? accum + curr.playlist.length : accum), 0);
}
