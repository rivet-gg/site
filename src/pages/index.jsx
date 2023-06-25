import Image from 'next/image';
import { formatDate } from '@/lib/formatDate';
import { generateRssFeed } from '@/lib/generateRssFeed';
import { getAllArticles } from '@/lib/getAllArticles';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeroPattern } from '@/components/HeroPattern';

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed();
  }

  return {
    props: {
      articles: (await getAllArticles()).slice(0, 4).map(({ component, ...meta }) => meta)
    }
  };
}

export default function Index() {
  return (
    <div>
      <HeroPattern />

      {/* Header */}
      <div className='relative isolate pt-14'>
        <div className='py-24 sm:py-32 lg:pb-40'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <Title />
            <Tabs />
          </div>
        </div>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className='mx-auto max-w-2xl text-center'>
      <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
        Multiplayer development platform
      </h1>
      <p className='mt-6 text-lg leading-8 text-gray-300'>
        Open-source suite of tools to run, scale, and engage audiences within your multiplayer game.
      </p>
      <div className='mt-10 flex items-center justify-center gap-x-6'>
        <a
          href='#'
          className='rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'>
          Sign Up
        </a>
        <a href='#' className='text-sm font-semibold leading-6 text-white'>
          Crash Course <span aria-hidden='true'>→</span>
        </a>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className='max-w-64 ring-inse mt-16 h-[500px] w-full rounded-md shadow-2xl ring-1 ring-gray-800/10 dark:ring-gray-200/10 sm:mt-24'></div>
  );
}

Index.prose = false;
