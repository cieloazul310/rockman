import type { SourceNodesArgs } from 'gatsby';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import type { SpitzAlbum } from '../../types';

export default async function sourceNodes({ actions, createNodeId, createContentDigest }: SourceNodesArgs) {
  const { createNode } = actions;

  const data: SpitzAlbum[] = yaml.parse(fs.readFileSync(path.resolve('./data/spitzAlbums.yaml'), 'utf8'));

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