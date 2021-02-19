import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { TunesCountQuery } from '../../../graphql-types';

export default function useTunesTop25(): TunesCountQuery['allArtist']['edges'] {
  const data = useStaticQuery<TunesCountQuery>(graphql`
    query TunesCount {
      allArtist(sort: { fields: [tunesCount, sortName], order: [DESC, ASC] }, limit: 25, filter: { name: { ne: "スピッツ" } }) {
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
