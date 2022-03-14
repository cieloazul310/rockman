/*
import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { AllCategoriesQuery } from '../../../graphql-types';

export type CategoryItem = Pick<AllCategoriesQuery['allProgram']['group'][number], 'totalCount'> & {
  fieldValue: NonNullable<AllCategoriesQuery['allProgram']['group'][number]['fieldValue']>;
};

export function useAllCategories(): CategoryItem[] {
  const data = useStaticQuery<AllCategoriesQuery>(graphql`
    query AllCategories {
      allProgram(sort: { fields: week, order: ASC }) {
        group(field: categories) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  return React.useMemo(() => {
    return data.allProgram.group
      .filter((group): group is CategoryItem => Boolean(group.fieldValue))
      .sort((a, b) => b.totalCount - a.totalCount);
  }, [data]);
}

export function useCategories(fieldValues: string[]): CategoryItem[] {
  const categories = useAllCategories();
  return React.useMemo(() => {
    return categories.filter((category) => category.fieldValue && fieldValues.includes(category.fieldValue));
  }, [fieldValues, categories]);
}
*/
