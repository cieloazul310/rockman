import { CreateResolversArgs, Node } from 'gatsby';
import { GraphQLFieldResolver } from 'gatsby/graphql';
import { Program, ProgramPlaylist } from './types';
import { intQueryFilter } from './utils';

interface GatsbyNodeModel {
  getAllNodes: <T extends Node>(args: { type: string }) => T[];
}
interface GatsbyGraphQLContext {
  nodeModel: GatsbyNodeModel;
}
/*
type GatsbyResolverArgs<T extends Record<string, unknown>> = {
  [key in keyof T]: unknown;
};
*/
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
    Query: {
      allTunes: {
        type: [`programPlaylist`],
        args: {
          year: `IntQueryOperatorInput`,
          corner: `String`,
          nation: `String`,
          artist: `String`,
        },
        resolve: (source, args, context, info) => {
          const { year, corner, nation, artist } = args;
          const allProgram = context.nodeModel.getAllNodes<Program>({ type: `program` });
          const allTunes = allProgram
            .reduce<ProgramPlaylist[]>((accum, curr) => [...accum, ...curr.playlist], [])
            .sort((a, b) => a.week - b.week || a.indexInWeek - b.indexInWeek);

          return allTunes
            .filter((tune) => (artist ? tune.artist.name === artist : true))
            .filter((tune) => intQueryFilter(year)(tune.year))
            .filter((tune) => (corner ? tune.corner === corner : true))
            .filter((tune) => (nation ? tune.nation === nation : true));
        },
      },
    },
  };

  createResolvers(resolvers);
}
