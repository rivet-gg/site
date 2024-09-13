// Auto-generate navigation
// TODO Move to server component
import './scripts/generateNavigation.mjs';

import nextMDX from '@next/mdx';
import withSearch from './src/mdx/search.mjs';
import { config } from './src/mdx/mdx.mjs';

const withMDX = nextMDX(config);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['@rivet-gg/components'],
  typescript: {
    ignoreBuildErrors: true
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
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
