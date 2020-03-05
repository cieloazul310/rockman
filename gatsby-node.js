const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);
/**
 * @fix load ts file in gatsby-node.js
 */
/*
const { getYomi, encodeArtistName } = require('./src/utils/sortByYomi.ts');
*/

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `program`) {
    // /program/${node.id}/
    const slug = `/program/${node.id}`;
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allProgram(sort: { fields: week, order: ASC }) {
        edges {
          node {
            id
            title
            date
            categories
            fields {
              slug
            }
            guests
            playlist {
              artist
              corner
              id
              indexInWeek
              index
              kana
              label
              name
              nation
              producer
              selector
              title
              week
              year
              youtube
            }
            subtitle
            week
            year
          }
          next {
            id
            title
            date(formatString: "YYYY-MM-DD")
            categories
            fields {
              slug
            }
            guests
            playlist {
              artist
              corner
              id
              indexInWeek
              index
              kana
              label
              name
              nation
              producer
              selector
              title
              week
              year
              youtube
            }
            subtitle
            week
            year
          }
          previous {
            id
            title
            date(formatString: "YYYY-MM-DD")
            categories
            fields {
              slug
            }
            guests
            playlist {
              artist
              corner
              id
              indexInWeek
              index
              kana
              label
              name
              nation
              producer
              selector
              title
              week
              year
              youtube
            }
            subtitle
            week
            year
          }
        }
      }
    }
  `);
  const allTunes = result.data.allProgram.edges.reduce(
    (accum, { node }) => [...accum, ...node.playlist],
    []
  );
  const artists = allTunes
    .reduce((accum, curr) => {
      const existedIndex = accum.map(d => d[0]).indexOf(curr.artist);
      if (existedIndex < 0) {
        return [...accum, [curr.artist, curr.kana, curr.nation, [curr]]];
      } else {
        accum[existedIndex][3].push(curr);
        return accum;
      }
    }, [])
    .sort(
      (a, b) =>
        b[3].length - a[3].length ||
        getYomi(a[0], a[1]).localeCompare(getYomi(b[0], b[1]))
    );

  // create Each Program Pages
  result.data.allProgram.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/program.tsx'),
      context: {
        previous,
        next,
        slug: node.fields.slug
      }
    });
  });

  // create Artists Pages (tune >= 2)
  artists
    .filter(d => d[3].length > 1)
    .forEach((d, index, arr) => {
      const previous = index ? arr[index - 1] : null;
      const next = index !== arr.length - 1 ? arr[index + 1] : null;
      createPage({
        path: `/artist/${d[0]}/`,
        component: path.resolve('./src/templates/artist.tsx'),
        context: {
          previous,
          next,
          artist: d[0],
        }
      });
    });
    
};

function getYomi(artistName, kana) {
  const the = artistName.slice(0, 4);
  if (the === 'The ' || the === 'THE ' || the === 'the ')
    return artistName.slice(4);
  return kana || artistName;
}
