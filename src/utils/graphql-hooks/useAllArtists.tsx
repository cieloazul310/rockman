import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { AllArtistsQuery } from '../../../graphql-types';

export function useAllArtists() {
  const data = useStaticQuery<AllArtistsQuery>(graphql`
    query AllArtists {
      allProgram(sort: { fields: date, order: ASC }) {
        group(field: playlist___artist) {
          edges {
            node {
              id
              playlist {
                artist
              }
            }
          }
          fieldValue
        }
      }
    }
  `);
  return React.useMemo(() => {
    return data.allProgram.group.map(item => ({
      artist: item.fieldValue,
      edges: item.edges.map(({ node }) => ({
        ...node,
        playlist: node.playlist.filter(
          ({ artist }) => artist === item.fieldValue
        ),
      })),
    }));
  }, []);
}
