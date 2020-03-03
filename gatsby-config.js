//const myTheme = require('./src/utils/theme').default;

module.exports = {
  siteMetadata: {
    title: `SPITZ 草野マサムネのロック大陸漫遊記プレイリスト集`,
    description:
      'TOKYO-FM で放送中の SPITZ 草野マサムネのロック大陸漫遊記 のプレイリスト集。',
    lang: 'ja',
    siteUrl: 'https://cieloazul310.github.io/rockman-survey/',
    author: 'cieloazul310',
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
  pathPrefix: '/rockman-survey',
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
        typeName: `yaml`
      }
    },
    {
      resolve: `gatsby-theme-typescript-material-ui`,
      options: {
        //theme: myTheme
      }
    },
    `gatsby-plugin-graphql-codegen`,
    // Add typescript stack into webpack
    `gatsby-plugin-typescript`
  ]
};
