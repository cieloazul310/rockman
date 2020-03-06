import * as React from 'react';
import { Program, ProgramPlaylist } from '../../graphql-types';

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
  programs: Program[],
  divisor: number,
  filter: (tune: ProgramPlaylist) => boolean = () => true
): Program[][] {
  return React.useMemo(() => {
    let count = 0;
    let newItem = [];
    for (let i = 0; i < programs.length; i++) {
      const filtered = {
        ...programs[i],
        playlist: programs[i].playlist.filter(filter),
      };
      if (count === 0) {
        newItem.push([filtered]);
      } else if (count < 15) {
        newItem[newItem.length - 1].push(filtered);
      } else {
        count = 0;
        newItem.push([filtered]);
      }
      count += filtered.playlist.length;
    }
    return newItem;
  }, [programs, divisor]);
}
