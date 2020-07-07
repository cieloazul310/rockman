import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import sortArtists, { SortType } from '../sortByYomi';
import { AllArtistsQuery, Program, ProgramPlaylist } from '../../../graphql-types';

export interface ArtistItem {
  fieldValue: string;
  kana?: string;
  nation: string;
  edges: ArtistEdge[];
  tunes: ProgramPlaylist[];
  img?: string;
}

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
                kana
                nation
                youtube
              }
            }
          }
          fieldValue
        }
      }
    }
  `);
  return React.useMemo(() => {
    return data.allProgram.group.map((item) => {
      const edges = removeMultiple(item.edges as ArtistEdge[]).map(({ node }) => ({
        ...node,
        playlist: node?.playlist?.filter(({ artist }) => artist === item.fieldValue) ?? [],
      }));
      const tunes = edges.reduce<ArtistPlaylist[]>((accum, curr) => [...accum, ...curr.playlist], []);
      const [{ kana, nation }] = tunes;
      const [img] = tunes
        .filter((tune) => tune.youtube && tune.youtube !== '')
        .map((tune) => tune.youtube)
        .slice(-1);

      return {
        fieldValue: item.fieldValue ?? '',
        kana: kana ?? undefined,
        nation: nation ?? '',
        edges,
        tunes,
        img: img ? `https://i.ytimg.com/vi/${img}/0.jpg` : undefined,
      };
    });
  }, [data]);
}

interface ArtistEdge {
  node: Pick<Program, 'id'> & {
    playlist?: ArtistPlaylist[];
  };
}

type ArtistPlaylist = Pick<ProgramPlaylist, 'artist' | 'kana' | 'nation' | 'youtube'>;

function removeMultiple(edges: ArtistEdge[]) {
  return edges.reduce<ArtistEdge[]>((accum, curr) => {
    if (accum.map((d) => d.node.id).indexOf(curr.node.id) >= 0) return accum;
    return [...accum, curr];
  }, []);
}

export function useArtists(sortType: SortType, limit = 0) {
  const allArtists = useAllArtists();
  return React.useMemo(() => {
    return sortArtists(allArtists, { sortType }).slice(0, limit || allArtists.length);
  }, [sortType, limit, allArtists]);
}
