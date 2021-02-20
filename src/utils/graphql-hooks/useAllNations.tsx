import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { isSchemeNations } from '../useNationColor';
import { AllNationsQuery } from '../../../graphql-types';

export type NationsItem = Pick<AllNationsQuery['allArtist']['group'][number], 'totalCount'> & {
  fieldValue: NonNullable<AllNationsQuery['allArtist']['group'][number]['fieldValue']>;
};

export function useAllNations(): NationsItem[] {
  const data = useStaticQuery<AllNationsQuery>(graphql`
    query AllNations {
      allArtist(filter: { name: { ne: "スピッツ" } }) {
        group(field: nation) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return React.useMemo(() => {
    return data.allArtist.group
      .filter((group): group is NationsItem => Boolean(group.fieldValue))
      .sort((a, b) => b.totalCount - a.totalCount || a.fieldValue.localeCompare(b.fieldValue));
  }, [data]);
}

export function useSchemeNations(): { schemed: NationsItem[]; notSchemed: NationsItem[] } {
  const allNations = useAllNations();
  return React.useMemo(() => {
    const schemed = allNations.filter(({ fieldValue }) => isSchemeNations(fieldValue));
    const notSchemed = allNations.filter(({ fieldValue }) => !isSchemeNations(fieldValue));
    return { schemed, notSchemed };
  }, [allNations]);
}
