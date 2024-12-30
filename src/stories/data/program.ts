import type { Program, TuneItemFragment } from "types";

const program: Pick<
  Program,
  | "id"
  | "slug"
  | "year"
  | "week"
  | "date"
  | "title"
  | "image"
  | "subtitle"
  | "guests"
  | "categories"
> & {
  playlist: TuneItemFragment[];
} = {
  id: "30546cb1-8c8b-59ef-9d5e-536189eb9119",
  year: 2018,
  week: 24,
  slug: "/program/20180024/",
  date: "2018-06-17",
  title: "宝島1986年6月号で漫遊記",
  image: "https://i.ytimg.com/vi/gQLkyg5iKuY/0.jpg",
  subtitle: "",
  guests: [],
  categories: ["古い音楽雑誌で漫遊記"],
  playlist: [
    {
      id: "2018002401",
      indexInWeek: 1,
      week: 24,
      title: "あじさい通り",
      artist: {
        name: "スピッツ",
        slug: "/artist/スピッツ",
        nation: "JPN",
        program: {
          image: "https://i.ytimg.com/vi/KqJBpisB7lE/0.jpg",
          programsCount: 266,
          tunesCount: 290,
        },
      },
      year: 1995,
      nation: "JPN",
      corner: "漫遊前の一曲",
      youtube: null,
      selector: "草野マサムネ",
    },
    {
      id: "2018002402",
      indexInWeek: 2,
      week: 24,
      title: "昆虫軍",
      artist: {
        name: "戸川純",
        slug: "/artist/戸川純",
        nation: "JPN",
        program: {
          image: null,
          programsCount: 1,
          tunesCount: 1,
        },
      },
      year: 1984,
      nation: "JPN",
      corner: null,
      youtube: null,
      selector: "草野マサムネ",
    },
    {
      id: "2018002403",
      indexInWeek: 3,
      week: 24,
      title: "べにくじら",
      artist: {
        name: "有頂天",
        slug: "/artist/有頂天",
        nation: "JPN",
        program: {
          image: "https://i.ytimg.com/vi/gQLkyg5iKuY/0.jpg",
          programsCount: 1,
          tunesCount: 1,
        },
      },
      year: 1986,
      nation: "JPN",
      corner: null,
      youtube: "gQLkyg5iKuY",
      selector: "草野マサムネ",
    },
    {
      id: "2018002404",
      indexInWeek: 4,
      week: 24,
      title: "GERONIMO",
      artist: {
        name: "GASTUNK",
        slug: "/artist/GASTUNK",
        nation: "JPN",
        program: {
          image: null,
          programsCount: 1,
          tunesCount: 1,
        },
      },
      year: 1986,
      nation: "JPN",
      corner: null,
      youtube: null,
      selector: "草野マサムネ",
    },
    {
      id: "2018002405",
      indexInWeek: 5,
      week: 24,
      title: "うめたて",
      artist: {
        name: "ZELDA",
        slug: "/artist/ZELDA",
        nation: "JPN",
        program: {
          image: null,
          programsCount: 3,
          tunesCount: 3,
        },
      },
      year: 1983,
      nation: "JPN",
      corner: null,
      youtube: null,
      selector: "草野マサムネ",
    },
    {
      id: "2018002406",
      indexInWeek: 6,
      week: 24,
      title: "BROKEN GENERATION",
      artist: {
        name: "LAUGHIN' NOSE",
        slug: "/artist/LAUGHIN NOSE",
        nation: "JPN",
        program: {
          image: "https://i.ytimg.com/vi/foIbzhIPFJQ/0.jpg",
          programsCount: 1,
          tunesCount: 1,
        },
      },
      year: 1985,
      nation: "JPN",
      corner: null,
      youtube: "foIbzhIPFJQ",
      selector: "草野マサムネ",
    },
    {
      id: "2018002407",
      indexInWeek: 7,
      week: 24,
      title: "I Am Bitch, Or Not",
      artist: {
        name: "キャ→",
        slug: "/artist/キャ→",
        nation: "JPN",
        program: {
          image: null,
          programsCount: 1,
          tunesCount: 1,
        },
      },
      year: 1986,
      nation: "JPN",
      corner: null,
      youtube: null,
      selector: "草野マサムネ",
    },
    {
      id: "2018002408",
      indexInWeek: 8,
      week: 24,
      title: "only you(唯一人)",
      artist: {
        name: "ばちかぶり",
        slug: "/artist/ばちかぶり",
        nation: "JPN",
        program: {
          image: null,
          programsCount: 2,
          tunesCount: 2,
        },
      },
      year: 1985,
      nation: "JPN",
      corner: null,
      youtube: null,
      selector: "草野マサムネ",
    },
    {
      id: "2018002409",
      indexInWeek: 9,
      week: 24,
      title: "痛み",
      artist: {
        name: "クレヨン社",
        slug: "/artist/クレヨン社",
        nation: "JPN",
        program: {
          image: null,
          programsCount: 1,
          tunesCount: 1,
        },
      },
      year: 1988,
      nation: "JPN",
      corner: "ちょっぴりタイムマシン",
      youtube: null,
      selector: "草野マサムネ",
    },
  ],
};

export default program;
