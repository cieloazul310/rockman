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
      sortName: String!
      nation: String!
      program: [program] @link
      tunes: [programPlaylist] @link
    }
  `);
};

exports.onCreateNode = async ({ node, actions }) => {
  const { createNode, createNodeField } = actions;

  const artists = {};

  if (node.internal.type === `program`) {
    // /program/${node.id}/
    const slug = `/program/${node.id}`;
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    const programImages = [];

    node.playlist.forEach(async ({ artist, kana, nation, youtube, ...playlist }) => {
      if (youtube) programImages.push(youtube);

      if (!artists[artist]) {
        artists[artist] = {
          name: artist,
          kana,
          nation,
          program: [node.id],
          tunes: [playlist],
        };
      } else {
        if (!artists[artist].program.includes(node.id)) {
          artists[artist].program.push(node.id);
        }
        artists[artist].tunes.push(playlist.id);
      }

      await createNode({
        ...playlist,
        image: playlist.youtube ? `https://i.ytimg.com/vi/${playlist.youtube}/0.jpg` : null,
        parent: node.id,
        children: [],
        internal: {
          type: 'programPlaylist',
          contentDigest: crypto.createHash(`md5`).update(JSON.stringify(playlist)).digest(`hex`),
        },
      });
    });

    createNodeField({
      node,
      name: 'image',
      value: programImages.length ? `https://i.ytimg.com/vi/${programImages[0]}/0.jpg` : null,
    });
  }

  Object.entries(artists).forEach(([name, data]) => {
    const images = data.tunes.filter((tune) => tune.youtube && tune.youtube !== '');
    createNode({
      name,
      ...data,
      image: images[images.length - 1],
      tunes: data.tunes.map((tune) => tune.id),
      sortName: getYomi(name, data.kana),
      id: name,
      parent: null,
      children: [],
      internal: {
        type: 'Artist',
        contentDigest: crypto.createHash(`md5`).update(JSON.stringify(data)).digest(`hex`),
      },
    });
  });
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
      allProgram(sort: { fields: date, order: ASC }) {
        group(field: playlist___artist) {
          edges {
            node {
              id
              playlist {
                artist
                kana
                nation
                youtube
              }
            }
          }
          fieldValue
        }
      }
    }
  `);
  if (artistResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const artists = artistResult.data.allProgram.group.map((item) => {
    const edges = removeMultiple(item.edges).map(({ node }) => ({
      ...node,
      playlist: node.playlist.filter(({ artist }) => artist === item.fieldValue),
    }));
    const tunes = edges.reduce((accum, curr) => [...accum, ...curr.playlist], []);
    const [{ kana, nation }] = tunes;
    const [img] = tunes.filter((tune) => tune.youtube && tune.youtube !== '').map((tune) => tune.youtube);
    return {
      fieldValue: item.fieldValue,
      kana,
      nation,
      edges,
      tunes,
      img: img ? `https://i.ytimg.com/vi/${img}/0.jpg` : null,
    };
  });

  artists
    .sort((a, b) => sortByYomi(a, b))
    .forEach((d, index, arr) => {
      const previous = index ? arr[index - 1] : null;
      const next = index !== arr.length - 1 ? arr[index + 1] : null;
      createPage({
        path: `/artist/${d.fieldValue}/`,
        component: path.resolve('./src/templates/artist.tsx'),
        context: {
          index,
          previous,
          next,
          current: d,
          fieldValue: d.fieldValue,
        },
      });
    });
};

function sortByYomi(a, b) {
  return getYomi(a.fieldValue, a.kana).localeCompare(getYomi(b.fieldValue, b.kana));
}

function getYomi(artistName, kana) {
  const the = artistName.slice(0, 4);
  if (the === 'The ' || the === 'THE ' || the === 'the ') return kanaToHira(artistName.slice(4));
  return kanaToHira(kana || artistName);
}

function removeMultiple(edges) {
  return edges.reduce((accum, curr) => {
    if (accum.map((d) => d.node.id).indexOf(curr.node.id) >= 0) return accum;
    return [...accum, curr];
  }, []);
}

function kanaToHira(str) {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    var chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}
