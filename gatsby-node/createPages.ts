import * as path from 'path';
import { CreatePagesArgs } from 'gatsby';
import { Program, ArtistBrowser } from '../types';

type CreatePagesQueryData = {
  allProgram: {
    edges: {
      node: Pick<Program, 'week' | 'title' | 'slug' | 'date'>;
    }[];
  };
  allArtist: {
    edges: {
      node: Pick<ArtistBrowser, 'name' | 'slug'>;
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
      allArtist(sort: { fields: sortName, order: ASC }) {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  if (!result.data) throw new Error('There are no posts');

  const { allProgram, allArtist } = result.data;

  allProgram.edges.forEach(({ node }, index) => {
    const previous = index === 0 ? null : allProgram.edges[index - 1].node;
    const next = index === allProgram.edges.length - 1 ? null : allProgram.edges[index + 1].node;

    createPage({
      path: node.slug,
      component: path.resolve('./src/templates/program.tsx'),
      context: { previous: previous?.slug ?? null, next: next?.slug ?? null, slug: node.slug },
    });
  });

  allArtist.edges.forEach(({ node }, index) => {
    const previous = index === 0 ? null : allArtist.edges[index - 1].node;
    const next = index === allArtist.edges.length - 1 ? null : allArtist.edges[index + 1].node;

    createPage({
      path: node.slug,
      component: path.resolve('./src/templates/artist.tsx'),
      context: {
        index,
        previous: previous?.slug ?? null,
        next: next?.slug ?? null,
        slug: node.slug,
      },
    });
  });
}
