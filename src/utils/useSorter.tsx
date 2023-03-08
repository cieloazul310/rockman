import * as React from 'react';
import { useAppState } from '../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import type { Program, Tune } from '../../types';

/** usage
 * const sorter = useSorter();
 * programs.sort((a, b) => sorter(a.week - b.week))
 */
export default function useSorter(): (value: number) => number {
  const { sort } = useAppState();
  return React.useCallback((value: number) => (sort === 'older' ? value : -value), [sort]);
}

export function useSortProgram(): (a: Pick<Program, 'week'>, b: Pick<Program, 'week'>) => number {
  const sorter = useSorter();
  return (a: Pick<Program, 'week'>, b: Pick<Program, 'week'>) => sorter(a.week - b.week);
}

export function useSortProgramNode(): (a: Pick<Program, 'week'>, b: Pick<Program, 'week'>) => number {
  const sorter = useSorter();
  return (a: Pick<Program, 'week'>, b: Pick<Program, 'week'>) => sorter(a.week - b.week);
}

export function useSortPlaylist(): (
  a: Pick<Tune, 'week' | 'indexInWeek'> | undefined,
  b: Pick<Tune, 'week' | 'indexInWeek'> | undefined
) => number {
  const sorter = useSorter();
  return (a: Pick<Tune, 'week' | 'indexInWeek'> | undefined, b: Pick<Tune, 'week' | 'indexInWeek'> | undefined) =>
    sorter((a?.week ?? 0) - (b?.week ?? 0) || (a?.indexInWeek ?? 0) - (b?.indexInWeek ?? 0));
}
