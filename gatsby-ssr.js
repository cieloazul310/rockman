// eslint-disable-next-line import/no-extraneous-dependencies
/*
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
});

exports.onRenderBody = require('./src/gatsby-ssr').onRenderBody;
*/

/* eslint-disable react/jsx-filename-extension */
const React = require('react');
// import { RenderBodyArgs } from 'gatsby';

const HeadComponents = [
  <script
    key="1-http-ads"
    data-ad-client="ca-pub-7323207940463794"
    async
    crossOrigin="anonymous"
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7323207940463794"
  />,
];

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};
