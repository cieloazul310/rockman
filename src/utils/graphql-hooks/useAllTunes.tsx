import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { AllTunesQuery } from '../../../graphql-types';

export function useAllTunes() {
  const data = useStaticQuery<AllTunesQuery>(graphql`
    query AllTunes {
      allProgramPlaylist(sort: { fields: id, order: ASC }) {
        edges {
          node {
            artist
            corner
            id
            index
            indexInWeek
            kana
            label
            nation
            producer
            selector
            title
            week
            year
            youtube
          }
        }
      }
    }
  `);
  return React.useMemo(() => data.allProgramPlaylist.edges, [data]);
}
