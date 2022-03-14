/*
import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ProgramCountQuery } from '../../../graphql-types';

export default function useProgramTop25(): ProgramCountQuery['allArtist']['edges'] {
  const data = useStaticQuery<ProgramCountQuery>(graphql`
    query ProgramCount {
      allArtist(
        sort: { fields: [programCount, tunesCount, sortName], order: [DESC, DESC, ASC] }
        limit: 25
        filter: { name: { ne: "スピッツ" } }
      ) {
        edges {
          node {
            id
            image
            kana
            name
            nation
            programCount
            tunesCount
            slug
          }
        }
      }
    }
  `);
  return React.useMemo(() => data.allArtist.edges, [data]);
}
*/
