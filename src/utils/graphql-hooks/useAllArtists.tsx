import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { AllArtistsQuery } from '../../../graphql-types';

export type ArtistItem = AllArtistsQuery['allArtist']['edges'][number];

export function useAllArtists(): ArtistItem[] {
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
            slug
          }
        }
      }
    }
  `);
  return React.useMemo(() => data.allArtist.edges, [data]);
}
