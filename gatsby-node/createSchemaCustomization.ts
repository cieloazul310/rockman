import { CreateSchemaCustomizationArgs } from 'gatsby';

export default function createSchemaCustomization({ actions }: CreateSchemaCustomizationArgs): void {
  const { createTypes } = actions;

  createTypes(`
    type Artist implements Node @dontInfer {
      name: String!
      kana: String
      image: String
      sortName: String!
      nation: String!
      program: [Program] @link
      tunes: [Tune]!
      programCount: Int!
      tunesCount: Int!
      relatedArtists: [Artist] @link(by: "name")
      slug: String!
    }
    type Program implements Node @dontInfer {
      week: Int!
      year: Int!
      title: String!
      subtitle: String
      guests: [String]
      categories: [String]
      date: Date! @dateformat
      playlist: [Tune]!
    }
    type Tune @dontInfer {
      id: String!
      index: Int
      indexInWeek: Int!
      week: Int!
      title: String!
      artist: Artist @link(by: "name")
      kana: String
      year: Int!
      nation: String!
      label: String
      producer: [String]
      corner: String
      youtube: String
      selector: String!
      program: Program! @link(by: "week", from: "week")
    }
    type SpitzAlbum implements Node @dontInfer {
      albumIdNum: Int!
      year: Int!
      title: String!
      tunes: [SpitzTune!]!
    }
    type SpitzTune {
      id: String!
      index: Int!
      title: String!
      append: [Program]!
    }
  `);
}
