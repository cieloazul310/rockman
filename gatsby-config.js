//const myTheme = require('./src/utils/theme').default;

module.exports = {
  siteMetadata: {
    title: `SPITZ 草野マサムネのロック大陸漫遊記プレイリスト集 β`,
    description: 'TOKYO-FM で放送中のラジオ番組「SPITZ 草野マサムネのロック大陸漫遊記」のプレイリスト集。',
    lang: 'ja',
    siteUrl: 'https://cieloazul310.github.io/gatsby-rockman/',
    author: 'cieloazul310',
    keywords: ['スピッツ', '草野マサムネ', 'ロック大陸漫遊記', 'プレイリスト', 'ラジオ'],
    social: {
      mail: '',
      twitter: 'cieloazul310',
      github: 'cieloazul310',
      facebook: '',
      gitlab: '',
      linkedin: '',
      medium: '',
      pocket: '',
      tumblr: '',
      instagram: '',
      vimeo: '',
      youtube: 'playlist?list=PLGqFsFmePh4xxQjnjCpBLYsJY-VecUzdJ',
    },
  },
  pathPrefix: '/gatsby-rockman',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `yaml`,
        path: `${__dirname}/data/yaml`,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `program`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-74683419-3',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SPITZ 草野マサムネのロック大陸漫遊記プレイリスト集 β`,
        short_name: `ロク漫プレイリスト`,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: `#009688`,
        display: `standalone`,
        icon: `src/assets/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://cieloazul310.github.io/`,
      },
    },
    {
      resolve: `gatsby-theme-aoi`,
      options: {
        siteId: `gatsby-rockman`,
      },
    },
    `gatsby-plugin-sitemap`,
    /*
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: []
      }
    },
    */
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-graphql-codegen`,
  ],
};
