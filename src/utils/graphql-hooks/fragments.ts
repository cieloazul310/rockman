import { graphql, useStaticQuery } from 'gatsby';

export default function useFragments() {
  useStaticQuery(graphql`
    fragment tuneFields on Tune {
      id
      indexInWeek
      week
      title
      artist {
        ...minimumArtist
      }
      year
      nation
      corner
      youtube
      selector
    }
    fragment minimumArtist on Artist {
      name
      slug
      nation
      program {
        image
        programsCount
        tunesCount
      }
    }
  `);
}
