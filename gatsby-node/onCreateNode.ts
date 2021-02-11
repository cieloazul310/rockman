import { CreateNodeArgs, Node } from 'gatsby';
import crypto from 'crypto';
import { getYomi } from '../src/utils/sortByYomi';
import { getRelatedArtists } from '../src/utils/getRelatedArtists';
import { PureProgram, PureArtist } from './types';

type ArtistContainer = {
  [key: string]: PureArtist;
};

const artists: ArtistContainer = {};

export function onCreateNode({ node, actions }: CreateNodeArgs) {
  const { createNode, createNodeField } = actions;

  if (isProgramNode(node)) {
    const slug = `/program/${node.id}`;
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    const programNotSpitzImages: string[] = [];
    const programSpitzImages: string[] = [];

    node.playlist.forEach((playlist) => {
      const { artist, kana, nation, youtube } = playlist;
      if (youtube && youtube !== '') {
        if (artist !== 'スピッツ') {
          programNotSpitzImages.push(youtube);
        } else {
          programSpitzImages.push(youtube);
        }
      }

      if (!artists[artist]) {
        artists[artist] = {
          name: artist,
          kana: kana && kana !== '' ? kana : null,
          nation,
          program: [],
          tunes: [],
        };
      }
      const { program, tunes } = artists[artist];
      if (!program.map(({ id }) => id).includes(node.id)) {
        artists[artist].program.push(node);
      }
      tunes.push(playlist);
    });

    const programImages = [...programNotSpitzImages, ...programSpitzImages];

    createNodeField({
      node,
      name: 'image',
      value: programImages.length ? `https://i.ytimg.com/vi/${programImages[0]}/0.jpg` : null,
    });

    // create Artist Node
    const playlistArtist = new Set(node.playlist.map(({ artist }) => artist));
    playlistArtist.forEach((name) => {
      const data = artists[name];
      const program = [...data.program].sort((a, b) => a.week - b.week).map(({ id }) => id);
      const tunes = [...data.tunes].sort((a, b) => a.week - b.week || a.indexInWeek - b.indexInWeek);
      const images = tunes.filter((tune) => tune.youtube && tune.youtube !== '');
      const relatedArtists = getRelatedArtists(data);

      createNode({
        ...data,
        image: images.length ? `https://i.ytimg.com/vi/${images[images.length - 1].youtube}/0.jpg` : null,
        program,
        tunes,
        relatedArtists,
        sortName: getYomi(name, data.kana),
        programCount: data.program.length,
        tunesCount: data.tunes.length,
        id: name,
        parent: null,
        children: [],
        internal: {
          type: 'Artist',
          contentDigest: crypto.createHash(`md5`).update(JSON.stringify(data)).digest(`hex`),
        },
      });
    });
  }
}

function isProgramNode(node: Node | PureProgram): node is PureProgram {
  return node.internal.type === 'program';
}
