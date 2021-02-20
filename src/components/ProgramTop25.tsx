import * as React from 'react';
import ArtistItemContainer from './ArtistItemContainer';
import { useProgramTop25 } from '../utils/graphql-hooks';

function ProgramTop25(): JSX.Element {
  const top25 = useProgramTop25();
  return <ArtistItemContainer title="登場回数Top25" artists={top25.map(({ node }) => node)} />;
}

export default ProgramTop25;
