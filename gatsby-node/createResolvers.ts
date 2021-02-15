import { CreateResolversArgs, Node } from 'gatsby';
import { GraphQLFieldResolver } from 'gatsby/graphql';
import { PureProgram, PurePlaylist } from './types';
import { intQueryFilter, stringQueryFilter } from './utils';

interface GatsbyNodeModel {
  getAllNodes: <T extends Node>(args: { type: string }) => T[];
  runQuery: <T>(args: { type: string; query: { [key: string]: unknown } }) => Promise<T[]>;
}
interface GatsbyGraphQLContext {
  nodeModel: GatsbyNodeModel;
}
interface GatsbyResolver {
  type?: string | string[];
  args?: Record<string, unknown>;
  resolve: GraphQLFieldResolver<Record<string, unknown>, GatsbyGraphQLContext, Record<string, unknown>>;
}

type GatsbyResolverMap = {
  [typeName: string]: {
    [fieldName: string]: GatsbyResolver;
  };
};

export function onCreateResolvers({ createResolvers }: CreateResolversArgs) {
  const resolvers: GatsbyResolverMap = {
    spitzTunes: {
      append: {
        type: [`program`],
        resolve: (source, args, context, info) => {
          const data = context.nodeModel.getAllNodes<PureProgram>({
            type: 'program',
          });
          return (
            data
              .filter(({ playlist }) =>
                playlist
                  .filter(({ artist }) => artist === 'スピッツ')
                  .map(({ title }) => title)
                  .includes(source.title as string)
              )
              .sort((a, b) => a.week - b.week) ?? []
          );
        },
      },
    },
    Query: {
      allTunes: {
        type: [`programPlaylist`],
        args: {
          year: `IntQueryOperatorInput`,
          corner: `StringQueryOperatorInput`,
          nation: `StringQueryOperatorInput`,
          artist: `StringQueryOperatorInput`,
          title: `StringQueryOperatorInput`,
          selector: `StringQueryOperatorInput`,
        },
        resolve: (source, args, context, info) => {
          const { year, corner, nation, artist, title, selector } = args;
          const allProgram = context.nodeModel.getAllNodes<PureProgram>({ type: `program` });
          const allTunes = allProgram
            .reduce<PurePlaylist[]>((accum, curr) => [...accum, ...curr.playlist], [])
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
