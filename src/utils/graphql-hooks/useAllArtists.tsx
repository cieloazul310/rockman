import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { AllArtistsQuery } from '../../../graphql-types';

export function useAllArtists() {
  const data = useStaticQuery<AllArtistsQuery>(graphql`
    query AllArtists {
      allArtist(sort: { fields: sortName, order: ASC }, filter: { name: { ne: "スピッツ" } }) {
        edges {
          node {
            id
            image
            kana
            name
            nation
            programCount
            tunesCount
            program {
              date(formatString: "YYYY-MM-DD")
              week
            }
            tunes {
              title
              year
              week
            }
          }
        }
      }
    }
  `);
  return React.useMemo(() => data.allArtist.edges, [data]);
}

export type ArtistItem = ReturnType<typeof useAllArtists>[number];
