import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import iso from 'iso-3166-1';
import { isSchemeNations } from '../useNationColor';

function parseNationToIsoAlpha3(nation: string) {
  if (nation === 'UK') return 'GBR';
  if (nation === 'US') return 'USA';
  if (nation === 'FR') return 'FRA';
  if (nation === 'GER') return 'DEU';
  if (nation === 'IRE') return 'IRL';
  if (nation === 'NED') return 'NLD';
  if (nation === 'NZ') return 'NZL';
  return nation;
}

function parseNation(nation: string) {
  const country = iso.whereAlpha3(parseNationToIsoAlpha3(nation));
  if (!country) throw new Error(`${nation} is not iso alpha-3 code.`);
  return country;
}

export function useParseNation(nation: string) {
  return parseNation(nation);
}

type AllNationQueryData = {
  allArtist: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
};

export function useAllNations() {
  const { allArtist } = useStaticQuery<AllNationQueryData>(graphql`
    query AllNations {
      allArtist(filter: { name: { ne: "スピッツ" } }) {
        group(field: { nation: SELECT }) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return React.useMemo(() => {
    return allArtist.group
      .map((group) => {
        const country = parseNation(group.fieldValue);
        return {
          ...group,
          ...country,
        };
      })
      .sort((a, b) => b.totalCount - a.totalCount || a.country.localeCompare(b.country));
  }, [allArtist]);
}

export function useSchemeNations() {
  const allNations = useAllNations();
  return React.useMemo(() => {
    const schemed = allNations.filter(({ fieldValue }) => isSchemeNations(fieldValue));
    const notSchemed = allNations.filter(({ fieldValue }) => !isSchemeNations(fieldValue));
    return { schemed, notSchemed };
  }, [allNations]);
}
