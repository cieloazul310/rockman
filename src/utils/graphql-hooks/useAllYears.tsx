import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useAllTunes } from './useAllTunes';
import { AllYearsQuery } from '../../../graphql-types';

export function useAllYears() {
  const allTunes = useAllTunes();
  const data = useStaticQuery<AllYearsQuery>(graphql`
    query AllYears {
      allProgram {
        group(field: playlist___year) {
          fieldValue
        }
      }
    }
  `);
  return React.useMemo(
    () =>
      data.allProgram.group.map(({ fieldValue }) => ({
        fieldValue: fieldValue,
        tunes: allTunes.filter((tune) => tune?.year === parseInt(fieldValue ?? '0', 10)),
      })),
    [allTunes, data]
  );
}

export function useDecades(years: number[] = []) {
  years.forEach((year) => {
    if (year % 10 !== 0) throw new Error();
  });
  const allYears = useAllYears();

  return React.useMemo(() => {
    const first = Math.floor(parseInt(allYears[0].fieldValue ?? '1960', 10) / 10) * 10;
    const last = Math.floor(new Date().getFullYear() / 10) * 10;
    const decades = years.length ? years : Array.from({ length: (last - first) / 10 + 1 }, (_, i) => first + i * 10);
    return decades.map((decade) => {
      const items = allYears.filter(({ fieldValue }) => Math.floor(parseInt(fieldValue ?? '0', 10) / 10) === decade / 10);
      return {
        fieldValue: `${decade}s`,
        value: items.reduce((accum, curr) => accum + curr.tunes.length, 0),
        items,
      };
    });
  }, [allYears, years]);
}
