import * as React from 'react';
import { useAllPrograms, ProgramEdge } from './useAllPrograms';

export function useAllTunes() {
  const allProgram = useAllPrograms();
  type Playlist = NonNullable<ProgramEdge['node']['playlist']>;
  return React.useMemo(() => allProgram.reduce<Playlist>((accum, curr) => (curr.playlist ? [...accum, ...curr.playlist] : accum), []), [
    allProgram,
  ]);
}
