import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ProgramCountQuery } from '../../../graphql-types';

export type ProgramTop25Artist = ProgramCountQuery['allArtist']['edges'][number];

export function useProgramTop25(): ProgramTop25Artist[] {
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
          }
        }
      }
    }
  `);
  return React.useMemo(() => data.allArtist.edges, [data]);
}
