import { Node, CreateSchemaCustomizationArgs } from 'gatsby';
import { GatsbyGraphQLContext } from './graphql';
import { createSlug, createArtistImage, createRelatedArtists } from './utils';
import { Artist, Program, Tune, SpitzTune } from '../types';

export default async function createSchemaCustomization({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  createTypes(`
    type Artist implements Node @dontInfer {
      name: String!
      kana: String
      sortName: String!
      nation: String!
      slug: String!
      program: ArtistProgram!
    }
    type ArtistProgram {
      programs: [Program]!
      programsCount: Int!
      tunes: [Tune]!
      tunesCount: Int!
      image: String
      relatedArtists: [Artist]!
    }
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
  `);

  createTypes(
    schema.buildObjectType({
      name: `Program`,
      fields: {
        slug: {
          type: `String!`,
          resolve: (source: Pick<Program, 'week' | 'year'>) => `/program/${source.year}${source.week.toString().padStart(4, '0')}/`,
        },
        image: {
          type: `String`,
          resolve: (source: Pick<Program, 'playlist'>) => {
            const youtube = source.playlist
              .filter(({ artist }) => artist !== 'スピッツ')
              .reduce<string | null>((accum, curr) => accum ?? curr.youtube, null);
            return youtube ? `https://i.ytimg.com/vi/${youtube}/0.jpg` : null;
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
          resolve: async (source: Pick<Tune, 'artist'>, args: unknown, context: GatsbyGraphQLContext) => {
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

  createTypes(
    schema.buildObjectType({
      name: `Artist`,
      fields: {
        slug: {
          type: `String!`,
          resolve: (source: Pick<Artist, 'name'>) => `/artist/${createSlug(source.name)}/`,
        },
        program: {
          type: `ArtistProgram!`,
          resolve: async (source: Pick<Artist, 'name'>, args: unknown, context: GatsbyGraphQLContext) => {
            const { entries, totalCount } = await context.nodeModel.findAll<Program & Node>({
              type: 'Program',
              query: {
                filter: { playlist: { elemMatch: { artist: { name: { eq: source.name } } } } },
              },
            });
            const programs = Array.from(entries).sort((a, b) => a.week - b.week);
            const programTunes = programs.reduce<Tune[]>((accum, curr) => [...accum, ...curr.playlist], []);
            const tunes = programTunes.filter(({ artist }) => artist === source.name);

            return {
              programs: programs.map(({ playlist, ...program }) => ({
                ...program,
                playlist: playlist.filter(({ artist }) => artist === source.name),
              })),
              programsCount: await totalCount(),
              tunes,
              tunesCount: tunes.length,
              image: createArtistImage(tunes),
              relatedArtists: await createRelatedArtists(source.name, programTunes, context),
            };
          },
        },
      },
    })
  );

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
