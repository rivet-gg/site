import React from 'react';
import { generateRssFeed } from '@/lib/generateRssFeed';
import { getAllArticles } from '@/lib/getAllArticles';
import { HeroPattern } from '@/components/HeroPattern';
import clsx from 'clsx';

const tabs = [
  { name: 'Game Servers' },
  { name: 'DDoS Mitigation' },
  { name: 'Matchmaking' },
  { name: 'Analytics' },
  { name: 'Social' },
  { name: 'CDN' },
  { name: 'Open Source' }
];

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
            <Features />
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
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div className='max-w-64 ring-inse mt-16 h-[500px] w-full rounded-md shadow-2xl ring-1 ring-gray-800/10 dark:ring-gray-200/10 sm:mt-24'>
      <Tabs tabIndex={tabIndex} onChangeTabIndex={setTabIndex} />
    </div>
  );
}

function Tabs({ tabIndex, onChangeTabIndex }) {
  return (
    <div className='hidden sm:block'>
      <div className='border-b border-gray-200'>
        <nav className='-mb-px flex' aria-label='Tabs'>
          {tabs.map((tab, i) => {
            let isCurrent = i == tabIndex;
            return (
              <a
                key={tab.name}
                href={tab.href}
                className={clsx(
                  isCurrent
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 cursor-pointer border-b-2 px-1 py-4 text-center text-sm font-medium'
                )}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => onChangeTabIndex(i)}>
                {tab.name}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

Index.prose = false;
