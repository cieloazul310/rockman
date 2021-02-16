import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { AllSelectorsQuery } from '../../../graphql-types';

export type SelectorsItem = Pick<AllSelectorsQuery['allProgram']['group'][number], 'totalCount'> & {
  fieldValue: NonNullable<AllSelectorsQuery['allProgram']['group'][number]['fieldValue']>;
};

export function useAllSelectors(): SelectorsItem[] {
  const data = useStaticQuery<AllSelectorsQuery>(graphql`
    query AllSelectors {
      allProgram(filter: { playlist: { elemMatch: { selector: { regex: "/^(?!.*草野マサムネ).*$/" } } } }) {
        group(field: playlist___selector) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return React.useMemo(() => {
    return data.allProgram.group
      .filter((group): group is SelectorsItem => Boolean(group.fieldValue) && group.fieldValue !== '草野マサムネ')
      .sort((a, b) => b.totalCount - a.totalCount);
  }, [data]);
}
