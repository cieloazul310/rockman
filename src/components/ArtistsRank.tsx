import * as React from 'react';
import Rank from './Rank';
import { useProgramTop25, useTunesTop25 } from '../utils/graphql-hooks';

export function EdgesRank() {
  const edges = useProgramTop25();
  return (
    <Rank edges={edges} title="登場回数 Top25" nodeTitle={({ name }) => name} nodeValue={({ programCount }) => `${programCount}回`} dense />
  );
}

export function TunesRank() {
  const edges = useTunesTop25();
  return <Rank edges={edges} title="曲数 Top25" nodeTitle={({ name }) => name} nodeValue={({ tunesCount }) => `${tunesCount}曲`} dense />;
}
