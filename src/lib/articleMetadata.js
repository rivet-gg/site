import nathanFlurry from '../authors/nathan-flurry/avatar.jpeg';

const authors = {
  'nathan-flurry': {
    name: 'Nathan Flurry',
    role: 'Co-founder & CTO',
    avatar: nathanFlurry
  }
};

const categories = {
  'developer-changelog': {
    name: 'Developer Changelog'
    // href: '/blog/developer-changelog',
  },
  'hub-changelog': {
    name: 'Hub Changelog'
    // href: '/blog/hub-changelog',
  },
  'launch-week': {
    name: 'Launch Week'
    // href: '/blog/launch-week',
  }
};
export function processArticleMeta(meta, category, slug) {
  let href = `/blog/${category}/${slug}`;

  // Fetch author
  let authorInfo = authors[meta.author];
  if (!authorInfo) throw new Error(`Unknown author: ${meta.author}`);

  // Fetch category
  let categoryInfo = categories[category];
  if (!categoryInfo) throw new Error(`Unknown category: ${category}`);

  return {
    href,
    categoryInfo,
    authorInfo,
    slug,
    ...meta
  };
}
