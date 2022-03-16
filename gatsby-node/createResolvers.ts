import { CreateResolversArgs, Node } from 'gatsby';
import { intQueryFilter, stringQueryFilter, IntQueryOperatorInput, StringQueryOperatorInput } from './utils';
import { GatsbyGraphQLContext } from './graphql';
import { Program, Tune } from '../types';

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
          const artistFilter = artist
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
    },
  };

  createResolvers(resolvers);
}
