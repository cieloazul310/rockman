import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { isSchemeNations } from '../getNationColor';
import { AllNationsQuery } from '../../../graphql-types';

export function useAllNations() {
  const { group } = useStaticQuery<AllNationsQuery>(graphql`
    query AllNations {
      allArtist(filter: { name: { ne: "スピッツ" } }) {
        group(field: nation) {
          fieldValue
          totalCount
          edges {
            node {
              tunesCount
            }
          }
        }
      }
    }
  `).allArtist;

  return React.useMemo(() => {
    return group
      .map(({ fieldValue, totalCount, edges }) => ({
        nation: fieldValue,
        totalCount,
        tunesCount: edges.reduce((accum, curr) => accum + curr.node.tunesCount, 0),
      }))
      .sort((a, b) => b.totalCount - a.totalCount || (a.nation ?? '').localeCompare(b.nation ?? ''));
  }, [group]);
}

export function useSchemeNations() {
  const allNations = useAllNations();
  return React.useMemo(() => {
    const schemed = allNations.filter(({ nation }) => isSchemeNations(nation ?? ''));
    const notSchemed = allNations
      .filter(({ nation }) => !isSchemeNations(nation ?? ''))
      .reduce(
        (accum, curr) => ({
          ...accum,
          totalCount: accum.totalCount + curr.totalCount,
          tunesCount: accum.tunesCount + curr.tunesCount,
        }),
        { nation: 'others', totalCount: 0, tunesCount: 0 }
      );
    return [...schemed, notSchemed];
  }, [allNations]);
}
