import nathanFlurry from '../authors/nathan-flurry/avatar.jpeg';
import nicholasKissel from '../authors/nicholas-kissel/avatar.jpeg';

const authors = {
  'nathan-flurry': {
    name: 'Nathan Flurry',
    role: 'Co-founder & CTO',
    avatar: nathanFlurry
  },
  'nicholas-kissel': {
    name: 'Nicholas Kissel',
    role: 'Co-founder & CEO',
    avatar: nicholasKissel
  }
};

const categories = {
  'changelog': {
    name: 'Changelog'
    // href: '/blog/developer-changelog',
  },
  'monthly-update': {
    name: 'Monthly Update'
    // href: '/blog/developer-changelog',
  },
  'launch-week': {
    name: 'Launch Week'
    // href: '/blog/launch-week',
  },
  'technical': {
    name: 'Technical'
    // href: '/blog/developer-changelog',
  },
};
export function processArticleMeta(meta, slug) {
  let href = `/blog/${slug}`;

  // Fetch author
  let authorInfo = authors[meta.author];
  if (!authorInfo) throw new Error(`Unknown author: ${meta.author}`);

  // Fetch category
  let categoryInfo = categories[meta.category];
  if (!categoryInfo) throw new Error(`Unknown category: ${category}`);

  return {
    href,
    categoryInfo,
    authorInfo,
    slug,
    ...meta
  };
}
