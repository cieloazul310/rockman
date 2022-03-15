// eslint-disable-next-line import/no-extraneous-dependencies
export { createSchemaCustomization, sourceNodes, onCreateNode, createResolvers, createPages } from './gatsby-node/index';

/*
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
});

exports.createSchemaCustomization = require('./gatsby-node/index').createSchemaCustomization;

exports.sourceNodes = require('./gatsby-node/index').sourceNodes;

exports.onCreateNode = require('./gatsby-node/index').onCreateNode;

exports.createResolvers = require('./gatsby-node/index').createResolvers;
*/
// exports.createPages = require('./gatsby-node/index').createPages;
