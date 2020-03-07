//const myTheme = require('./src/utils/theme').default;

module.exports = {
  siteMetadata: {
    title: `SPITZ 草野マサムネのロック大陸漫遊記プレイリスト集 β`,
    description:
      'TOKYO-FM で放送中の SPITZ 草野マサムネのロック大陸漫遊記 のプレイリスト集。',
    lang: 'ja',
    siteUrl: 'https://cieloazul310.github.io/gatsby-rockman/',
    author: 'cieloazul310',
    keywords: ['スピッツ', '草野マサムネ', 'ロック大陸漫遊記', 'プレイリスト'],
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
      youtube: ''
    }
  },
  pathPrefix: '/gatsby-rockman',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `yaml`,
        path: `${__dirname}/data/yaml`
      }
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `program`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingID: 'UA-74683419-3'
      }
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
        icon: `src/assets/icon.png`
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://cieloazul310.github.io/gatsby-rockman/`
      }
    },
    `gatsby-plugin-sitemap`,
    `gatsby-theme-typescript-material-ui`,
    `gatsby-plugin-graphql-codegen`,
    // Add typescript stack into webpack
    `gatsby-plugin-typescript`
  ]
};
