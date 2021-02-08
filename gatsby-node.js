const path = require('path');
const crypto = require('crypto');
//const { createFilePath } = require(`gatsby-source-filesystem`);
/**
 * @fix load ts file in gatsby-node.js
 */
/*
const { getYomi, encodeArtistName } = require('./src/utils/sortByYomi.ts');
*/

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type Artist implements Node {
      name: String!
      kana: String
      image: String
      sortName: String!
      nation: String!
      program: [program] @link
      tunes: [programPlaylist] @link
      programCount: Int!
      tunesCount: Int!
    }
    type program implements Node {
      week: Int!
      year: Int!
      title: String!
      subtitle: String
      guests: [String]
      categories: [String]
      date: Date! @dateformat
      playlist: [programPlaylist]
    }
    type programPlaylist {
      id: String!
      index: Int
      indexInWeek: Int!
      week: Int!
      title: String!
      artist: Artist @link(by: "name")
      kana: String
      year: Int!
      nation: String!
      label: String
      producer: [String]
      corner: String
      youtube: String
      selector: String!
      image: String
    }
  `);
};
const artists = {};

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions;

  if (node.internal.type === `program`) {
    // /program/${node.id}/
    const slug = `/program/${node.id}`;
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    const programImages = [];

    node.playlist.forEach((playlist) => {
      const { artist, kana, nation, youtube } = playlist;
      if (youtube) programImages.push(youtube);

      if (!artists[artist]) {
        artists[artist] = {
          name: artist,
          kana,
          nation,
          program: [],
          tunes: [],
        };
      }
      if (!artists[artist].program.includes(node.id)) {
        artists[artist].program.push(node.id);
      }
      artists[artist].tunes.push(playlist);
      /*
      createNode({
        ...playlist,
        image: playlist.youtube ? `https://i.ytimg.com/vi/${playlist.youtube}/0.jpg` : null,
        parent: node.id,
        children: [],
        internal: {
          type: 'programPlaylist',
          contentDigest: crypto.createHash(`md5`).update(JSON.stringify(playlist)).digest(`hex`),
        },
      });
      */
    });

    createNodeField({
      node,
      name: 'image',
      value: programImages.length ? `https://i.ytimg.com/vi/${programImages[0]}/0.jpg` : null,
    });

    // create Artist Node
    const playlistArtist = new Set(node.playlist.map(({ artist }) => artist));
    playlistArtist.forEach((name) => {
      const data = artists[name];
      console.log(name);
      const images = data.tunes.filter((tune) => tune.youtube && tune.youtube !== '');
      createNode({
        name,
        ...data,
        image: images.length ? `https://i.ytimg.com/vi/${images[images.length - 1].youtube}/0.jpg` : null,
        tunes: data.tunes.map((tune) => tune.id),
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
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info

  const { createPage } = actions;
  const result = await graphql(`
    query AllProgram {
      allProgram(sort: { fields: week, order: ASC }) {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            title
            date(formatString: "YYYY-MM-DD")
            fields {
              slug
              image
            }
            week
          }
          previous {
            title
            date(formatString: "YYYY-MM-DD")
            fields {
              slug
              image
            }
            week
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // create Each Program Pages
  result.data.allProgram.edges.forEach(({ node, next, previous }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/program.tsx'),
      context: {
        previous,
        next,
        index,
        current: node,
        slug: node.fields.slug,
      },
    });
  });

  // create Artists Pages
  const artistResult = await graphql(`
    query AllArtists {
      allArtist(sort: { fields: sortName, order: ASC }, filter: { name: { ne: "スピッツ" } }) {
        edges {
          node {
            name
          }
          next {
            name
            image
            tunesCount
            programCount
          }
          previous {
            name
            image
            tunesCount
            programCount
          }
        }
      }
    }
  `);
  if (artistResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  artistResult.data.allArtist.edges.forEach(({ node, next, previous }, index) => {
    createPage({
      path: `/artist/${node.name}/`,
      component: path.resolve('./src/templates/artist.tsx'),
      context: {
        index,
        previous,
        next,
        name: node.name,
      },
    });
  });
};

function getYomi(artistName, kana) {
  const the = artistName.slice(0, 4);
  if (the === 'The ' || the === 'THE ' || the === 'the ') return kanaToHira(artistName.slice(4));
  return kanaToHira(kana || artistName);
}

function kanaToHira(str) {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    var chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}
