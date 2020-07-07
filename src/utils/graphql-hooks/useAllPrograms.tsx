import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { QueriedProgram } from '../../types';
import { AllProgramQuery } from '../../../graphql-types';

export function useAllPrograms(): QueriedProgram[] {
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
              name
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
    return data.allProgram.edges.map(({ node }) => {
      const [img] = node.playlist.filter((tune, index) => index !== 0 && tune.youtube && tune.youtube !== '').map((tune) => tune.youtube);
      return {
        ...node,
        img: img ? `https://i.ytimg.com/vi/${img}/0.jpg` : null,
      };
    });
  }, [data.allProgram.edges]);
}
