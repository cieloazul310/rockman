import * as path from 'path';
import type { CreatePagesArgs } from 'gatsby';
import type { Program, Artist } from '../../types';

type CreatePagesQueryData = {
  allProgram: {
    nodes: Pick<Program, 'week' | 'title' | 'slug' | 'date'>[];
  };
  allArtist: {
    nodes: Pick<Artist, 'name' | 'slug'>[];
  };
};

/**
 * createPages で何をするか
 *
 * 1. 放送回ごとのページを作成
 * 2. アーティストごとのページを作成
 */
export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<CreatePagesQueryData>(`
    {
      allProgram(sort: { week: ASC }) {
        nodes {
          week
          title
          slug
          date(formatString: "YYYY-MM-DD")
        }
      }
      allArtist(sort: { sortName: ASC }) {
        nodes {
          name
          slug
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  if (!result.data) throw new Error('There are no posts');

  const { allProgram, allArtist } = result.data;

  allProgram.nodes.forEach((node, index) => {
    const previous = index === 0 ? null : allProgram.nodes[index - 1];
    const next = index === allProgram.nodes.length - 1 ? null : allProgram.nodes[index + 1];

    createPage({
      path: node.slug,
      component: path.resolve('./src/templates/program/index.tsx'),
      context: { previous: previous?.slug ?? null, next: next?.slug ?? null, slug: node.slug },
    });
  });

  allArtist.nodes.forEach((node, index) => {
    const previous = index === 0 ? null : allArtist.nodes[index - 1];
    const next = index === allArtist.nodes.length - 1 ? null : allArtist.nodes[index + 1];

    createPage({
      path: node.slug,
      component: path.resolve('./src/templates/artist/index.tsx'),
      context: {
        index,
        previous: previous?.slug ?? null,
        next: next?.slug ?? null,
        slug: node.slug,
      },
    });
  });
}
