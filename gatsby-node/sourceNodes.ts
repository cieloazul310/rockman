import { SourceNodesArgs } from 'gatsby';
import * as fs from 'fs';
import * as path from 'path';
import { PureSpitzAlbum } from './types';

export function sourceNodes({ actions, createNodeId, createContentDigest }: SourceNodesArgs) {
  const { createNode, createTypes } = actions;

  createTypes(`
    type spitzAlbum implements Node {
      albumIdNum: Int!
      year: Int!
      title: String!
      tunes: [spitzTunes!]!
    }
    type spitzTunes {
      id: String!
      index: Int!
      title: String!
      append: [program]!
    }
  `);

  const data: PureSpitzAlbum[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/spitzAlbums.json'), 'utf8'));

  data.forEach((album) => {
    const nodeContent = JSON.stringify(album);
    const nodeMeta = {
      id: createNodeId(`my-data-${album.id}`),
      parent: null,
      children: [],
      internal: {
        type: `spitzAlbum`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(album),
      },
    };
    const node = { ...album, ...nodeMeta };
    createNode(node);
  });
}
