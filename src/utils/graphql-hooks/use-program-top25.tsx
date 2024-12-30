import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import type { MinimumArtist } from "types";

type UseProgramTop25QueryData = {
  allArtist: {
    nodes: MinimumArtist[];
  };
};

export default function useProgramTop25() {
  const { allArtist } = useStaticQuery<UseProgramTop25QueryData>(graphql`
    query ProgramCount {
      allArtist(
        sort: [
          { program: { programsCount: DESC } }
          { program: { tunesCount: DESC } }
          { sortName: ASC }
        ]
        limit: 25
      ) {
        nodes {
          ...minimumArtist
        }
      }
    }
  `);
  return React.useMemo(() => allArtist.nodes, [allArtist]);
}
