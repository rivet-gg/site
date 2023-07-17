// Auto-generate navigation
import './scripts/generateNavigation.mjs';

import nextMDX from '@next/mdx';
import withSearch from './src/mdx/search.mjs';
import { remarkPlugins } from './src/mdx/remark.mjs';
import { rehypePlugins } from './src/mdx/rehype.mjs';

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    providerImportSource: '@mdx-js/react'
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    // For static output
    unoptimized: true
  },
  experimental: {
    scrollRestoration: true
  }
};

export default async function () {
  return withSearch(withMDX(nextConfig));
}
