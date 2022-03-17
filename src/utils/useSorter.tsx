import * as React from 'react';
import { useAppState } from '../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { ProgramBrowser, TuneBrowser } from '../../types';

/** usage
 * const sorter = useSorter();
 * programs.sort((a, b) => sorter(a.week - b.week))
 */
export default function useSorter(): (value: number) => number {
  const { sort } = useAppState();
  return React.useCallback((value: number) => (sort === 'older' ? value : -value), [sort]);
}

export function useSortProgram(): (a: Pick<ProgramBrowser, 'week'>, b: Pick<ProgramBrowser, 'week'>) => number {
  const sorter = useSorter();
  return (a: Pick<ProgramBrowser, 'week'>, b: Pick<ProgramBrowser, 'week'>) => sorter(a.week - b.week);
}

export function useSortProgramNode(): (a: { node: Pick<ProgramBrowser, 'week'> }, b: { node: Pick<ProgramBrowser, 'week'> }) => number {
  const sorter = useSorter();
  return (a: { node: Pick<ProgramBrowser, 'week'> }, b: { node: Pick<ProgramBrowser, 'week'> }) => sorter(a.node.week - b.node.week);
}

export function useSortPlaylist(): (
  a: Pick<TuneBrowser, 'week' | 'indexInWeek'> | undefined,
  b: Pick<TuneBrowser, 'week' | 'indexInWeek'> | undefined
) => number {
  const sorter = useSorter();
  return (a: Pick<TuneBrowser, 'week' | 'indexInWeek'> | undefined, b: Pick<TuneBrowser, 'week' | 'indexInWeek'> | undefined) =>
    sorter((a?.week ?? 0) - (b?.week ?? 0) || (a?.indexInWeek ?? 0) - (b?.indexInWeek ?? 0));
}
