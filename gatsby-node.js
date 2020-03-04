const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `yaml`) {
    const slug = createFilePath({ node, getNode, basePath: `weeks` });
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
      allYaml(sort: { fields: week, order: ASC }) {
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
  // Array<[categoryName, length]>
  const categories = result.data.allYaml.edges
    .map(({ node }) => node.categories)
    .reduce((accum, curr) => [...accum, ...curr], [])
    .reduce((accum, curr) => {
      const existedIndex = accum.map(d => d[0]).indexOf(curr);
      if (existedIndex < 0) {
        return [...accum, [curr, 1]];
      } else {
        accum[existedIndex][1] += 1;
        return accum;
      }
    }, [])
    .sort((a, b) => b[1] - a[1]);

  result.data.allYaml.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/week.tsx'),
      context: {
        previous,
        next,
        slug: node.fields.slug,
      }
    })
  });
};
