import * as React from 'react';
import { useAppState } from 'gatsby-theme-aoi-top-layout/src/utils/AppStateContext';

export default function useSorter() {
  const { sort } = useAppState();
  return React.useCallback(
    (value: number) => (sort === 'older' ? value : -value),
    [sort]
  );
}
/** usage
 * const sorter = useSorter();
 * programs.sort((a, b) => sorter(a.week - b.week))
 */
