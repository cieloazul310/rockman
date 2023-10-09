import * as React from "react";
import {
  HomeIcon,
  AboutIcon,
  ProgramIcon,
  ArtistIcon,
  CategoryIcon,
  SelectorIcon,
  TakeOffIcon,
  TimeMachineIcon,
} from "../../icons";

const menu = [
  {
    title: "Top",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "放送回一覧",
    path: "/programs/",
    icon: <ProgramIcon />,
  },
  {
    title: "アーティスト",
    path: "/artists/",
    icon: <ArtistIcon />,
  },
  {
    title: "テーマ",
    path: "/categories/",
    icon: <CategoryIcon />,
  },
  {
    title: "選曲者",
    path: "/selectors/",
    icon: <SelectorIcon />,
  },
  {
    title: "漫遊前の一曲",
    path: "/takeoff/",
    icon: <TakeOffIcon />,
  },
  {
    title: "ちょっぴりタイムマシン",
    path: "/timemachine/",
    icon: <TimeMachineIcon />,
  },
  {
    title: "サイトについて",
    path: "/about/",
    icon: <AboutIcon />,
  },
];

export default menu;
