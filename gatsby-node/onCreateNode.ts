import { CreateNodeArgs, Node } from 'gatsby';
import crypto from 'crypto';
import { getYomi } from '../src/utils/sortByYomi';
import { Program } from '../types';
/*
type ArtistContainer = {
  [key: string]: PureArtist;
};

const artists: ArtistContainer = {};
*/
const artists: string[] = [];

function isProgramNode(node: Node | (Program & Node)): node is Program & Node {
  return node.internal.type === 'Program';
}

export default function onCreateNode({ node, actions }: CreateNodeArgs) {
  const { createNode } = actions;

  if (!isProgramNode(node)) return;

  const programArtists = node.playlist
    .filter(({ artist }) => artist !== 'スピッツ')
    .map(({ artist, kana, nation }) => ({ artist, kana, nation }));

  programArtists.forEach((data) => {
    const yomi = getYomi(data.artist, data.kana);
    if (!artists.includes(yomi)) {
      artists.push(yomi);
    } else {
      createNode({
        id: `artist-${yomi}`,
        parent: null,
        children: [],
        internal: {
          type: 'Artist',
          contentDigest: crypto.createHash(`md5`).update(JSON.stringify(data)).digest(`hex`),
        },
      });
    }
  });
  /*
  const slug = `/program/${node.id}/`;
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
      slug: `/artist/${name.replace('&', 'and').replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')}`,
      id: name,
      parent: null,
      children: [],
      internal: {
        type: 'Artist',
        contentDigest: crypto.createHash(`md5`).update(JSON.stringify(data)).digest(`hex`),
      },
    });
  });
  */
}
