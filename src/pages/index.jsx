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
  faFileCertificate,
  faChildReaching,
  faWrench,
  faMonitorWaveform,
  faClouds,
  faMap,
  faMagnifyingGlass,
  faCodeBranch,
  faMoneyBill,
  faHundredPoints,
  faCloudMoon,
  faPaintbrushPencil,
  faHammer,
  faCode,
  faLifeRing,
  faAward
} from '@fortawesome/pro-solid-svg-icons';

import imgLobbies from '@/images/screenshots/lobbies.png';
import imgOss from '@/images/screenshots/oss.png';
import imgMatchmaker from '@/images/screenshots/matchmaker.png';
import imgGameGuard from '@/images/screenshots/gameGuard.png';
import imgSocial from '@/images/screenshots/social.png';
import imgAnalytics from '@/images/screenshots/analytics.png';

import imgComputerFrame from '@/images/effects/computer-frame.png';
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
import imgOssWhite from '@/images/products/rocket-white.svg';
import imgOssColor from '@/images/products/rocket-monotone.svg';

import imgGodot from '@/images/vendors/godot-white.svg';
import imgHtml5 from '@/images/vendors/html5-white.svg';
import imgDocker from '@/images/vendors/docker-white.svg';

import imgApesScreenshot from '@/images/case-studies/screenshots/apes.png';
import imgApesLogo from '@/images/case-studies/logos/apes.png';
import imgDiepScreenshot from '@/images/case-studies/screenshots/diep.jpg';
import imgDiepLogo from '@/images/case-studies/logos/diep.webp';
import imgEvScreenshot from '@/images/case-studies/screenshots/ev.png';
import imgEvLogo from '@/images/case-studies/logos/ev.png';

const pages = [
  {
    name: 'Game Servers',
    description: 'Deploy and scale game servers globally in seconds',
    color: '#8A7ED8',
    image: [imgComputeWhite, imgComputeColor],
    screenshot: imgLobbies,
    learnHref: '/docs/serverless-lobbies',
    features: [
      {
        name: 'Multi-cloud & on-prem autoscaling',
        icon: faMap
      },
      // {
      //   name: 'Cost effective auto-scaling',
      //   icon: faChartWaterfall
      // },
      // {
      //   name: 'Infinite autoscaling',
      //   icon: faChartWaterfall
      // },
      {
        name: 'Fast & no downtime deploys',
        icon: faBolt
      },
      {
        name: 'Streamlined team collaboration',
        icon: faCodeBranch
      },
      {
        name: 'Cost saving',
        icon: faPiggyBank
      },
      {
        name: 'Unified logging & monitoring',
        icon: faMonitorWaveform
      }
    ]
  },
  {
    name: 'DDoS Mitigation',
    description: 'Protect your game servers from DDoS attacks with Game Guard',
    color: '#8A7ED8',
    image: [imgGameGuardWhite, imgGameGuardColor],
    screenshot: imgGameGuard,
    learnHref: '/docs/serverless-lobbies/concepts/game-guard',
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
        name: 'Supports TCP, UDP, WebSockets & WebRTC',
        icon: faPlug
      },
      {
        name: 'Managed SSL certificates',
        icon: faFileCertificate
      },
      {
        name: 'Skiddies be gone',
        icon: faChildReaching
      }
    ]
  },
  {
    name: 'Matchmaker',
    description: 'Intelligently matchmake players into game servers',
    color: '#4DB1F9',
    image: [imgMatchmakerWhite, imgMatchmakerColor],
    screenshot: imgMatchmaker,
    learnHref: '/docs/matchmaker',
    features: [
      {
        name: 'Instant matchmaking',
        icon: faStopwatch
      },
      {
        name: 'Flexible to work with your game',
        icon: faInfinity
      },
      {
        name: 'Custom games, dedicated servers & UGC support',
        icon: faPaintbrushPencil
      },
      {
        name: 'Integrated with infrastructure',
        icon: faLink
      },
      {
        name: 'Intelligent region selection',
        icon: faEarthAmericas
      }
      // {
      //   name: 'Adjusts to make off hours feel full',
      //   icon: faCloudMoon
      // }
    ]
  },
  {
    name: 'Social',
    description: 'Leverage a community of millions of players in your game with 1 line of code',
    color: '#F2B046',
    image: [imgSocialWhite, imgSocialColor],
    screenshot: imgSocial,
    learnHref: '/docs/identity',
    features: [
      {
        name: '100% free, open, and privacy-centric',
        icon: faHundredPoints
      },
      {
        name: 'Cross-game & cross-platform identities',
        icon: faInfinity
      },
      {
        name: 'Friends, groups, chat & presence',
        icon: faUserGroup
      },
      {
        name: 'Parties integrated with matchmaking',
        icon: faPartyHorn
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
    screenshot: imgAnalytics,
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
        name: 'Universal insights for both social & services',
        icon: faPlanetMoon
      }
    ]
  },
  // { name: 'CDN', features: [{ name: 'Free rivet.game domain'}, {name: 'Free SSL for CDN & lobbies'}] },
  {
    name: 'Open Source',
    description: 'Source code available to read, modify, and self-host',
    color: '#8A7ED8',
    image: [imgOssWhite, imgOssColor],
    screenshot: imgOss,
    learnHref: 'https://github.com/rivet-gg/rivet',
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
        name: 'Audit security',
        icon: faLock
      },
      {
        name: 'Self-host on-premise',
        icon: faServer
      },
      {
        name: 'Make it your own',
        icon: faWrench
      }
    ]
  }
];

