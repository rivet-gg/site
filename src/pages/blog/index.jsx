import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { formatDate } from '@/lib/formatDate';
import { getAllArticles } from '@/lib/getAllArticles';

function Article({ article }) {
  return (
    <article class='flex flex-col items-start justify-between'>
      <div>
        {/* Image */}
        <div class='relative w-full'>
          <Link href={article.href}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              class='aspect-[2/1] w-full object-cover rounded-2xl'
            />
          </Link>
          <div class='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-800/10 dark:ring-gray-200/10'></div>
        </div>

        {/* Date & category */}
        <div class='mt-8 flex items-center gap-x-4 text-xs'>
          <time datetime='2020-03-16' class='text-slate-500'>
            {formatDate(article.date)}
          </time>
          <div
            class='relative z-10 rounded-full px-3 py-1.5 font-medium bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400'>
            {article.categoryInfo.name}
          </div>
        </div>

        {/* Description */}
        <div class='group relative'>
          <h3 class='mt-3 text-lg font-semibold leading-6 text-slate-900 group-hover:text-slate-600 dark:text-slate-100 dark:group-hover:text-slate-400'>
            <Link href={article.href}>
              <span class='absolute inset-0'></span>
              {article.title}
            </Link>
          </h3>
          <p class='mt-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>{article.description}</p>
        </div>
      </div>

      <div class='max-w-xl'>
        {/* Author */}
        <div class='relative mt-8 flex items-center gap-x-4'>
          <img
            src='https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt=''
            class='h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-100'
          />
          <div class='text-sm leading-6'>
            <p class='font-semibold text-slate-900 dark:text-slate-100'>
              <span class='absolute inset-0'></span>
              {article.authorInfo.name}
            </p>
            <p class='text-slate-600 dark:text-slate-400'>{article.authorInfo.role}</p>
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
        <title>Rivet Blog</title>
      </Head>
      <SimpleLayout title='Rivet Blog'>
        <div class='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
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
