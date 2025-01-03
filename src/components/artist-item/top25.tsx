import * as React from "react";
import { useProgramTop25 } from "@/utils/graphql-hooks";
import ArtistItemContainer from "./container";

function ProgramTop25() {
  const top25 = useProgramTop25();
  return <ArtistItemContainer title="登場回数Top25" artists={top25} />;
}

export default ProgramTop25;
