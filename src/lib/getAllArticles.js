import glob from 'fast-glob';
import * as path from 'path';
import { processArticleMeta } from './articleMetadata';

async function importArticle(articleFilename) {
  // Parse filename
  let [category, slug, name] = articleFilename.split('/');
  if (name !== 'index.mdx') {
    throw new Error(`Unexpected filename: ${articleFilename}`);
  }

  // Parse file
  console.log('Parsing', articleFilename)
  let { meta, default: component } = await import(`../pages/blog/${articleFilename}`);

  let enriched = processArticleMeta(meta, category, slug);

  return {
    component,
    ...enriched,
  };
}

export async function getAllArticles() {
  let articleFilenames = await glob(['*/*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/blog')
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort((a, z) => new Date(z.date) - new Date(a.date));
}
