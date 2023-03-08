import type { CreateNodeArgs, Node } from 'gatsby';
import { getYomi } from '../../src/utils/sortByYomi';
import type { Program, Tune } from '../../types';

function isProgramNode(node: Node | Program<'bare'>): node is Program<'bare'> {
  return node.internal.type === 'Program';
}

export function createArtistNode(
  {
    actions,
    createNodeId,
    createContentDigest,
    getNode,
  }: Pick<CreateNodeArgs, 'actions' | 'createNodeId' | 'createContentDigest' | 'getNode'>,
  parentNode: Node
) {
  const { createNode, createParentChildLink } = actions;

  return async ({ artist, ...data }: Pick<Tune<'bare'>, 'artist' | 'kana' | 'nation'>) => {
    const sortName = getYomi(artist, data.kana);
    const nodeId = createNodeId(`artist-${sortName}`);
    if (getNode(nodeId)) return;

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

async function createArtistNodeByProgram(
  {
    actions,
    createNodeId,
    createContentDigest,
    getNode,
  }: Pick<CreateNodeArgs, 'actions' | 'createNodeId' | 'createContentDigest' | 'getNode'>,
  parentNode: Program<'bare'>
) {
  const createEachArtistNode = createArtistNode({ actions, createNodeId, createContentDigest, getNode }, parentNode);

  const programArtists = parentNode.playlist
    .filter(({ artist }) => artist !== 'スピッツ')
    .reduce<Tune<'bare'>[]>((accum, curr) => (accum.map(({ artist }) => artist).includes(curr.artist) ? accum : [...accum, curr]), [])
    .map(({ artist, kana, nation }) => ({ artist, kana, nation }));

  await Promise.all(
    programArtists.map(async (data) => {
      await createEachArtistNode(data);
    })
  );
}

/**
 * onCreateNode で何をするか
 *
 * 1. `Program` から `Artist` ノードを作成する
 */
export default async function onCreateNode({ node, actions, createContentDigest, createNodeId, getNode }: CreateNodeArgs) {
  if (!isProgramNode(node)) return;
  /*
  const { createNode, createParentChildLink } = actions;
  const { playlist } = node;
  const artists = playlist.map(({ artist, kana, nation }) => ({
    artist,
    kana,
    nation,
  }));
  artists.forEach(({ artist, kana, nation }) => {
    if (artist === 'スピッツ') return;
    const sortName = getYomi(artist, kana);
    const nodeId = createNodeId(`artist-${sortName}`);
    const artistNode = getNode(nodeId);
    if (artistNode) return;

  });
  */
  await createArtistNodeByProgram({ actions, createNodeId, createContentDigest, getNode }, node);
}
