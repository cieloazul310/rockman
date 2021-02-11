import * as path from 'path';
import { CreatePagesArgs } from 'gatsby';
import { Program, Artist } from './types';

type ProgramPrevNext = Pick<Program, 'title' | 'date' | 'fields' | 'week'>;

interface CreateProgramPagesQueryData {
  allProgram: {
    edges: {
      node: Pick<Program, 'fields'>;
      next: ProgramPrevNext;
      previous: ProgramPrevNext;
    }[];
  };
}

type ArtistPrevNext = Pick<Artist, 'name' | 'image' | 'programCount' | 'tunesCount'>;

interface CreateArtistPagesQueryData {
  allArtist: {
    edges: {
      node: Pick<Artist, 'name'>;
      next: ArtistPrevNext;
      previous: ArtistPrevNext;
    }[];
  };
}

export async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<CreateProgramPagesQueryData>(`
    query CreateProgramPages {
      allProgram(sort: { fields: week, order: ASC }) {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            title
            date(formatString: "YYYY-MM-DD")
            fields {
              slug
              image
            }
            week
          }
          previous {
            title
            date(formatString: "YYYY-MM-DD")
            fields {
              slug
              image
            }
            week
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // create Each Program Pages
  result.data?.allProgram.edges.forEach(({ node, next, previous }, index) => {
    if (node.fields?.slug) {
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/program.tsx'),
        context: {
          previous,
          next,
          index,
          current: node,
          slug: node.fields?.slug,
        },
      });
    }
  });

  // create Artists Pages
  const artistResult = await graphql<CreateArtistPagesQueryData>(`
    query CreateArtistPages {
      allArtist(sort: { fields: sortName, order: ASC }, filter: { name: { ne: "スピッツ" } }) {
        edges {
          node {
            name
          }
          next {
            name
            image
            tunesCount
            programCount
            nation
          }
          previous {
            name
            image
            tunesCount
            programCount
            nation
          }
        }
      }
    }
  `);
  if (artistResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  artistResult.data?.allArtist.edges.forEach(({ node, next, previous }, index) => {
    createPage({
      path: `/artist/${node.name}/`,
      component: path.resolve('./src/templates/artist.tsx'),
      context: {
        index,
        previous,
        next,
        name: node.name,
      },
    });
  });
}
