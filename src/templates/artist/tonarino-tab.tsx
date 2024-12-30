import * as React from "react";
import { SectionWrapper } from "@cieloazul310/gatsby-theme-aoi";
import { TunesByProgramSkeleton } from "@/components/tunes/tunes-by-program";
import type { Artist } from "types";
import ArtistPageHeader from "./page-header";

type ArtistTonarinoTabProps = {
  item: Pick<Artist, "name" | "nation"> & {
    program: Pick<Artist["program"], "image" | "programsCount" | "tunesCount">;
  };
};

function ArtistTonarinoTab({ item }: ArtistTonarinoTabProps) {
  return (
    <SectionWrapper>
      <ArtistPageHeader artist={item} />
      <TunesByProgramSkeleton />
    </SectionWrapper>
  );
}

export default ArtistTonarinoTab;