let supportedEngines = [
  {
    name: 'Unity',
    href: '/learn/unity'
  },
  {
    name: 'Unreal Engine',
    href: '/learn/unreal'
  },
  {
    name: 'Godot',

    image: imgGodot,
    href: '/learn/godot'
  },
  {
    name: 'HTML5',
    image: imgHtml5,
    href: '/learn/html5'
  },
  {
    name: 'Custom',
    image: imgDocker,
    href: '/learn/custom'
  }
];

let caseStudies = [
  {
    name: 'Apes.io',
    href: 'https://apes.io',
    screenshot: imgApesScreenshot,
    logo: imgApesLogo,
    gradient: 'from-[#a8271d] to-[#ad7b3d]'
  },
  {
    name: 'Ev.io',
    href: 'https://ev.io',
    badge: () => (
      <div className='align-center absolute bottom-2 flex w-full items-center justify-center gap-4 text-white'>
        <FontAwesomeIcon icon={faAward} className='text-2xl' />
        <div className=' flex flex-col'>
          <span className='text-2xs font-semibold uppercase leading-4 tracking-wide'>
            2023 Best eSports & FPS Game
          </span>
          <span className='text-2xs font-semibold leading-4 tracking-wide opacity-50'>{`– Gam3rs' Choice Awards`}</span>
        </div>
      </div>
    ),
    screenshot: imgEvScreenshot,
    logo: imgEvLogo,
    gradient: 'from-[#7d56d6] to-[#2a4080]'
  },
  {
    name: 'Diep.io',
    href: 'https://diep.io',
    screenshot: imgDiepScreenshot,
    logo: imgDiepLogo,
    gradient: 'from-[#56a0d9] to-[#3d5db8]'
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
      <div className='relative isolate overflow-x-hidden'>
        <div className='pb-12 sm:pb-16 lg:pb-20'>
          <Title />

          <Features />

          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <CaseStudies />
          </div>

          <UpAndRunning />
        </div>
      </div>
    </div>
  );
}

