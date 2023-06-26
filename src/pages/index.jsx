import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { generateRssFeed } from '@/lib/generateRssFeed';
import { getAllArticles } from '@/lib/getAllArticles';
import { HeroPattern } from '@/components/HeroPattern';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/pro-solid-svg-icons';
import imgLobbies from '@/images/product/lobbies.png';

const pages = [
  {
    name: 'Game Servers',
    features: [
      {
        name: 'Push to deploy.',
        icon: faBook
      },
      {
        name: 'SSL certificates.',
        icon: faBook
      },
      {
        name: 'Database backups.',
        icon: faBook
      }
    ]
  },
  { name: 'DDoS Mitigation', features: [] },
  { name: 'Matchmaking', features: [] },
  { name: 'Analytics', features: [] },
  { name: 'Social', features: [] },
  { name: 'CDN', features: [] },
  { name: 'Open Source', features: [] }
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
          className='rounded-md bg-violet-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'>
          Sign Up
        </a>
        <a href='#' className='text-sm font-semibold leading-6 text-white'>
          Crash Course <span aria-hidden='true'>→</span>
        </a>
      </div>
    </div>
  );
}

const variants = {
  enter: direction => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: direction => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function paginate(page, dir) {
  const newPage = page + dir;
  if (newPage < 0) return { index: pages.length - (-newPage % pages.length), dir };
  return { index: newPage % pages.length, dir };
}

function Features() {
  const [page, setPage] = React.useState({ index: 0, dir: 1 });

  return (
    <div className='ring-inse mt-16 h-[500px] w-[1000px] rounded-md shadow-2xl ring-1 ring-gray-800/10 dark:ring-gray-200/10 sm:mt-24'>
      <Tabs index={page.index} onChangeTab={i => setPage({ index: i, dir: i > page.index ? 1 : -1 })} />

      <Pages page={page} onChangePage={setPage} />
    </div>
  );
}

function Tabs({ index, onChangeTab }) {
  return (
    <div className='hidden sm:block'>
      <div className='border-b border-gray-200'>
        <nav className='-mb-px flex' aria-label='Tabs'>
          {pages.map((tab, i) => {
            let isCurrent = i == index;
            return (
              <a
                key={tab.name}
                href={tab.href}
                className={clsx(
                  isCurrent
                    ? 'border-violet-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 cursor-pointer border-b-2 px-1 py-4 text-center text-sm font-medium'
                )}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => onChangeTab(i)}>
                {tab.name}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function Pages({ page, onChangePage }) {
  // TODO: Is this SEO friendly?
  return (
    <div className='relative flex h-full w-full'>
      <AnimatePresence initial={false} custom={page.dir}>
        <motion.div
          key={page.index}
          className='absolute h-full w-full'
          custom={page.dir}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              onChangePage(paginate(page.index, 1));
            } else if (swipe > swipeConfidenceThreshold) {
              onChangePage(paginate(page.index, -1));
            }
          }}>
          <PageGameServers page={pages[page.index]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PageTodo() {
  return <div className='h-full w-full'>Todo</div>;
}

function PageGameServers({ page }) {
  return (
    <div className='flex h-full w-full justify-stretch'>
      {/* Image */}
      <div className='relative flex-1'>
        <div className='absolute w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-3 scale-75 rounded-lg'>
          <Image src={imgLobbies} className='' />
          <div className='absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-800/10 dark:ring-gray-200/10' />
        </div>
      </div>

      {/* Details */}
      <div className='flex-1'>
        <div className='lg:ml-auto lg:px-4 lg:pt-4'>
          <div className='lg:max-w-lg'>
            <h2 className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Something something
            </h2>
            <p className='mt-4 text-m text-gray-300'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit
              eaque, iste dolor cupiditate blanditiis ratione.
            </p>
            <div className='mt-3'>
              <Button href='/docs' arrow='right'>
                Learn More
              </Button>
            </div>

            {/* Features */}
            <div className='mt-6 flex w-full flex-col items-stretch gap-4'>
              {page.features.map(feature => (
                <Link href='/docs' className='border-box outline-inset flex flex-row items-center gap-3 rounded-md px-4 py-2 font-semibold text-white outline outline-1 outline-white/10 hover:bg-violet-600 transition'>
                  <FontAwesomeIcon icon={feature.icon} />
                  {feature.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Index.prose = false;
