import { Metadata } from 'next';
import nathanFlurry from '../../authors/nathan-flurry/avatar.jpeg';
import nicholasKissel from '../../authors/nicholas-kissel/avatar.jpeg';
import { StaticImageData } from 'next/image';

const authors = {
  'nathan-flurry': {
    name: 'Nathan Flurry',
    role: 'Co-founder & CTO',
    avatar: nathanFlurry,
    url: 'https://twitter.com/nathanflurry'
  },
  'nicholas-kissel': {
    name: 'Nicholas Kissel',
    role: 'Co-founder & CEO',
    avatar: nicholasKissel,
    url: 'https://twitter.com/nicholaskissel'
  }
};

const categories = {
  changelog: {
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
  technical: {
    name: 'Technical'
    // href: '/blog/developer-changelog',
  }
};

export interface ArticleInfo {
  title: string;
  description: string;
  keywords: string[];
  date: Date;
  author: {
    id: string;
    name: string;
    role: string;
    url: string;
    avatar: StaticImageData;
  };
  category: {
    id: string;
    name: string;
  };
  images: {
    hero: {
      image: StaticImageData;
      alt: string;
    };
  };
}

export const convertConfigToInfo = (config: Record<string, any>): ArticleInfo | undefined => {
  if (!config) {
    return undefined;
  }

  if (!config.category || !categories[config.category])
    throw new Error(
      `Unknown category: ${config.category}, please use one of ${Object.keys(categories).join(', ')}`
    );

  if (!config.author || !authors[config.author])
    throw new Error(`Unknown author: ${config.auhtor}, please use one of ${Object.keys(authors).join(', ')}`);

  if (!config.images.hero || !config.images.hero.image || !config.images.hero.alt)
    throw new Error(`Missing hero image or alt text`);

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    date: new Date(config.date),
    author: {
      id: config.author,
      ...authors[config.author]
    },
    category: {
      id: config.category,
      ...categories[config.category]
    },
    images: config.images
  };
};

export function convertConfigToMetadata(config: Record<string, string>): Metadata | undefined {
  if (!config) {
    return undefined;
  }

  let info = convertConfigToInfo(config);
  if (!info) {
    return undefined;
  }

  let { title, description, keywords, date, author, category } = info;

  return {
    title,
    description,
    keywords,
    category: category.name,
    authors: [{ name: author.name, url: author.url }],
    openGraph: {
      type: 'article',
      publishedTime: date.toISOString()
    }
  };
}