function Background({ props }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let lastUpdate = Date.now();
    let offsetX = 0;
    let offsetY = 0;
    let active = true;

    function drawCanvas() {
      if (!active) return;

      let now = Date.now();
      let delta = now - lastUpdate;

      // Max 15 FPS
      if (delta < 1000 / 30) return requestAnimationFrame(drawCanvas);

      lastUpdate = now;

      offsetX += delta * 0.03;
      offsetY = Math.sin((now / 1000) * 0.3) * 50;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      let pixelRatio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * pixelRatio;
      canvas.height = canvas.clientHeight * pixelRatio;

      ctx.save();

      // Fill background
      ctx.fillStyle = 'rgb(24, 24, 27)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      let size = 50 * pixelRatio; // size of each grid cell
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)'; // color of the grid lines
      ctx.lineWidth = 2 * pixelRatio;

      for (let i = -size + (offsetX % size); i <= canvas.width; i += size) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      for (let j = -size + (offsetY % size); j <= canvas.height; j += size) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Fill overlay
      let xPos = canvas.clientWidth > 1280 ? canvas.width * 0.25 : canvas.width * 0.5;
      let yPos = canvas.clientWidth > 1280 ? canvas.height * 0.5 : canvas.width * 0.25;
      const grd = ctx.createRadialGradient(xPos, yPos, canvas.width * 0.1, xPos, yPos, canvas.width / 2);
      grd.addColorStop(0, 'rgba(24, 24, 27, 1)');
      grd.addColorStop(1, 'rgba(24, 24, 27, 0.00)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.restore();

      // requestAnimationFrame(drawCanvas);
    }

    drawCanvas();

    window.addEventListener('resize', drawCanvas);

    return () => {
      active = false;
      window.removeEventListener('resize', drawCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 -z-10 h-full w-full' {...props} />;
}

function Title() {
  return (
    <div className='relative flex w-full flex-wrap items-center justify-center gap-8 px-2 pb-16 pt-8'>
      {/* Background */}
      <Background />

      {/* Text */}
      <div className='max-w-2xl text-left'>
        {/* Title */}
        <h1 className='text-6xl font-extrabold tracking-tight text-white sm:text-7xl'>
          Multiplayer Made
          <br />
          Simple
        </h1>

        {/* Subtitle */}
        <p className='mt-6 text-lg leading-8 text-gray-300'>
          Open-source solution to deploy, scale, and operate your multiplayer game
        </p>

        {/* Engines */}
        <div className='mt-6'>
          <div className='font-bold text-white'>Supports</div>
          <div className='mt-3 flex flex-wrap gap-2.5'>
            {supportedEngines.map(({ name, image, href }) => (
              <Link
                key={name}
                href={href}
                className='flex flex-shrink items-center gap-1 rounded-xl bg-white/5 px-4 py-2 font-semibold text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/20 hover:ring-white/20'>
                {image && <Image src={image} alt={name} className='h-6 w-6' />}
                <div>{name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className='justify-left mt-10 flex items-center gap-x-6'>
          {/* <Link
            href='https://b8v8449klvp.typeform.com/rivet'
            target='_blank'
            className='rounded-md bg-violet-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400'>
            Sign Up
          </Link> */}

          <Link
            href='https://b8v8449klvp.typeform.com/rivet'
            target='_blank'
            className='button cursor-pointer select-none rounded-lg border-b-[1px] border-violet-400 bg-violet-500
            px-3.5 py-2.5
            text-sm font-semibold text-white
            transition-all
            duration-150 [box-shadow:0_4px_0_0_#7c3aed] active:translate-y-[4px]
            active:border-b-[0px] active:[box-shadow:0_0px_0_0_#7c3aed]'>
            Sign Up
          </Link>

          <Link href='/learn' className='text-sm font-semibold leading-6 text-white'>
            Tutorials & Templates <span aria-hidden='true'>→</span>
          </Link>
        </div>

        {/* YC */}
        <Link
          href='https://www.ycombinator.com/'
          target='_blank'
          className='margin-auto mt-6 block w-max py-1.5 opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0'>
          <div className='flex items-center justify-center gap-2 text-2xs font-semibold text-white'>
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
    <div className='pointer-events-none relative h-[412px] w-[320px] shrink-0 grow-0 md:h-[825px] md:w-[640px]'>
      <div className='absolute left-[50%] h-[1000px] w-[1000px] origin-top -translate-x-1/2 scale-[calc(640/1000*0.65)] md:scale-[calc(640/1000*1.3)]'>
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
    <div className='border border-white/10'>
      <div className='mx-auto w-full max-w-7xl'>
        <Tabs index={page.index} onChangeTab={i => setPage({ index: i, dir: i > page.index ? 1 : -1 })} />
        <Pages page={page} onChangePage={setPage} />
      </div>
    </div>
  );
}

function Tabs({ index, onChangeTab }) {
  return (
    <div>
      <div className='border-b border-white/10'>
        <nav className='-mb-px flex' aria-label='Tabs'>
          {pages.map((tab, i) => {
            let isCurrent = i == index;
            return (
              <div
                key={tab.name}
                href={tab.href}
                className={clsx(
                  isCurrent
                    ? 'border-b-4 border-[color:var(--tab-color)] text-white'
                    : 'opacity-50 hover:opacity-100',
                  'group/tab align-center flex w-1/4 cursor-pointer flex-col items-center py-2 text-center text-xs font-bold text-white transition md:text-base'
                )}
                style={{ '--tab-color': tab.color }}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => onChangeTab(i)}>
                <div className='relative h-10 w-10 md:h-16 md:w-16'>
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
                <div className='hidden sm:block'>{tab.name}</div>
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
    <div className='relative flex h-[600px] w-full overflow-hidden'>
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
          <PageContents page={pages[page.index]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PageContents({ page }) {
  return (
    <div className='flex h-full w-full justify-stretch'>
      {/* Image */}
      <div className='relative hidden flex-1 md:block'>
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
          <Image src={page.screenshot} alt='Lobby list screenshot' className='' />
          <div className='absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-800/10 dark:ring-gray-200/10' />
        </motion.div>
      </div>

      {/* Details */}
      <div className='flex flex-1 items-center justify-center'>
        <div className='px-2 lg:px-4'>
          <div className='lg:max-w-lg'>
            {/* Title */}
            <h2 className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>{page.name}</h2>
            <p className='text-m mt-4 text-gray-300'>{page.description}</p>

            {/* Features */}
            <div className='mt-6 flex w-full flex-col items-stretch gap-4'>
              {page.features.map((feature, i) => (
                <div
                  key={i}
                  className='border-box outline-inset flex flex-row items-center gap-3 rounded-md px-4 py-2 font-semibold text-white outline outline-1 outline-white/10 transition'>
                  <FontAwesomeIcon icon={feature.icon} />
                  {feature.name}
                </div>
              ))}
            </div>

            {/* Learn more */}
            {page.learnHref && (
              <div className='mt-5'>
                <Button href={page.learnHref} arrow='right'>
                  Learn More
                </Button>
              </div>
            )}
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
        <h2 className='text-xl font-bold tracking-tight text-white sm:text-3xl'>
          {/* Trusted to serve millions of players. */}
          {/* Used by companies that forget about infrastructure */}
          {/* Used by companies that prefer game development over infrastructure */}
          Serving <span className='text-violet-300'>millions</span> of players at scale
        </h2>
      </div>

      {/* Grid */}
      <div className='-mx-6 mt-6 grid grid-cols-2 gap-0.5 overflow-hidden ring-1 ring-inset ring-white/10 sm:mx-0 sm:rounded-2xl md:grid-cols-3'>
        {caseStudies.map((study, i) => (
          <Link
            key={i}
            href={study.href}
            className='align-center group relative flex h-[175px] items-center justify-center p-8 sm:p-10'>
            <Image
              className='absolute inset-0 -z-20 h-full w-full w-full object-cover'
              src={study.screenshot}
              alt=''
            />
            <div className={clsx('absolute inset-0 -z-10 bg-gradient-to-br opacity-70', study.gradient)} />
            <Image
              className='h-14 w-32 object-contain transition group-hover:scale-110'
              src={study.logo}
              alt={study.name}
            />
            {study.badge && study.badge()}
          </Link>
        ))}
      </div>
    </div>
  );
}

import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { Resource, ResourceGroup } from '@/components/Resources';
import YCLogo from '@/components/YCLogo';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
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
        <div className='mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-inset ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20'>
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
              Launch your game in <span className='text-violet-300'>minutes</span>
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-300'>
              {`Just 5 lines of code and you're off to the races.`}
            </p>

            <div className='not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3'>
              <Resource title='Learn' icon={faHammer} href='/learn' />
              <Resource title='Docs' icon={faBooks} href='/docs/general' />
              <Resource title='Blog' icon={faCode} href='/blog' />
              <Resource title='GitHub' icon={faGithub} href='https://github.com/rivet-gg' target='_blank' />
              <Resource
                title='Discord'
                icon={faDiscord}
                href='https://discord.gg/aXYfyNxYVn'
                target='_blank'
              />
              <Resource title='Support' icon={faLifeRing} href='/support' />
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

Index.description = 'Open-source solution to deploy, scale, and operate your multiplayer game';
Index.prose = false;
