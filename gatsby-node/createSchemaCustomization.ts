import { CreateSchemaCustomizationArgs } from 'gatsby';

export function createSchemaCustomization({ actions }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  createTypes(`
    type Artist implements Node {
      name: String!
      kana: String
      image: String
      sortName: String!
      nation: String!
      program: [program] @link
      tunes: [programPlaylist]
      programCount: Int!
      tunesCount: Int!
      relatedArtists: [Artist] @link(by: "name")
    }
    type program implements Node {
      week: Int!
      year: Int!
      title: String!
      subtitle: String
      guests: [String]
      categories: [String]
      date: Date! @dateformat
      playlist: [programPlaylist]
    }
    type programPlaylist {
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
    }
  `);
}
