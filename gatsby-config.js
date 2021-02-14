//const myTheme = require('./src/utils/theme').default;
const path = require('path');
const baseUrl = 'https://cieloazul310.github.io';
const pathPrefix = '/rockman';
const siteUrl = path.join(baseUrl, pathPrefix);
const contentDir = `${__dirname}/data`;
// const contentDir = `${__dirname}/devData`;

module.exports = {
  siteMetadata: {
    title: `ロック大陸漫遊記プレイリスト集`,
    description:
      'ロック大陸漫遊記プレイリスト集は、TOKYO-FM他全国38局で放送されているラジオ番組「SPITZ 草野マサムネのロック大陸漫遊記」でオンエアされた楽曲を、放送回別、アーティスト別、選曲者別、コーナー別に表示したサイトです。原則毎週日曜日 TOKYO-FM の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。',
    lang: 'ja',
    siteUrl: siteUrl,
    baseUrl: baseUrl,
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
  pathPrefix: pathPrefix,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `yaml`,
        path: `${contentDir}/yaml`,
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
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: 'ca-pub-7323207940463794',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ロック大陸漫遊記プレイリスト集`,
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
        siteUrl: baseUrl,
      },
    },
    {
      resolve: `gatsby-theme-aoi`,
      options: {
        siteId: `rockman`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                baseUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }) => {
          return site.siteMetadata.baseUrl;
        },
      },
    },
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        stages: ['develop'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules', '.cache', 'public'],
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-graphql-codegen`,
  ],
};
