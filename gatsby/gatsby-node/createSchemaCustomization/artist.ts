import * as path from "path";
import type { CreateSchemaCustomizationArgs } from "gatsby";
import type { GatsbyGraphQLContext } from "../graphql";
import type { Artist, Program, Tune } from "../../../types";

export function createSlug(str: string) {
  return str.replace("&", "and").replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "");
}

export function createArtistImage(tunes: Tune<"node">[]) {
  const youtube = tunes.reduce<string | null>((accum, curr) => {
    return curr.youtube || accum;
  }, null);
  return youtube ? `https://i.ytimg.com/vi/${youtube}/0.jpg` : null;
}

export async function createRelatedArtists(
  name: string,
  playlist: Tune<"node">[],
  { nodeModel }: GatsbyGraphQLContext,
) {
  const artists = playlist
    .filter(({ artist }) => artist !== "スピッツ" && artist !== name)
    .map(({ artist }) => artist);
  const input = Array.from(new Set(artists));

  const { entries } = await nodeModel.findAll<Artist<"node">>({
    type: `Artist`,
    query: {
      filter: {
        name: { in: input },
      },
    },
  });
  return Array.from(entries).sort((a, b) =>
    a.sortName.localeCompare(b.sortName),
  );
}

export default async function createArtistSchemaCustomization({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  createTypes(`
    type Artist implements Node @dontInfer {
      name: String!
      kana: String
      sortName: String!
      nation: String!
      slug: String!
      program: ArtistProgram!
      image: String
    }
    type ArtistProgram {
      programs: [Program]!
      programsCount: Int!
      tunes: [Tune]!
      tunesCount: Int!
      image: String
      relatedArtists: [Artist]!
    }
  `);

  createTypes(
    schema.buildObjectType({
      name: `Artist`,
      fields: {
        slug: {
          type: `String!`,
          resolve: (source: Pick<Artist<"node">, "name">) =>
            path.join("/artist", createSlug(source.name)),
        },
        program: {
          type: `ArtistProgram!`,
          resolve: async (
            source: Pick<Artist<"node">, "name">,
            args: unknown,
            context: GatsbyGraphQLContext,
          ) => {
            const { entries, totalCount } = await context.nodeModel.findAll<
              Program<"node">
            >({
              type: "Program",
              query: {
                filter: {
                  playlist: {
                    elemMatch: { artist: { name: { eq: source.name } } },
                  },
                },
                sort: { week: "ASC" },
              },
            });
            const programs = Array.from(entries).sort(
              (a, b) => a.week - b.week,
            );
            const programTunes = programs.reduce<Tune<"node">[]>(
              (accum, curr) => [...accum, ...curr.playlist],
              [],
            );
            const tunes = programTunes.filter(
              ({ artist }) => artist === source.name,
            );

            return {
              programs: programs.map(({ playlist, ...program }) => ({
                ...program,
                playlist: playlist.filter(
                  ({ artist }) => artist === source.name,
                ),
              })),
              programsCount: await totalCount(),
              tunes,
              tunesCount: tunes.length,
              image: createArtistImage(tunes),
              relatedArtists: await createRelatedArtists(
                source.name,
                programTunes,
                context,
              ),
            };
          },
        },
        image: {
          type: `String`,
          resolve: async (
            source: Pick<Artist<"node">, "name">,
            args: unknown,
            context: GatsbyGraphQLContext,
          ) => {
            const { entries, totalCount } = await context.nodeModel.findAll<
              Program<"node">
            >({
              type: "Program",
              query: {
                filter: {
                  playlist: {
                    elemMatch: { artist: { name: { eq: source.name } } },
                  },
                },
                sort: { week: "DESC" },
              },
            });
            if ((await totalCount()) === 0) return null;
            const tunes = Array.from(entries, ({ playlist }) =>
              playlist.filter(
                ({ artist, youtube }) => youtube && artist === source.name,
              ),
            ).reduce((accum, curr) => [...accum, ...curr], []);
            if (!tunes.length) return null;
            return `https://i.ytimg.com/vi/${tunes[0].youtube}/0.jpg`;
          },
        },
      },
    }),
  );
}
