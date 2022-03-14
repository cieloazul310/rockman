import { CreateResolversArgs, Node } from 'gatsby';
import { intQueryFilter, stringQueryFilter, IntQueryOperatorInput, StringQueryOperatorInput } from './utils';
import { GatsbyGraphQLContext } from './graphql';
import { Program, Tune, SpitzTune } from '../types';

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
    /*
    SpitzTune: {
      append: {
        type: [`Program`],
        resolve: async (source: SpitzTune, args: unknown, context: GatsbyGraphQLContext) => {
          const { entries } = await context.nodeModel.findAll<Program & Node>({
            type: 'Program',
            query: { sort: { field: 'week', order: 'ASC' } },
          });
          const programs = Array.from(entries);
          return programs.filter(({ playlist }) =>
            playlist
              .filter(({ artist }) => artist === 'スピッツ')
              .map(({ title }) => title)
              .includes(source.title)
          );
        },
      },
    },
    */
    Query: {
      allTunes: {
        type: [`Tune`],
        args: {
          year: `IntQueryOperatorInput`,
          corner: `StringQueryOperatorInput`,
          nation: `StringQueryOperatorInput`,
          artist: `StringQueryOperatorInput`,
          title: `StringQueryOperatorInput`,
          selector: `StringQueryOperatorInput`,
        },
        resolve: async (source: unknown, args: AllTunesQueryArgs, context: GatsbyGraphQLContext) => {
          const { year, corner, nation, artist, title, selector } = args;
          const { entries } = await context.nodeModel.findAll<Program & Node>({
            type: `Program`,
            query: {
              sort: { field: 'week', order: 'ASC' },
            },
          });
          const allProgram = Array.from(entries);
          /*
          const allProgram = context.nodeModel.getAllNodes<Program & Node>({ type: `program` });
          */

          const allTunes = allProgram
            .reduce<Tune[]>((accum, curr) => [...accum, ...curr.playlist], [])
            .sort((a, b) => a.week - b.week || a.indexInWeek - b.indexInWeek);

          return allTunes
            .filter((tune) => stringQueryFilter(title)(tune.title))
            .filter((tune) => stringQueryFilter(artist)(tune.artist))
            .filter((tune) => intQueryFilter(year)(tune.year))
            .filter((tune) => stringQueryFilter(corner)(tune.corner ?? ''))
            .filter((tune) => stringQueryFilter(nation)(tune.nation))
            .filter((tune) => stringQueryFilter(selector)(tune.selector));
        },
      },
    },
  };

  createResolvers(resolvers);
}
