import { graphql, useStaticQuery } from 'gatsby';
import { Site } from '../../../graphql-types';

export default function useSiteMetadata(): Site['siteMetadata'] {
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
