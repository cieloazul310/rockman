import type { CreateResolversArgs, Node } from 'gatsby';
import { intQueryFilter, stringQueryFilter, type IntQueryOperatorInput, type StringQueryOperatorInput } from './utils';
import type { GatsbyGraphQLContext } from './graphql';
import type { Program, Tune } from '../../types';

type AllTunesQueryArgs = {
  year: IntQueryOperatorInput;
  corner: StringQueryOperatorInput;
  nation: StringQueryOperatorInput;
  artist: StringQueryOperatorInput;
  title: StringQueryOperatorInput;
  selector: StringQueryOperatorInput;
};

export default async function onCreateResolvers({ createResolvers }: CreateResolversArgs) {
  const resolvers = {
    Query: {
      allTunes: {
        type: `AllTunes`,
        args: {
          year: `IntQueryOperatorInput`,
          corner: `StringQueryOperatorInput`,
          nation: `StringQueryOperatorInput`,
          artist: `StringQueryOperatorInput`,
          title: `StringQueryOperatorInput`,
          selector: `StringQueryOperatorInput`,
        },
        resolve: async (source: unknown, { artist, ...otherArgs }: AllTunesQueryArgs, context: GatsbyGraphQLContext) => {
          const { year, corner, nation, title, selector } = otherArgs;
          const artistFilter =
            artist && !(artist.ne || artist.nin)
              ? {
                  artist: {
                    name: artist,
                  },
                }
              : {};
          const { entries } = await context.nodeModel.findAll<Program & Node>({
            type: `Program`,
            query: {
              filter: {
                playlist: {
                  elemMatch: {
                    ...otherArgs,
                    ...artistFilter,
                  },
                },
              },
            },
          });

          const allProgram = Array.from(entries);
          const allTunes = allProgram
            .reduce<Tune[]>((accum, curr) => [...accum, ...curr.playlist], [])
            .sort((a, b) => a.week - b.week || a.indexInWeek - b.indexInWeek)
            .filter((tune) => stringQueryFilter(title)(tune.title))
            .filter((tune) => stringQueryFilter(artist)(tune.artist))
            .filter((tune) => intQueryFilter(year)(tune.year))
            .filter((tune) => stringQueryFilter(corner)(tune.corner ?? ''))
            .filter((tune) => stringQueryFilter(nation)(tune.nation))
            .filter((tune) => stringQueryFilter(selector)(tune.selector));

          return { totalCount: allTunes.length, tunes: allTunes };
        },
      },
      allSelectors: {
        type: `[Selector]`,
        resolve: async (source: unknown, args: unknown, context: GatsbyGraphQLContext) => {
          const { entries } = await context.nodeModel.findAll<Program & Node>({
            type: `Program`,
            query: {
              filter: { playlist: { elemMatch: { selector: { regex: '/^(?!.*草野マサムネ).*$/' } } } },
            },
          });
          const allPrograms = Array.from(entries).sort((a, b) => a.week - b.week);
          const allSelectorNames = new Set(
            allPrograms.reduce<string[]>((accum, curr) => [...accum, ...curr.playlist.map(({ selector }) => selector)], [])
          );
          allSelectorNames.delete('草野マサムネ');
          const allSelectors = Array.from(allSelectorNames, (name) => {
            const programs = allPrograms
              .filter(({ playlist }) => playlist.map(({ selector }) => selector).includes(name))
              .map<Program & Node>(({ playlist, ...program }) => ({
                ...program,
                playlist: playlist.filter(({ selector }) => selector === name),
              }));

            return {
              name,
              programs,
              programsCount: programs.length,
              tunesCount: programs.reduce((accum, curr) => accum + curr.playlist.length, 0),
            };
          });
          return allSelectors.sort((a, b) => b.tunesCount - a.tunesCount);
        },
      },
    },
  };

  createResolvers(resolvers);
}
