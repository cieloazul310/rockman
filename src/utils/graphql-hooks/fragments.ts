import { graphql, useStaticQuery } from 'gatsby';

export default function useFragments() {
  useStaticQuery(graphql`
    fragment programList on Program {
      id
      title
      slug
      week
      date(formatString: "YYYY-MM-DD")
      image
    }
    fragment tuneItem on Tune {
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
