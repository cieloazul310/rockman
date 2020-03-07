import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from 'gatsby-theme-typescript-material-ui/src/layout';
import TunesByProgram from '../components/TunesByProgram';
import PageNavigation from '../components/PageNavigation';
import { ArtistTemplateQuery, Program } from '../../graphql-types';

interface Props {
  data: ArtistTemplateQuery;
  pageContext: {
    artist: string;
    previous: [string, string, string, Program[]];
    next: [string, string, string, Program[]];
  };
}

function ArtistTemplate({ data, pageContext }: Props) {
  console.log(pageContext);
  const { previous, next } = pageContext;

  return (
    <Layout title={pageContext.artist} maxWidth="md">
      <div>
        {data.allProgram.edges.map(({ node }, index) => (
          <TunesByProgram
            key={index}
            program={node}
            filter={tune => tune.artist === pageContext.artist}
          />
        ))}
        <PageNavigation 
          prev={previous ? {
            to: `/artist/${previous[0]}`,
            label: previous[0]
          } : null}
          next={next ? {
            to: `/artist/${next[0]}`,
            label: next[0]
          } : null}
        />
      </div>
    </Layout>
  );
}

export default ArtistTemplate;

export const query = graphql`
  query ArtistTemplate($artist: String!) {
    allProgram(
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
