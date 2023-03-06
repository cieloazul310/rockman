import type { CreateSchemaCustomizationArgs } from 'gatsby';
import type { GatsbyGraphQLContext } from '../graphql';
import createArtistSchemaCustomization from './artist';
import createProgramSchemaCustomization from './program';
import type { Program, SpitzTune } from '../../../types';

export default async function createSchemaCustomization(schemaCustomizationArgs: CreateSchemaCustomizationArgs) {
  const { actions, schema } = schemaCustomizationArgs;
  const { createTypes } = actions;

  await createArtistSchemaCustomization(schemaCustomizationArgs);
  await createProgramSchemaCustomization(schemaCustomizationArgs);

  createTypes(`
    type SpitzAlbum implements Node @dontInfer {
      albumIdNum: Int!
      year: Int!
      title: String!
      tunes: [SpitzTune!]!
    }
    type SpitzTune {
      id: String!
      index: Int!
      title: String!
      program: [Program]!
    }
    type AllTunes {
      totalCount: Int!
      tunes: [Tune]!
    }
    type Selector {
      name: String!
      programs: [Program]!
      programsCount: Int!
      tunesCount: Int!
    }
  `);

  createTypes(
    schema.buildObjectType({
      name: `SpitzTune`,
      fields: {
        program: {
          type: `[Program]!`,
          resolve: async (source: SpitzTune, args: unknown, context: GatsbyGraphQLContext) => {
            const { entries } = await context.nodeModel.findAll<Program<'node'>>({
              type: 'Program',
              query: {
                filter: { playlist: { elemMatch: { title: { eq: source.title } } } },
              },
            });
            return Array.from(entries)
              .filter(({ playlist }) =>
                playlist
                  .filter(({ artist }) => artist === 'スピッツ')
                  .map(({ title }) => title)
                  .includes(source.title)
              )
              .sort((a, b) => a.week - b.week);
          },
        },
      },
    })
  );
}
