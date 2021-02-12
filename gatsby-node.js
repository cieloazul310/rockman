require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
});

exports.createSchemaCustomization = require('./gatsby-node/index').createSchemaCustomization;

exports.onCreateNode = require('./gatsby-node/index').onCreateNode;

exports.createResolvers = require('./gatsby-node/index').createResolvers;

exports.createPages = require('./gatsby-node/index').createPages;
