import glob from 'fast-glob';
import * as path from 'path';

const authors = {
  'nathan-flurry': {
    name: 'Nathan Flurry',
    role: 'Co-founder & CTO'
  }
}

const categories = {
  'developer-changelog': {
    name: 'Developer Changelog',
    // href: '/blog/developer-changelog',
  },
  'hub-changelog': {
    name: 'Hub Changelog',
    // href: '/blog/hub-changelog',
  },
  'launch-week': {
    name: 'Launch Week',
    // href: '/blog/launch-week',
  },
}

async function importArticle(articleFilename) {
  // Parse filename
  let [category, slug, name] = articleFilename.split('/');
  if (name !== 'index.mdx') {
    throw new Error(`Unexpected filename: ${articleFilename}`);
  }
  
  // Parse file
  console.log('Parsing', articleFilename)
  let { meta, default: component } = await import(`../pages/blog/${articleFilename}`);

  // Fetch author
  let authorInfo = authors[meta.author];
  if (!authorInfo) throw new Error(`Unknown author: ${meta.author}`);

  // Fetch category
  let categoryInfo = categories[category];
  if (!categoryInfo) throw new Error(`Unknown category: ${category}`);

  return {
    href: `/blog/${category}/${slug}`,
    categoryInfo,
    authorInfo,
    slug,
    component,
    ...meta,
  };
}

export async function getAllArticles() {
  let articleFilenames = await glob(['*/*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/blog')
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort((a, z) => new Date(z.date) - new Date(a.date));
}
