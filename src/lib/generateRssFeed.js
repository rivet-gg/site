import ReactDOMServer from 'react-dom/server';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { Feed } from 'feed';
import { mkdir, writeFile } from 'fs/promises';

import { getAllArticles } from './getAllArticles';
import { getSiteUrl } from './siteUrl';

export async function generateRssFeed() {
  let siteUrl = getSiteUrl();
  let articles = await getAllArticles();

  let feed = new Feed({
    title: 'Rivet',
    description: 'Rivet news',
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()} Rivet Gaming, Inc.`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`
    }
  });

  for (let article of articles) {
    let url = `${siteUrl}/${article.href}`;
    let html = ReactDOMServer.renderToStaticMarkup(
      <MemoryRouterProvider>
        <article.component isRssFeed />
      </MemoryRouterProvider>
    );

    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      content: html,
      author: [article.authorInfo],
      contributor: [article.authorInfo],
      date: new Date(article.date)
    });
  }

  await mkdir('./public/rss', { recursive: true });
  await Promise.all([
    writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8'),
    writeFile('./public/rss/feed.json', feed.json1(), 'utf8')
  ]);
}
