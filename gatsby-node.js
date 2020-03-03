const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `yaml`) {
    const fileNode = getNode(node.parent);
    console.log(`\n`, fileNode.relativePath);
    const slug = createFilePath({ node, getNode, basePath: `weeks` });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};
