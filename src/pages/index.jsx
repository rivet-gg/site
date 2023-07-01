import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { GridPattern } from '@/components/GridPattern';
import { Game } from '@/components/Game';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { generateRssFeed } from '@/lib/generateRssFeed';
import { getAllArticles } from '@/lib/getAllArticles';
import { HeroPattern } from '@/components/HeroPattern';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faBook,
  faGraduationCap,
  faBooks,
  faChessKnight,
  faGlobe,
  faChartWaterfall,
  faClockRotateLeft,
  faComment,
  faDoorOpen,
  faFire,
  faGearCode,
  faGhost,
  faInfinity,
  faKey,
  faLink,
  faLock,
  faPiggyBank,
  faPlanetMoon,
  faPlug,
  faServer,
  faStopwatch,
  faUserGroup,
  faWreath,
  faSwords,
  faGaugeCircleBolt,
  faPartyHorn,
  faEarthAmericas,
  faFileCertificate
} from '@fortawesome/pro-solid-svg-icons';

import imgComputerFrame from '@/images/effects/computer-frame.png';
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
    description: 'Deploy and scale game servers globally in minutes',
    color: '#8A7ED8',
    image: [imgComputeWhite, imgComputeColor],
    features: [
      {
        name: 'Auto-scaling',
        icon: faChartWaterfall
      },
      {
        name: 'Fast & no downtime deploys',
        icon: faBolt
      },
      {
        name: 'Instant rollbacks',
        icon: faClockRotateLeft
      },
      {
        name: 'Cost effective',
        icon: faPiggyBank
      }
    ]
  },
  {
    name: 'DDoS Mitigation',
    description: 'Protect your game servers from DDoS attacks',
    color: '#8A7ED8',
    image: [imgGameGuardWhite, imgGameGuardColor],
    features: [
      {
        name: 'Mitigates DDoS & botting attacks',
        icon: faSwords
      },
      {
        name: 'No added latency',
        icon: faGaugeCircleBolt
      },
      {
        name: 'Supports WebSockets+SSL, TCP+TLS, & UDP',
        icon: faPlug
      }
    ]
  },
  {
    name: 'Matchmaker',
    description: 'Matchmake players in < 1 second',
    color: '#4DB1F9',
    image: [imgMatchmakerWhite, imgMatchmakerColor],
    features: [
      {
        name: 'Fast matchmaking',
        icon: faStopwatch
      },
      {
        name: 'Integrated with infrastructure',
        icon: faLink
      },
      {
        name: 'Flexible to work with your game',
        icon: faInfinity
      },
      {
        name: 'Configurable region selection',
        icon: faEarthAmericas
      }
    ]
  },
  {
    name: 'Social',
    description: 'Add social features to your game in 1 line of code',
    color: '#F2B046',
    image: [imgSocialWhite, imgSocialColor],
    features: [
      {
        name: 'Easy account integration',
        icon: faKey
      },
      {
        name: 'Parties',
        icon: faPartyHorn
      },
      {
        name: 'Chat',
        icon: faComment
      },
      {
        name: 'Groups',
        icon: faUserGroup
      },
      {
        name: 'Guest accounts',
        icon: faGhost
      }
    ]
  },
  {
    name: 'Analytics',
    description: 'Understand your players & game servers',
    color: '#4DB1F9',
    image: [imgAnalyticsWhite, imgAnalyticsColor],
    features: [
      {
        name: 'Real-time analytics',
        icon: faFire
      },
      {
        name: 'No code changes required',
        icon: faGearCode
      },
      {
        name: 'Insights for both social & services',
        icon: faPlanetMoon
      }
    ]
  },
  // { name: 'CDN', features: [] },
  {
    name: 'Open Source',
    description: 'Source code available to read, modify, and self-host',
    color: '#8A7ED8',
    image: [imgOSSWhite, imgOSSColor],
    features: [
      {
        name: 'Permissive license (Apache 2.0)',
        icon: faFileCertificate
      },
      {
        name: 'Full transparency',
        icon: faDoorOpen
      },
      {
        name: 'Self-host on-premise',
        icon: faServer
      },
      {
        name: 'Audit security',
        icon: faLock
      },
      {
        name: 'Make it your own',
        icon: faWreath
      }
    ]
  }
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
      {/* Hero */}
      {/* <GridPattern className='absolute right-12 top-[600px] -z-10 m-0 w-[300px] max-w-[50%]'></GridPattern>
      <GridPattern className='absolute left-12 top-[600px] -z-10 m-0 w-[300px] max-w-[50%] -scale-x-100'></GridPattern> */}

      {/* Header */}
      <div className='relative isolate'>
        <div className='pb-12 sm:pb-16 lg:pb-20'>
          <Title />

          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <Features />
            <CaseStudies />
          </div>

          <UpAndRunning />
        </div>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className='flex w-full flex-wrap items-center justify-center gap-8'>
      {/* Text */}
      <div className='max-w-2xl text-center'>
        {/* Title */}
        <h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-7xl'>
          The Multiplayer
          <br />
          Development Platform
        </h1>

        {/* Subtitle */}
        <p className='mt-6 text-lg leading-8 text-gray-300'>
          All-in-one solution to deploy, scale, and operate your multiplayer game
        </p>

        {/* CTA */}
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

        {/* YC */}
        <Link
          href='https://www.ycombinator.com/'
          target='_blank'
          className='margin-auto mx-auto mt-8 block w-max rounded-lg bg-white/5 px-4 py-2 ring-1 ring-white/10'>
          <div className='flex items-center justify-center gap-2 text-sm font-semibold text-white'>
            <div>Backed by</div>
            <YCLogo className='h-[1.7em]' white={true} />
          </div>
        </Link>
      </div>

      {/* Demo */}
      <Demo />
    </div>
  );
}

