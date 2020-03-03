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
            week
            date(formatString: "YYYY-MM-DD")
            year
            fields {
              slug
            }
          }
          next {
            fields {
              slug
            }
            title
          }
          previous {
            fields {
              slug
            }
            title
          }
        }
      }
    }
  `);
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
