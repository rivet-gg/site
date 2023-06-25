import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { formatDate } from '@/lib/formatDate';
import { getAllArticles } from '@/lib/getAllArticles';

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
          <div className='pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-800/10 dark:ring-gray-200/10'></div>
        </div>

        {/* Date & category */}
        <div className='mt-8 flex items-center gap-x-4 text-xs'>
          <time datetime='2020-03-16' className='text-slate-500'>
            {formatDate(article.date)}
          </time>
          <div className='relative z-10 rounded-full bg-slate-50 px-3 py-1.5 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400'>
            {article.categoryInfo.name}
          </div>
        </div>

        {/* Description */}
        <div className='group relative'>
          <h3 className='mt-3 text-lg font-semibold leading-6 text-slate-900 group-hover:text-slate-600 dark:text-slate-100 dark:group-hover:text-slate-400'>
            <Link href={article.href}>
              <span className='absolute inset-0'></span>
              {article.title}
            </Link>
          </h3>
          <p className='mt-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>
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
            className='h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-100'
          />
          <div className='text-sm leading-6'>
            <div className='font-semibold text-slate-900 dark:text-slate-100'>{article.authorInfo.name}</div>
            <div className='text-slate-600 dark:text-slate-400'>{article.authorInfo.role}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <SimpleLayout title='Rivet Blog'>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {articles.map(article => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </SimpleLayout>
    </>
  );
}

ArticlesIndex.prose = false;

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta)
    }
  };
}
