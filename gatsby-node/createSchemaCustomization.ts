import { Node, CreateSchemaCustomizationArgs } from 'gatsby';
import { GatsbyGraphQLContext } from './graphql';
import { Program, SpitzTune } from '../types';

export default async function createSchemaCustomization({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  createTypes(`
    type Artist implements Node @dontInfer {
      name: String!
      kana: String
      image: String
      sortName: String!
      nation: String!
      program: [Program] @link
      tunes: [Tune]!
      programCount: Int!
      tunesCount: Int!
      relatedArtists: [Artist] @link(by: "name")
      slug: String!
    }
    type Program implements Node @dontInfer {
      week: Int!
      year: Int!
      title: String!
      subtitle: String
      guests: [String]
      categories: [String]
      date: Date! @dateformat
      playlist: [Tune]!
    }
    type Tune @dontInfer {
      id: String!
      index: Int
      indexInWeek: Int!
      week: Int!
      title: String!
      artist: Artist @link(by: "name")
      kana: String
      year: Int!
      nation: String!
      label: String
      producer: [String]
      corner: String
      youtube: String
      selector: String!
      program: Program! @link(by: "week", from: "week")
    }
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
  `);

  createTypes(
    schema.buildObjectType({
      name: `SpitzTune`,
      fields: {
        program: {
          type: `[Program]!`,
          resolve: async (source: SpitzTune, args: unknown, context: GatsbyGraphQLContext) => {
            const { entries } = await context.nodeModel.findAll<Program & Node>({
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
