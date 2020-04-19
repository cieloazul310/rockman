import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import {
  QueriedProgram,
  ArtistItem,
  CategoryItem,
  CornerItem,
  SelectorItem,
} from '../../types';
import { getProgramsContainsValue, filterPlaylist } from '../filterPlaylist';
import { AllProgramQuery, ProgramPlaylist } from '../../../graphql-types';

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
      const [img] = node.playlist.filter((tune, index) => index !== 0 && tune.youtube && tune.youtube !== '').map(tune => tune.youtube);
      return { 
        ...node, 
        img: img ? `https://i.ytimg.com/vi/${img}/0.jpg` : null
      };
    });
  }, []);
}
/*
export function useAllTunes(): ProgramPlaylist[] {
  //console.log('useAllTunes');
  const programs = useAllPrograms();
  return React.useMemo(() => {
    //console.log('useAllTunes useMemo');
    return programs.reduce((accum, curr) => [...accum, ...curr.playlist], []);
  }, []);
}
*/
/*
export function useAllArtists(): ArtistItem[] {
  console.log('useAllArtists');
  const allTunes = useAllTunes();
  return React.useMemo(() => {
    console.log('useAllArtists useMemo');
    return allTunes.reduce<ArtistItem[]>((accum, curr) => {
      const existedIndex = accum.map(d => d[0]).indexOf(curr.artist);
      if (existedIndex < 0) {
        return [...accum, [curr.artist, curr.kana, curr.nation, [curr]]];
      } else {
        accum[existedIndex][3].push(curr);
        return accum;
      }
    }, []);
  }, []);
}
*/
/*
export function useCategories(): CategoryItem[] {
  //console.log('useCategories');
  const programs = useAllPrograms();
  return React.useMemo(() => {
    console.log('useCategories useMemo');
    const categories: CategoryItem[] = [];
    programs
      .filter(program => program.categories.length)
      .forEach(program => {
        program.categories.forEach(category => {
          const existedIndex = categories.map(d => d[0]).indexOf(category);
          if (existedIndex < 0) {
            categories.push([category, [program]]);
          } else {
            categories[existedIndex][1].push(program);
          }
        });
      });
    return categories.sort((a, b) => b[1].length - a[1].length);
  }, []);
}
*/
/*
export function useCorners(): CornerItem[] {
  //console.log('useCorners');
  const programs = useAllPrograms();
  const allTunes = useAllTunes();
  return React.useMemo(() => {
    //console.log('useCorners useMemo');
    return allTunes
      .filter(tune => tune.corner !== '')
      .reduce<CornerItem[]>((accum, curr) => {
        const existedIndex = accum.map(d => d[0]).indexOf(curr.corner);
        if (existedIndex < 0) {
          const programsContainsCorner = getProgramsContainsValue(
            'corner',
            curr.corner
          )(programs);

          return [
            ...accum,
            [
              curr.corner,
              programsContainsCorner,
              filterPlaylist('corner', curr.corner)(programsContainsCorner)
                .length,
            ],
          ];
        } else {
          return accum;
        }
      }, [])
      .sort((a, b) => b[2] - a[2]);
  }, []);
}
*/
/*
export function useSelectors(): SelectorItem[] {
  //console.log('useSelectors');
  const programs = useAllPrograms();
  const allTunes = useAllTunes();
  return React.useMemo(() => {
    //console.log('useSelectors useMemo');
    return allTunes
      .filter(d => d.selector.length && d.selector !== '草野マサムネ')
      .reduce<SelectorItem[]>((accum, curr) => {
        const existedIndex = accum.map(d => d[0]).indexOf(curr.selector);
        if (existedIndex < 0) {
          const programsContainsSelector = getProgramsContainsValue(
            'selector',
            curr.selector
          )(programs);
          return [
            ...accum,
            [
              curr.selector,
              programsContainsSelector,
              filterPlaylist(
                'selector',
                curr.selector
              )(programsContainsSelector).length,
            ],
          ];
        } else {
          return accum;
        }
      }, [])
      .sort((a, b) => b[2] - a[2]);
  }, []);
}
*/
