import { getSiteUrl } from '@/lib/siteUrl';

import { Feed } from 'feed';
import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/getAllArticles';

export async function GET() {
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

  articles.forEach(article => {
    let url = `${siteUrl}/blog/${article.slug}`;
    feed.addItem({
      title: article.info.title,
      id: article.slug,
      date: article.info.date,
      author: article.metadata.authors,
      link: url,
      description: article.info.description
    });
  });

  let response = new NextResponse(feed.rss2());
  response.headers.set('Content-Type', 'application/xml');
  return response;
}
