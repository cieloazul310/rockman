import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { QueriedProgram, ArtistItem } from '../../types';
import { AllDataQuery, ProgramPlaylist } from '../../../graphql-types';

export default function useAllPrograms(): QueriedProgram[] {
  console.log('useAllPrograms');
  const data = useStaticQuery<AllDataQuery>(graphql`
    query {
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
  return React.useMemo(() => data.allProgram.edges.map(({ node }) => node), []);
}

export function useAllTunes(): ProgramPlaylist[] {
  console.log('useAllTunes');
  const programs = useAllPrograms();
  return React.useMemo(
    () => programs.reduce((accum, curr) => [...accum, ...curr.playlist], []),
    []
  );
}

export function useAllArtists(): ArtistItem[] {
  console.log('useAllArtists');
  const allTunes = useAllTunes();
  return React.useMemo(
    () =>
      allTunes.reduce<ArtistItem[]>((accum, curr) => {
        const existedIndex = accum.map(d => d[0]).indexOf(curr.artist);
        if (existedIndex < 0) {
          return [...accum, [curr.artist, curr.kana, curr.nation, [curr]]];
        } else {
          accum[existedIndex][3].push(curr);
          return accum;
        }
      }, []),
    []
  );
}
