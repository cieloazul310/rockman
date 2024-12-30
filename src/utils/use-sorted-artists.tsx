import * as React from "react";
import type { ArtistListItem } from "types";
import { sortByYomi, sortByPrograms, sortByTunes } from "./sort-by-yomi";

export default function useSortedArtists(
  artists: ArtistListItem[],
  sortType: "abc" | "programs" | "tunes" = "abc",
) {
  return React.useMemo(() => {
    if (sortType === "programs") return [...artists].sort(sortByPrograms);
    if (sortType === "tunes") return [...artists].sort(sortByTunes);
    return [...artists].sort(sortByYomi);
  }, [artists, sortType]);
}
