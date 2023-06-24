import nextMDX from '@next/mdx';
import withSearch from './src/mdx/search.mjs';
import { remarkPlugins } from './src/mdx/remark.mjs';
import { rehypePlugins } from './src/mdx/rehype.mjs';
import { generateNavigation } from './src/build/generateNavigation.mjs';

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    providerImportSource: '@mdx-js/react'
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    scrollRestoration: true
  }
};

export default async function() {
  await generateNavigation();

  return withSearch(withMDX(nextConfig));
}
