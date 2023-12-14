import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { formatDate } from '@/lib/formatDate';
import { getAllArticles } from '@/lib/getAllArticles';
import { faRss } from '@fortawesome/pro-solid-svg-icons';
import { HeroPattern } from '../../components/HeroPattern';

function Article({ article }) {
  return (
    <article className='flex flex-col items-start justify-between'>
      <div>
        {/* Image */}
        <div className='relative w-full'>
          <Link href={article.href}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              className='aspect-[2/1] w-full rounded-2xl object-cover'
            />
          </Link>
          <div className='pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-200/10'></div>
        </div>

        {/* Date & category */}
        <div className='mt-8 flex items-center gap-x-4 text-xs'>
          <time dateTime='2020-03-16' className='text-charcole-500'>
            {formatDate(article.date)}
          </time>
          <div className='relative z-10 rounded-full px-3 py-1.5 font-medium bg-charcole-950 text-cream-400'>
            {article.categoryInfo.name}
          </div>
        </div>

        {/* Description */}
        <div className='group relative'>
          <h3 className='mt-3 text-lg font-semibold leading-6 text-cream-100 group-hover:text-cream-400'>
            <Link href={article.href}>
              <span className='absolute inset-0'></span>
              {article.title}
            </Link>
          </h3>
          <p className='mt-5 line-clamp-3 text-sm leading-6 text-cream-400'>
            {article.description}
          </p>
        </div>
      </div>

      <div className='max-w-xl'>
        {/* Author */}
        <div className='relative mt-4 flex items-center gap-x-4'>
          <Image
            src={article.authorInfo.avatar}
            alt=''
            className='h-10 w-10 rounded-full bg-cream-100'
          />
          <div className='text-sm leading-6'>
            <div className='font-semibold text-cream-100'>{article.authorInfo.name}</div>
            <div className='text-cream-400'>{article.authorInfo.role}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <HeroPattern />
      <SimpleLayout title='Blog' intro={<Button icon={faRss} href='/rss/feed.xml'>RSS Feed</Button>}>
        <div className='mt-16 grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-3'>
          {articles.map(article => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </SimpleLayout>
    </>
  );
}

ArticlesIndex.title = 'Blog';
ArticlesIndex.prose = false;
ArticlesIndex.inset = true;

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta)
    }
  };
}
