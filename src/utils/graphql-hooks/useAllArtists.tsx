import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import sortArtists, { SortType } from '../sortByYomi';
import { AllArtistsQuery } from '../../../graphql-types';

<<<<<<< HEAD
type ArtistGroup = AllArtistsQuery['allProgram']['group'][number];
type ArtistEdge = ArtistGroup['edges'][number];
type ArtistTune = NonNullable<NonNullable<ArtistEdge['node']['playlist']>[number]>;

export interface ArtistItem {
  fieldValue: string;
  kana?: string;
  nation: string;
  edges: ArtistEdge[];
  tunes: ArtistTune[];
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
=======
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
>>>>>>> develop
          }
          fieldValue
        }
      }
    }
  `);
  return React.useMemo(() => {
    return data.allProgram.group.map((item) => {
      const edges = removeMultiple(item.edges).map(({ node }) => ({
        ...node,
        playlist: (node?.playlist?.filter((tune) => tune?.artist === item.fieldValue) ?? []) as ArtistTune[],
      }));
      const tunes = edges.reduce<ArtistTune[]>((accum, curr) => (curr.playlist ? [...accum, ...curr.playlist] : accum), []);
      const [{ kana, nation }] = tunes;
      const [img] = tunes
        .filter((tune) => tune?.youtube && tune.youtube !== '')
        .map((tune) => tune?.youtube)
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

function removeMultiple(edges: ArtistEdge[]) {
  return edges.reduce<ArtistEdge[]>((accum, curr) => {
    if (accum.map((d) => d.node.id).indexOf(curr.node.id) >= 0) return accum;
    return [...accum, curr];
  }, []);
}
<<<<<<< HEAD

export function useArtists(sortType: SortType, limit = 0) {
  const allArtists = useAllArtists();
  return React.useMemo(() => {
    return sortArtists(allArtists, { sortType }).slice(0, limit || allArtists.length);
  }, [sortType, limit, allArtists]);
}
=======
>>>>>>> develop
