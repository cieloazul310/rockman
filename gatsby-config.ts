import { GatsbyConfig } from 'gatsby';

const baseUrl = 'https://cieloazul310.github.io';
const pathPrefix = '/rockman';
const contentDir = `./data`;

const config: GatsbyConfig = {
  siteMetadata: {
    title: `ロック大陸漫遊記プレイリスト集`,
    description:
      'ロック大陸漫遊記プレイリスト集は、TOKYO-FM他全国38局で放送されているラジオ番組「SPITZ 草野マサムネのロック大陸漫遊記」でオンエアされた楽曲を、放送回別、アーティスト別、選曲者別、コーナー別に表示したサイトです。原則毎週日曜日 TOKYO-FM の本放送終了後に更新します。作者がリアルタイムで聞けなかった日は、一両日中に視聴して更新します。',
    lang: 'ja',
    siteUrl: 'https://cieloazul310.github.io/rockman',
    baseUrl,
    author: 'cieloazul310',
    keywords: ['スピッツ', '草野マサムネ', 'ロック大陸漫遊記', 'プレイリスト', 'ラジオ'],
    menu: [
      { name: 'トップページ', path: '/' },
      { name: '放送回一覧', path: '/programs/' },
      { name: 'アーティスト', path: '/artists/' },
      { name: 'テーマ', path: '/categories/' },
      { name: '選曲者', path: '/selectors/' },
      { name: '漫遊前の一曲', path: '/takeoff/' },
      { name: 'ちょっぴりタイムマシン', path: '/timemachine/' },
      { name: 'サイトについて', path: '/about/' },
    ],
    social: [
      { name: 'twitter', url: 'https://twitter.com/cieloazul310' },
      { name: 'github', url: 'https://github.com/cieloazul310/rockman' },
    ],
  },
  pathPrefix,
  plugins: [
    {
      resolve: `@cieloazul310/gatsby-theme-aoi`,
      options: {
        siteId: `rockman`,
      },
    },
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
        typeName: `Program`,
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
      resolve: `gatsby-plugin-eslint`,
      options: {
        failOnError: false,
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};

export default config;
