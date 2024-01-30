import glob from 'fast-glob';
import * as path from 'path';

async function importArticle(articleFilename) {
  // Parse filename
  let [slug, name] = articleFilename.split('/');
  if (name !== 'page.mdx') {
    throw new Error(`Unexpected filename: ${articleFilename}`);
  }

  let { default: component, config, metadata, info } = await import(`../app/blog/(posts)/${articleFilename}`);

  return {
    component,
    config,
    metadata,
    info,
    slug
  };
}

export async function getAllArticles() {
  let articleFilenames = await glob(['*/page.mdx'], {
    cwd: path.join(process.cwd(), 'src/app/blog/(posts)')
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort((a, z) => z.info.date - a.info.date);
}
