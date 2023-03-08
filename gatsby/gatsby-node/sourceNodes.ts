import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import type { SourceNodesArgs } from 'gatsby';
import type { SpitzAlbum } from '../../types';

/**
 * sourceNodes で何をするか
 *
 * 1. spitzAlbums.yml からアルバム毎のノード (`SpitzAlbum`) を作成する
 */
export default async function sourceNodes({ actions, createNodeId, createContentDigest }: SourceNodesArgs) {
  const { createNode } = actions;

  const data: SpitzAlbum[] = yaml.parse(fs.readFileSync(path.resolve('./data/spitzAlbums.yml'), 'utf8'));

  data.forEach((album) => {
    const nodeContent = JSON.stringify(album);
    const nodeMeta = {
      id: createNodeId(`spitz-album-${album.id}`),
      parent: null,
      children: [],
      internal: {
        type: `SpitzAlbum`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(album),
      },
    };
    const node = { ...album, ...nodeMeta };
    createNode(node);
  });
}
