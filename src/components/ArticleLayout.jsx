import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { Button } from '@/components/Button';
import { Prose } from '@/components/Prose';
import { formatDate } from '@/lib/formatDate';
import { processArticleMeta } from '@/lib/articleMetadata';
import { faRss } from '@fortawesome/pro-solid-svg-icons';
import { getSiteUrl } from '../lib/siteUrl';

function ArrowLeftIcon(props) {
  return (
    <svg viewBox='0 0 16 16' fill='none' aria-hidden='true' {...props}>
      <path
        d='M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function ArticleLayout({ children, meta, isRssFeed = false }) {
  let router = useRouter();

  if (isRssFeed) {
    return children;
  }

  // Process article
  if (!router.pathname.startsWith('/blog/')) {
    throw new Error(`Unexpected path: ${href}`);
  }
  let [_, __, slug] = router.pathname.split('/');
  let article = processArticleMeta(meta, slug);

  let siteUrl = getSiteUrl();

  return (
    <>
      <Head>
        <title>{`${article.title} - Rivet Blog`}</title>
        <meta name='description' content={article.description} />

        <meta property='og:title' content={article.title} />
        <meta property='og:description' content={article.description} />
        <meta property='og:image' content={siteUrl + article.image.src} />
        <meta property='og:image:alt' content={article.imageAlt} />

        <meta name='twitter:title' content={article.title} />
        <meta name='twitter:description' content={article.description} />
        <meta name='twitter:image' content={siteUrl + article.image.src} />
        <meta name='twitter:image:alt' content={article.imageAlt} />
      </Head>
      <div className='mt-16 lg:mt-32'>
        <div
          className={clsx(
            'mx-auto px-4 sm:px-6 lg:px-8',
            article.category == 'technical' ? 'max-w-5xl' : 'max-w-2xl'
          )}>
          <Button icon={faRss} href='/rss/feed.xml' className='mb-8'>
            RSS Feed
          </Button>

          <article>
            <header className='flex flex-col'>
              {/* Image */}
              <Image className='aspect-[2/1]' src={article.image} alt={article.imageAlt} />

              {/* Title */}
              <h1 className='mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
                {article.title}
              </h1>

              {/* Date */}
              <time
                dateTime={article.date}
                className='order-first flex items-center text-base text-zinc-400 dark:text-zinc-500'>
                <span className='h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500' />
                <span className='ml-3'>{formatDate(article.date)}</span>
              </time>

              {/* Author */}
              <div className='relative flex items-center gap-x-4'>
                <Image
                  src={article.authorInfo.avatar}
                  alt=''
                  className='h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-100'
                />
                <div className='text-sm leading-6'>
                  <div className='font-semibold text-slate-900 dark:text-slate-100'>
                    {article.authorInfo.name}
                  </div>
                  <div className='text-slate-600 dark:text-slate-400'>{article.authorInfo.role}</div>
                </div>
              </div>
            </header>
            <Prose className='mt-8'>{children}</Prose>
          </article>
        </div>
      </div>
    </>
  );
}
