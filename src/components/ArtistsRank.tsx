import * as React from 'react';
import Rank from './Rank';
import { useArtists } from '../utils/graphql-hooks';

interface Props {
  n: number;
}

export function EdgesRank({ n }: Props) {
  const edgesRankItem = useArtists('edges', n).slice(1);
  return (
    <Rank
      items={edgesRankItem}
      title={`登場回数 Top${n}`}
      itemTitle={(item) => item.fieldValue}
      itemValue={(item) => `${item.edges.length}回`}
      dense
    />
  );
}

export function TunesRank({ n }: Props) {
  const tunesRankItem = useArtists('tunes', n).slice(1);
  return (
    <Rank
      items={tunesRankItem}
      title={`曲数 Top${n}`}
      itemTitle={(item) => item.fieldValue}
      itemValue={(item) => `${item.tunes.length}曲`}
      dense
    />
  );
}
