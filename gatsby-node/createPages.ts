import * as path from 'path';
import { CreatePagesArgs } from 'gatsby';
import { Program, ArtistBrowser } from '../types';

type CreatePagesQueryData = {
  allProgram: {
    edges: {
      node: Pick<Program, 'week' | 'title' | 'slug' | 'date'>;
    }[];
  };
};

export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<CreatePagesQueryData>(`
    query {
      allProgram(sort: { fields: week, order: ASC }) {
        edges {
          node {
            week
            title
            slug
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  if (!result.data) throw new Error('There are no posts');

  const { allProgram } = result.data;
  allProgram.edges.forEach(({ node }, index) => {
    const previous = index === allProgram.edges.length - 1 ? null : allProgram.edges[index + 1].node;
    const next = index === 0 ? null : allProgram.edges[index - 1].node;

    createPage({
      path: node.slug,
      component: path.resolve('./src/templates/program.tsx'),
      context: { previous: previous?.slug, next: next?.slug, slug: node.slug },
    });
  });
}

/*
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

type ArtistPrevNext = Pick<Artist, 'name' | 'image' | 'programCount' | 'tunesCount' | 'nation'>;

interface CreateArtistPagesQueryData {
  allArtist: {
    edges: {
      node: Pick<Artist, 'name' | 'slug'>;
      next: ArtistPrevNext;
      previous: ArtistPrevNext;
    }[];
  };
}

export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs): Promise<void> {
  const { createPage } = actions;
  const result = await graphql<CreateProgramPagesQueryData>(`
    query {
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
    query {
      allArtist(sort: { fields: sortName, order: ASC }, filter: { name: { ne: "スピッツ" } }) {
        edges {
          node {
            name
            slug
          }
          next {
            name
            image
            tunesCount
            programCount
            nation
            slug
          }
          previous {
            name
            image
            tunesCount
            programCount
            nation
            slug
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
      path: node.slug,
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
*/
