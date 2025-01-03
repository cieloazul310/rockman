import type { Artist } from "types";

export const artists: (Pick<
  Artist,
  "name" | "id" | "image" | "kana" | "nation" | "slug" | "sortName"
> & {
  program: Pick<Artist["program"], "image" | "programsCount" | "tunesCount">;
})[] = [
  {
    name: "Led Zeppelin",
    id: "7d7e1221-5cae-50a5-996b-e2e344ebaf86",
    image: "https://i.ytimg.com/vi/TA9Rec1qAFQ/0.jpg",
    kana: null,
    nation: "UK",
    slug: "/artist/Led Zeppelin",
    sortName: "led zeppelin",
    program: {
      image: "https://i.ytimg.com/vi/TA9Rec1qAFQ/0.jpg",
      programsCount: 11,
      tunesCount: 11,
    },
  },
  {
    name: "The Police",
    id: "1eac8335-5987-5de1-b43f-5f3d56d676c3",
    image: "https://i.ytimg.com/vi/ehYpFjwnDH0/0.jpg",
    kana: null,
    nation: "UK",
    slug: "/artist/The Police",
    sortName: "police",
    program: {
      image: "https://i.ytimg.com/vi/ehYpFjwnDH0/0.jpg",
      programsCount: 6,
      tunesCount: 6,
    },
  },
  {
    name: "Cream",
    id: "6bfac142-ac47-5603-8e93-de192ed95c7a",
    image: "https://i.ytimg.com/vi/V5BF1V1pbTs/0.jpg",
    kana: null,
    nation: "UK",
    slug: "/artist/Cream",
    sortName: "cream",
    program: {
      image: "https://i.ytimg.com/vi/V5BF1V1pbTs/0.jpg",
      programsCount: 4,
      tunesCount: 10,
    },
  },
  {
    name: "The Beatles",
    id: "2a8ab7e4-ae57-5896-8fe7-3eed9060c14a",
    image: "https://i.ytimg.com/vi/naoknj1ebqI/0.jpg",
    kana: null,
    nation: "UK",
    slug: "/artist/The Beatles",
    sortName: "beatles",
    program: {
      image: "https://i.ytimg.com/vi/naoknj1ebqI/0.jpg",
      programsCount: 9,
      tunesCount: 9,
    },
  },
  {
    name: "Deep Purple",
    id: "5061f4f3-3144-55f3-86ea-fd399b1f3623",
    image: "https://i.ytimg.com/vi/_4QBhC1uCP4/0.jpg",
    kana: null,
    nation: "UK",
    slug: "/artist/Deep Purple",
    sortName: "deep purple",
    program: {
      image: "https://i.ytimg.com/vi/bRLhpn4TLvo/0.jpg",
      programsCount: 8,
      tunesCount: 11,
    },
  },
  {
    name: "Uriah Heep",
    id: "f07f68d3-9075-54e2-aba9-fca4c4d8c8c7",
    image: "https://i.ytimg.com/vi/of4mIK-xVIw/0.jpg",
    kana: null,
    nation: "UK",
    slug: "/artist/Uriah Heep",
    sortName: "uriah heep",
    program: {
      image: "https://i.ytimg.com/vi/of4mIK-xVIw/0.jpg",
      programsCount: 5,
      tunesCount: 10,
    },
  },
  {
    name: "The Jimi Hendrix Experience",
    id: "4a8f2104-d3fe-512c-9280-c6b68accdfe9",
    image: "https://i.ytimg.com/vi/M_5UBtyBoLk/0.jpg",
    kana: null,
    nation: "US",
    slug: "/artist/The Jimi Hendrix Experience",
    sortName: "jimi hendrix experience",
    program: {
      image: "https://i.ytimg.com/vi/M_5UBtyBoLk/0.jpg",
      programsCount: 6,
      tunesCount: 11,
    },
  },
  {
    name: "Paul Weller",
    id: "afe204e9-09c9-5755-b733-457f963dad57",
    image: "https://i.ytimg.com/vi/qOYrioF-hB8/0.jpg",
    kana: null,
    nation: "UK",
    slug: "/artist/Paul Weller",
    sortName: "paul weller",
    program: {
      image: "https://i.ytimg.com/vi/qOYrioF-hB8/0.jpg",
      programsCount: 4,
      tunesCount: 6,
    },
  },
  {
    name: "Buzzcocks",
    id: "45a063ff-df78-52d4-8cae-607b5b084b30",
    image: "https://i.ytimg.com/vi/Kqufuwc_QDc/0.jpg",
    kana: null,
    nation: "UK",
    slug: "/artist/Buzzcocks",
    sortName: "buzzcocks",
    program: {
      image: "https://i.ytimg.com/vi/Ajn-VM-XrPM/0.jpg",
      programsCount: 1,
      tunesCount: 7,
    },
  },
  {
    name: "Cheap Trick",
    id: "3d3e3390-7bac-542f-8083-6faba054787a",
    image: "https://i.ytimg.com/vi/lPOSJEJ_lmM/0.jpg",
    kana: null,
    nation: "US",
    slug: "/artist/Cheap Trick",
    sortName: "cheap trick",
    program: {
      image: "https://i.ytimg.com/vi/lPOSJEJ_lmM/0.jpg",
      programsCount: 9,
      tunesCount: 14,
    },
  },
];

export const artist = artists[0];
