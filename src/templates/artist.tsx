import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import { AppLink } from 'gatsby-theme-typescript-material-ui/src/components/AppLink';
import TunesByWeek from '../components/TunesByWeek';
import { ArtistTemplateQuery, Yaml } from '../../graphql-types';

interface Props {
  data: ArtistTemplateQuery;
  pageContext: {
    artist: string;
    previous: [string, string, string, Yaml[]],
    next: [string, string, string, Yaml[]]
  };
}

function ArtistTemplate({ data, pageContext }: Props) {
  console.log(pageContext);
  console.log(data);
  const { previous, next } = pageContext;

  return (
    <Layout title={pageContext.artist} maxWidth="md">
      <div>
        {data.allYaml.edges.map(({ node }, index) => (
          <TunesByWeek key={index} program={node} filter={(tune) => tune.artist === pageContext.artist} />
        ))}
        {previous ? (
          <AppLink to={`/artist/${previous[0]}/`}>{previous[0]}</AppLink>
        ) : null}
        {next ? <AppLink to={`/artist/${next[0]}/`}>{next[0]}</AppLink> : null}
      </div>
    </Layout>
  );
};

export default ArtistTemplate;

export const query = graphql`
         query ArtistTemplate($artist: String!) {
           allYaml(
             filter: { playlist: { elemMatch: { artist: { glob: $artist } } } }
             sort: { fields: week, order: ASC }
           ) {
             edges {
               node {
                 id
                 title
                 date(formatString: "YYYY-MM-DD")
                 categories
                 fields {
                   slug
                 }
                 guests
                 subtitle
                 week
                 year
                 playlist {
                   artist
                   corner
                   id
                   indexInWeek
                   index
                   kana
                   label
                   name
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
         }
       `;