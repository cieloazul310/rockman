import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { removeMultiple } from '../removeMultiple';
import { AllSelectorsQuery } from '../../../graphql-types';

export interface CategoryItem {
  fieldValue: string;
  edges: AllSelectorsQuery['allProgram']['group'][number]['edges'][number][];
  totalCount: number;
}

export function useAllSelectors(): CategoryItem[] {
  const data = useStaticQuery<AllSelectorsQuery>(graphql`
    query AllSelectors {
      allProgram(filter: { playlist: { elemMatch: { selector: { regex: "/^(?!.*草野マサムネ).*$/" } } } }) {
        group(field: playlist___selector) {
          fieldValue
          totalCount
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
                artist {
                  name
                }
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
        const edges = removeMultiple(group.edges, ({ node }) => node.id);
        return {
          fieldValue: group.fieldValue ?? 'selector',
          edges,
          totalCount: group.totalCount,
        };
      })
      .sort((a, b) => b.totalCount - a.totalCount || b.edges.length - a.edges.length);
  }, [data]);
}
