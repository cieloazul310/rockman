import * as React from 'react';
import { useAppState } from '../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { Maybe, Program, ProgramPlaylist } from '../../graphql-types';

/** usage
 * const sorter = useSorter();
 * programs.sort((a, b) => sorter(a.week - b.week))
 */
export default function useSorter(): (value: number) => number {
  const { sort } = useAppState();
  return React.useCallback((value: number) => (sort === 'older' ? value : -value), [sort]);
}

export function useSortProgram(): (a: Maybe<Pick<Program, 'week'>>, b: Maybe<Pick<Program, 'week'>>) => number {
  const sorter = useSorter();
  return (a: Maybe<Pick<Program, 'week'>>, b: Maybe<Pick<Program, 'week'>>) => sorter((a?.week ?? 0) - (b?.week ?? 0));
}

export function useSortProgramNode(): (a: { node: Maybe<Pick<Program, 'week'>> }, b: { node: Maybe<Pick<Program, 'week'>> }) => number {
  const sorter = useSorter();
  return (a: { node: Maybe<Pick<Program, 'week'>> }, b: { node: Maybe<Pick<Program, 'week'>> }) =>
    sorter((a?.node?.week ?? 0) - (b?.node?.week ?? 0));
}

export function useSortPlaylist(): (
  a: Maybe<Pick<ProgramPlaylist, 'week' | 'indexInWeek'>> | undefined,
  b: Maybe<Pick<ProgramPlaylist, 'week' | 'indexInWeek'>> | undefined
) => number {
  const sorter = useSorter();
  return (
    a: Maybe<Pick<ProgramPlaylist, 'week' | 'indexInWeek'>> | undefined,
    b: Maybe<Pick<ProgramPlaylist, 'week' | 'indexInWeek'>> | undefined
  ) => sorter((a?.week ?? 0) - (b?.week ?? 0) || (a?.indexInWeek ?? 0) - (b?.indexInWeek ?? 0));
}
