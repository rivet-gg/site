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
import imgLobbies from '@/images/screenshots/lobbies.png';
import imgComputeWhite from 'src/images/products/compute-white.svg';
import imgComputeColor from 'src/images/products/compute-monotone.svg';
import imgGameGuardWhite from 'src/images/products/game-guard-white.svg';
import imgGameGuardColor from 'src/images/products/game-guard-monotone.svg';
import imgMatchmakerWhite from '@/images/products/matchmaker-white.svg';
import imgMatchmakerColor from '@/images/products/matchmaker-monotone.svg';
import imgAnalyticsWhite from '@/images/products/analytics-white.svg';
import imgAnalyticsColor from '@/images/products/analytics-monotone.svg';
import imgSocialWhite from '@/images/products/friend-white.svg';
import imgSocialColor from '@/images/products/friend-monotone.svg';
import imgOSSWhite from '@/images/products/rocket-white.svg';
import imgOSSColor from '@/images/products/rocket-monotone.svg';

const pages = [
  {
    name: 'Game Servers',
    color: '#8A7ED8',
    image: [imgComputeWhite, imgComputeColor],
    features: [
      {
        name: 'Autoscaling',
        icon: faBook
      },
      {
        name: 'DDoS Mitigation',
        icon: faBook
      },
      {
        name: 'No downtime deploys',
        icon: faBook
      }
    ]
  },
  { name: 'DDoS Mitigation', color: '#8A7ED8', image: [imgGameGuardWhite, imgGameGuardColor], features: [] },
  { name: 'Matchmaker', color: '#4DB1F9', image: [imgMatchmakerWhite, imgMatchmakerColor], features: [] },
  { name: 'Analytics', color: '#4DB1F9', image: [imgAnalyticsWhite, imgAnalyticsColor], features: [] },
  { name: 'Social', color: '#F2B046', image: [imgSocialWhite, imgSocialColor], features: [] },
  // { name: 'CDN', features: [] },
  { name: 'Open Source', color: '#8A7ED8', image: [imgOSSWhite, imgOSSColor], features: [] }
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
          className='rounded-md bg-violet-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400'>
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
    <div className='ring-inse mt-16 w-full rounded-md shadow-2xl ring-1 ring-gray-800/10 dark:ring-gray-200/10 sm:mt-24'>
      <Tabs index={page.index} onChangeTab={i => setPage({ index: i, dir: i > page.index ? 1 : -1 })} />
      <Pages page={page} onChangePage={setPage} />
    </div>
  );
}

function Tabs({ index, onChangeTab }) {
  return (
    <div className='hidden sm:block'>
      <div className='border-b border-zinc-900/10 dark:border-white/15'>
        <nav className='-mb-px flex' aria-label='Tabs'>
          {pages.map((tab, i) => {
            let isCurrent = i == index;
            return (
              <div
                key={tab.namehover}
                href={tab.href}
                className={clsx(
                  isCurrent
                    ? 'border-violet-500 bg-[color:var(--tab-color)] text-white'
                    : 'opacity-50 hover:opacity-100',
                  'group/tab align-center m-2 flex w-1/4 cursor-pointer flex-col items-center rounded-lg py-2 text-center font-display text-sm font-semibold text-white transition'
                )}
                style={{ '--tab-color': tab.color }}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => onChangeTab(i)}>
                <div className='relative h-16 w-16'>
                  <Image
                    src={tab.image[0]}
                    className={clsx(
                      'absolute h-full w-full opacity-100 transition'
                      // isCurrent && 'opacity-0'
                    )}
                  />
                  {/* <Image
                    src={tab.image[1]}
                    className={clsx(
                      'absolute h-full w-full opacity-0 transition',
                      isCurrent && 'opacity-100'
                    )}
                  /> */}
                </div>
                <div>{tab.name}</div>
              </div>
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
    <div className='relative flex h-[500px] w-full overflow-hidden'>
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
        <div className='absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 -rotate-3 scale-75 rounded-lg'>
          <Image src={imgLobbies} className='' />
          <div className='absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-800/10 dark:ring-gray-200/10' />
        </div>
      </div>

      {/* Details */}
      <div className='flex-1'>
        <div className='lg:ml-auto lg:px-4 lg:pt-4'>
          <div className='lg:max-w-lg'>
            {/* Title */}
            <h2 className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Something something
            </h2>
            <p className='text-m mt-4 text-gray-300'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit
            </p>

            {/* Features */}
            <div className='mt-6 flex w-full flex-col items-stretch gap-4'>
              {page.features.map(feature => (
                <Link
                  href='/docs'
                  className='border-box outline-inset flex flex-row items-center gap-3 rounded-md px-4 py-2 font-semibold text-white outline outline-1 outline-white/10 transition hover:bg-violet-600'>
                  <FontAwesomeIcon icon={feature.icon} />
                  {feature.name}
                </Link>
              ))}
            </div>

            {/* Learn more */}
            <div className='mt-3'>
              <Button href='/docs' arrow='right'>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Index.prose = false;
