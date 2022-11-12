import type { CreateNodeArgs, Node } from 'gatsby';
import { createArtistNodeByProgram } from './utils';
import type { Program } from '../../types';

function isProgramNode(node: Node | (Program & Node)): node is Program & Node {
  return node.internal.type === 'Program';
}

export default async function onCreateNode({ node, actions, createContentDigest, createNodeId, getNode }: CreateNodeArgs) {
  if (!isProgramNode(node)) return;

  await createArtistNodeByProgram({ actions, createNodeId, createContentDigest, getNode }, node);
}
