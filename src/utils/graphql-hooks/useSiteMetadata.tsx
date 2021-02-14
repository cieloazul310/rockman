import { graphql, useStaticQuery } from 'gatsby';
import { Site } from '../../../graphql-types';

export function useSiteMetadata() {
  const data = useStaticQuery<{ site: Required<Pick<Site, 'siteMetadata'>> }>(graphql`
    query useSiteMetadata {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          lang
          baseUrl
        }
      }
    }
  `);
  return data.site.siteMetadata;
}