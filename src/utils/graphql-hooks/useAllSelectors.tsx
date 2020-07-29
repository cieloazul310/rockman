import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { AllSelectorsQuery } from '../../../graphql-types';

type SelectorsGroup = AllSelectorsQuery['allProgram']['group'][number];
type SelectorsEdge = SelectorsGroup['edges'][number];
type SelectorsPlaylist = NonNullable<SelectorsEdge['node']['playlist']>[number];

export interface CategoryItem {
  fieldValue: string;
  edges: SelectorsEdge[];
  playlist: SelectorsPlaylist[];
}

export function useAllSelectors(): CategoryItem[] {
  const data = useStaticQuery<AllSelectorsQuery>(graphql`
    query AllSelectors {
      allProgram {
        group(field: playlist___selector) {
          fieldValue
          edges {
            node {
              id
              week
              date(formatString: "YYYY-MM-DD")
              title
              fields {
                slug
              }
              playlist {
                id
                indexInWeek
                title
                artist
                year
                nation
                selector
                youtube
                corner
              }
            }
          }
        }
      }
    }
  `);

  return React.useMemo(() => {
    return data.allProgram.group
      .filter((group) => group.fieldValue !== '草野マサムネ')
      .map((group) => {
        const edges = removeMultiple(group.edges);
        return {
          fieldValue: group.fieldValue ?? 'selector',
          edges,
          playlist: edges.reduce<SelectorsPlaylist[]>(
            (accum, curr) =>
              curr.node.playlist ? [...accum, ...curr.node.playlist.filter((tune) => tune?.selector === group.fieldValue)] : [...accum],
            []
          ),
        };
      })
      .sort((a, b) => b.playlist.length - a.playlist.length || b.edges.length - a.edges.length);
  }, [data]);
}

function removeMultiple(edges: SelectorsEdge[]) {
  return edges.reduce<SelectorsEdge[]>((accum, curr) => {
    if (accum.map((d) => d.node.id).indexOf(curr.node.id) >= 0) return accum;
    return [...accum, curr];
  }, []);
}
