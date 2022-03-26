/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["bar"] }] */
import { Node, CreateNodeArgs } from 'gatsby';
import { getYomi } from '../src/utils/sortByYomi';
import { PureArtist } from './types';
import { Tune, Program, Artist } from '../types';
import { GatsbyGraphQLContext } from './graphql';

export type IntQueryOperatorInput = {
  eq?: number | null;
  ne?: number | null;
  gt?: number | null;
  gte?: number | null;
  lt?: number | null;
  lte?: number | null;
  in?: number[] | null;
  nin?: number[] | null;
};

function argIsIntQueryOperatorInput(arg: unknown | IntQueryOperatorInput): arg is IntQueryOperatorInput {
  return true;
}

export function intQueryFilter(arg: unknown | IntQueryOperatorInput): (input: number) => boolean {
  if (!arg) return () => true;
  if (!argIsIntQueryOperatorInput(arg)) return () => true;

  const { eq, ne, gt, gte, lt, lte, nin } = arg;
  const filterIn = arg.in;

  return (input: number) =>
    (!eq || input === eq) &&
    (!ne || input !== ne) &&
    (!gt || input > gt) &&
    (!gte || input >= gte) &&
    (!lt || input < lt) &&
    (!lte || input <= lte) &&
    (!filterIn || filterIn.includes(input)) &&
    (!nin || !nin.includes(input));
}

export type StringQueryOperatorInput = {
  eq?: string | null;
  ne?: string | null;
  in?: string[] | null;
  nin?: string[] | null;
  regex?: string | null;
  glob?: string | null;
};

function argIsStringQueryOperatorInput(arg: unknown | StringQueryOperatorInput): arg is StringQueryOperatorInput {
  return true;
}

export function stringQueryFilter(arg: unknown | StringQueryOperatorInput): (input: string) => boolean {
  if (!arg) return () => true;
  if (!argIsStringQueryOperatorInput(arg)) return () => true;

  const { eq, ne, nin } = arg;
  const filterIn = arg.in;

  return (input: string) =>
    (!eq || input === eq) && (!ne || input !== ne) && (!filterIn || filterIn.includes(input)) && (!nin || !nin.includes(input));
}

export function getRelatedArtists(artist: PureArtist): string[] {
  if (!artist) return [];
  const playlists = artist.program?.map((program) => program?.playlist ?? []);
  const playlist = playlists?.reduce((accum, curr) => [...accum, ...curr], []);
  const artists = playlist?.map((tune) => tune?.artist).filter((name) => name !== 'スピッツ' && name !== artist.name);

  const obj: { [key: string]: number } =
    artists?.reduce<{ [key: string]: number }>((accum, curr) => {
      if (!curr) return accum;
      return {
        ...accum,
        [curr]: curr && Object.prototype.hasOwnProperty.call(accum, curr) ? accum[curr] + 1 : 1,
      };
    }, {}) ?? {};

  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
}

export function createArtistNode(
  {
    actions,
    createNodeId,
    createContentDigest,
    getNode,
  }: Pick<CreateNodeArgs, 'actions' | 'createNodeId' | 'createContentDigest' | 'getNode'>,
  parentNode: Program & Node
) {
  const { createNode, createParentChildLink } = actions;

  return async ({ artist, ...data }: Pick<Tune, 'artist' | 'kana' | 'nation'>) => {
    const sortName = getYomi(artist, data.kana);
    const nodeId = createNodeId(`artist-${sortName}`);
    const nodeContent = JSON.stringify({ ...data, name: artist, sortName });
    const nodeMeta = {
      id: nodeId,
      parent: parentNode.id,
      children: [],
      internal: {
        type: 'Artist',
        content: nodeContent,
        contentDigest: createContentDigest(data),
      },
    };
    await createNode({ ...data, name: artist, sortName, ...nodeMeta });

    const artistNode = getNode(nodeId);
    if (artistNode) {
      createParentChildLink({ parent: parentNode, child: artistNode });
    }
  };
}

export async function createArtistNodeByProgram(
  {
    actions,
    createNodeId,
    createContentDigest,
    getNode,
  }: Pick<CreateNodeArgs, 'actions' | 'createNodeId' | 'createContentDigest' | 'getNode'>,
  parentNode: Program & Node
) {
  const createEachArtistNode = createArtistNode({ actions, createNodeId, createContentDigest, getNode }, parentNode);

  const programArtists = parentNode.playlist
    .filter(({ artist }) => artist !== 'スピッツ')
    .reduce<Tune[]>((accum, curr) => (accum.map(({ artist }) => artist).includes(curr.artist) ? accum : [...accum, curr]), [])
    .map(({ artist, kana, nation }) => ({ artist, kana, nation }));

  await Promise.all(
    programArtists.map(async (data) => {
      await createEachArtistNode(data);
    })
  );
}

export function createSlug(str: string) {
  return str.replace('&', 'and').replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '');
}

export function createArtistImage(tunes: Tune[]) {
  const youtube = tunes.reduce<string | null>((accum, curr) => {
    return curr.youtube || accum;
  }, null);
  return youtube ? `https://i.ytimg.com/vi/${youtube}/0.jpg` : null;
}

export async function createRelatedArtists(name: string, playlist: Tune[], context: GatsbyGraphQLContext) {
  const artists = playlist.filter(({ artist }) => artist !== 'スピッツ' && artist !== name).map(({ artist }) => artist);
  const input = Array.from(new Set(artists));

  const { entries } = await context.nodeModel.findAll<Artist & Node>({
    type: `Artist`,
    query: {
      filter: {
        name: { in: input },
      },
    },
  });
  return Array.from(entries).sort((a, b) => a.sortName.localeCompare(b.sortName));
}
