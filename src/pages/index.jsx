import React from 'react';
import { generateRssFeed } from '@/lib/generateRssFeed';
import { getAllArticles } from '@/lib/getAllArticles';
import { HeroPattern } from '@/components/HeroPattern';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

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

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function paginate(page, dir) {
  const newPage = page + dir;
  if (newPage < 0) return { index: tabs.length - (-newPage % tabs.length), dir };
  return { index: newPage % tabs.length, dir };
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
          {tabs.map((tab, i) => {
            let isCurrent = i == index;
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
  return (
    <div className='relative flex h-72 w-full items-center justify-center'>
      <AnimatePresence initial={false} custom={page.dir}>
        <motion.div
          key={page.index}
          className='absolute h-full w-full bg-red-500'
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
              onChangePage(paginate(page.index, 1, ));
            } else if (swipe > swipeConfidenceThreshold) {
              onChangePage(paginate(page.index, -1));
            }
          }}>
          Hello page {page.index}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// function Page({ index, children }) {
//   return (
//     <div className='absolute h-full w-full bg-red-500' style={{ left: `${index * 100}%` }}>
//       {children}
//     </div>
//   );
// }

Index.prose = false;
