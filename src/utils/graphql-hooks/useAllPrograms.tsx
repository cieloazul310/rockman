// import { useStaticQuery, graphql } from 'gatsby';
// import { AllProgramQuery } from '../../../graphql-types';
export {};
/*
export function useAllPrograms() {
  const data = useStaticQuery<AllProgramQuery>(graphql`
    query AllProgram {
      allProgram(sort: { fields: week, order: ASC }) {
        edges {
          node {
            id
            title
            date(formatString: "YYYY-MM-DD")
            categories
            fields {
              slug
              image
            }
          }
        }
      }
    }
  `);
  return data.allProgram.edges;
}
*/
