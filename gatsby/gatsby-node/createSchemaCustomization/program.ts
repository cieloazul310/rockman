import * as path from 'path';
import type { CreateSchemaCustomizationArgs } from 'gatsby';
import type { GatsbyGraphQLContext } from '../graphql';
import type { Program, Tune } from '../../../types';

export default async function createProgramSchemaCustomization({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  createTypes(`
    type Program implements Node @dontInfer {
      week: Int!
      year: Int!
      slug: String!
      date: Date! @dateformat
      title: String!
      subtitle: String
      image: String
      guests: [String]
      categories: [String]
      playlist: [Tune]!
    }
    type Tune @dontInfer {
      id: String!
      index: Int
      indexInWeek: Int!
      week: Int!
      title: String!
      artist: Artist!
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
  `);

  createTypes(
    schema.buildObjectType({
      name: `Program`,
      fields: {
        slug: {
          type: `String!`,
          resolve: (source: Pick<Program<'node'>, 'week' | 'year'>) =>
            path.join('/program', `${source.year}${source.week.toString().padStart(4, '0')}`),
        },
        image: {
          type: `String`,
          resolve: (source: Pick<Program<'node'>, 'playlist'>) => {
            const youtube = source.playlist
              .filter(({ artist }) => artist !== 'スピッツ')
              .reduce<string | null>((accum, curr) => accum || curr.youtube, null);
            if (youtube) return `https://i.ytimg.com/vi/${youtube}/0.jpg`;

            const youtubeSpitz = source.playlist
              .filter(({ artist }) => artist === 'スピッツ')
              .reduce<string | null>((accum, curr) => accum || curr.youtube, null);
            return youtubeSpitz ? `https://i.ytimg.com/vi/${youtubeSpitz}/0.jpg` : null;
          },
        },
      },
    })
  );

  createTypes(
    schema.buildObjectType({
      name: `Tune`,
      fields: {
        artist: {
          type: `Artist!`,
          resolve: async (source: Pick<Tune<'node'>, 'artist'>, args: unknown, context: GatsbyGraphQLContext) => {
            if (source.artist === 'スピッツ') {
              return {
                name: 'スピッツ',
                sortName: 'すぴっつ',
                nation: 'JPN',
                slug: '/takeoff/',
                program: {
                  programs: [],
                  programsCount: 0,
                  tunes: [],
                  tunesCount: 0,
                  relatedArtists: [],
                },
              };
            }
            const node = await context.nodeModel.findOne({
              type: `Artist`,
              query: {
                filter: {
                  name: { eq: source.artist },
                },
              },
            });
            return node;
          },
        },
      },
    })
  );
}
