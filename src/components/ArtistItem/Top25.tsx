import * as React from 'react';
import ArtistItemContainer from './Container';
import { useProgramTop25 } from '../../utils/graphql-hooks';

function ProgramTop25() {
  const top25 = useProgramTop25();
  return <ArtistItemContainer title="登場回数Top25" artists={top25} />;
}

export default ProgramTop25;
