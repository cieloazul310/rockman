import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { AllProgramQuery } from '../../../graphql-types';

export function useAllPrograms() {
  const data = useStaticQuery<AllProgramQuery>(graphql`
    query AllProgram {
      allProgram(sort: { fields: week, order: ASC }) {
        edges {
          node {
            id
            title
            date(formatString: "YYYY-MM-DD")
            categories
            fields {
              slug
              image
            }
            guests
            playlist {
              artist
              corner
              id
              indexInWeek
              index
              kana
              label
              nation
              producer
              selector
              title
              week
              year
              youtube
            }
            subtitle
            week
            year
          }
        }
      }
    }
  `);
  return React.useMemo(() => {
    return data.allProgram.edges.map(({ node }) => node);
  }, [data.allProgram.edges]);
}