function Demo() {
  return (
    <div className='relative h-[750px] w-[640px] shrink-0 grow-0 pointer-events-none'>
      <div className='absolute left-[50%] h-[1000px] w-[1000px] origin-top -translate-x-1/2 scale-[calc(640/1000*1.3)]'>
        <Image
          src={imgComputerFrame}
          alt='Rivet'
          className='pointer-events-none absolute z-10 h-[1000px] w-[1000px] max-w-none'
        />
        <div className='absolute left-[264px] top-[195px] h-[314px] w-[465px]'>
          <Game className='h-full w-full' />
        </div>
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
                key={tab.name}
                href={tab.href}
                className={clsx(
                  isCurrent
                    ? 'border-violet-500 bg-[color:var(--tab-color)] text-white'
                    : 'opacity-50 hover:opacity-100',
                  'group/tab align-center m-2 flex w-1/4 cursor-pointer flex-col items-center rounded-lg py-2 text-center font-display text-lg font-bold text-white transition'
                )}
                style={{ '--tab-color': tab.color }}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => onChangeTab(i)}>
                <div className='relative h-16 w-16'>
                  <Image
                    src={tab.image[0]}
                    alt='Tab image'
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

function Page() {
  return <div className='h-full w-full'>Todo</div>;
}

function PageGameServers({ page }) {
  return (
    <div className='flex h-full w-full justify-stretch'>
      {/* Image */}
      <div className='relative flex-1'>
        <motion.div
          className='absolute left-1/2 top-1/2 w-full rounded-lg'
          key={page.index}
          initial={{ transform: 'translateX(-75%) translateY(-25%) rotate(1deg) scale(75%)', opacity: 0 }}
          whileInView={{
            transform: 'translateX(-50%) translateY(-50%) rotate(-5deg) scale(75%)',
            opacity: 1
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}>
          <Image src={imgLobbies} alt='Lobby list screenshot' className='' />
          <div className='absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-800/10 dark:ring-gray-200/10' />
        </motion.div>
      </div>

      {/* Details */}
      <div className='flex-1'>
        <div className='lg:ml-auto lg:px-4 lg:pt-4'>
          <div className='lg:max-w-lg'>
            {/* Title */}
            <h2 className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>{page.name}</h2>
            <p className='text-m mt-4 text-gray-300'>{page.description}</p>

            {/* Features */}
            <div className='mt-6 flex w-full flex-col items-stretch gap-4'>
              {page.features.map((feature, i) => (
                <Link
                  key={i}
                  href='/docs'
                  className='border-box outline-inset flex flex-row items-center gap-3 rounded-md px-4 py-2 font-semibold text-white outline outline-1 outline-white/10 transition hover:bg-violet-600'>
                  <FontAwesomeIcon icon={feature.icon} />
                  {feature.name}
                </Link>
              ))}
            </div>

            {/* Learn more */}
            <div className='mt-5'>
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

function CaseStudies({ props }) {
  return (
    <div className='mt-40'>
      {/* Title */}
      <div className='mx-auto max-w-2xl text-center'>
        <h2 className='text-xl font-bold tracking-tight text-white sm:text-2xl'>
          Trusted to serve millions of players.
        </h2>
      </div>

      {/* Grid */}
      <div className='-mx-6 mt-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3'>
        <div className='bg-white/5 p-8 sm:p-10'>
          <Image
            className='max-h-12 w-full object-contain'
            src='https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg'
            alt='Transistor'
            width={158}
            height={48}
          />
        </div>
        <div className='bg-white/5 p-6 sm:p-10'>
          <Image
            className='max-h-12 w-full object-contain'
            src='https://tailwindui.com/img/logos/158x48/reform-logo-white.svg'
            alt='Reform'
            width={158}
            height={48}
          />
        </div>
        <div className='bg-white/5 p-6 sm:p-10'>
          <Image
            className='max-h-12 w-full object-contain'
            src='https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg'
            alt='Tuple'
            width={158}
            height={48}
          />
        </div>
        <div className='bg-white/5 p-6 sm:p-10'>
          <Image
            className='max-h-12 w-full object-contain'
            src='https://tailwindui.com/img/logos/158x48/laravel-logo-white.svg'
            alt='Laravel'
            width={158}
            height={48}
          />
        </div>
        <div className='bg-white/5 p-6 sm:p-10'>
          <Image
            className='max-h-12 w-full object-contain'
            src='https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg'
            alt='SavvyCal'
            width={158}
            height={48}
          />
        </div>
        <div className='bg-white/5 p-6 sm:p-10'>
          <Image
            className='max-h-12 w-full object-contain'
            src='https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg'
            alt='Statamic'
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}

import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { Resource, ResourceGroup } from '@/components/Resources';
import YCLogo from '@/components/YCLogo';
// import YCLogo from '@/components/YCLogo';

const benefits = [
  'Competitive salaries',
  'Flexible work hours',
  '30 days of paid vacation',
  'Annual team retreats',
  'Benefits for you and your family',
  'A great work environment'
];

function UpAndRunning() {
  return (
    <div className='relative isolate mt-40'>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20'>
          {/* Image */}
          <div className='h-96 w-full flex-none overflow-hidden rounded-2xl object-cover shadow-xl lg:aspect-video lg:h-auto lg:max-w-sm'>
            <iframe
              className='h-full w-full'
              src='https://www.youtube-nocookie.com/embed/qtzSrmmflHI'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen></iframe>
          </div>
          {/* <Image
            className='h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm'
            src='https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
            alt=''
          /> */}

          {/* Body */}
          <div className='w-full flex-auto'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Launch your game in <span className='text-purple-300'>minutes</span>
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-300'>
              {`Just 3 lines of code and you're off to the races.`}
            </p>

            <div className='not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3'>
              <Resource
                title='Getting started'
                icon={faGraduationCap}
                href='/docs/general/guides/crash-course'
              />
              <Resource title='Learn' icon={faBooks} href='/docs/general/libraries' />
              <Resource
                title='Video learn'
                icon={faServer}
                iconType='duotone'
                href='/docs/serverless-lobbies'
              />
              <Resource title='API' icon={faGlobe} href='/docs/cdn' />
              <Resource title='GitHub' icon={faGlobe} href='/docs/cdn' />
              <Resource title='Community' icon={faUserGroup} href='/docs/cdn' />
            </div>
          </div>
        </div>
      </div>
      <div
        className='absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl'
        aria-hidden='true'>
        {/* <div
          className='aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25'
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)'
          }}
        /> */}
      </div>
    </div>
  );
}

Index.prose = false;
