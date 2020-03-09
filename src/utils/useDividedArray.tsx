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
  const sorter = useSorter()
  return React.useMemo(() => {
    return programs
      .sort((a, b) => sorter(a.week - b.week))
      .reduce((accum, curr, index) => {
        const filtered = {
          ...curr,
          playlist: curr.playlist.filter(filter)
        };
        if (index === 0) {
          return [[filtered]];
        }
        if (accum[accum.length - 1].length < divisor) {
          accum[accum.length - 1].push(filtered);
          return accum;
        } else {
          return [...accum, [filtered]];
        }
      }, []);
    /*
    let count = 0;
    let newItem = [];
    for (let i = 0; i < programs.length; i++) {
      const filtered = {
        ...programs[i],
        playlist: programs[i].playlist.filter(filter),
      };
      if (count === 0) {
        newItem.push([filtered]);
      } else if (count < divisor) {
        newItem[newItem.length - 1].push(filtered);
      } else {
        count = 0;
        newItem.push([filtered]);
      }
      count += filtered.playlist.length;
    }
    return newItem;
    */
  }, [programs, divisor, filter, sorter]);
}
