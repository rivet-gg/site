import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { PatternButton } from '@/components/PatternButton';
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
import { Resource } from '@/components/Resources';
import YCLogo from '@/components/YCLogo';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import engineStyles from '../lib/engineStyles.json';
import GitHubButton from 'react-github-btn';
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
  faAward,
  faHome,
  faFileImport,
  faAlien8bit,
  faHeart
} from '@fortawesome/sharp-solid-svg-icons';
import imgLobbies from '@/images/screenshots/lobbies.png';
import imgOss from '@/images/screenshots/oss.png';
import imgMatchmaker from '@/images/screenshots/matchmaker.png';
import imgGameGuard from '@/images/screenshots/gameGuard.png';
import imgSocial from '@/images/screenshots/social.png';
import imgAnalytics from '@/images/screenshots/analytics.png';
import imgCdn from '@/images/screenshots/cdn.png';

import imgComputerFrame from '@/images/effects/computer-frame.png';
import imgComputeWhite from 'src/images/products/compute-white.svg';
import imgComputeColor from 'src/images/products/compute-monotone.svg';
import imgGameGuardWhite from 'src/images/products/game-guard-white.svg';
import imgGameGuardColor from 'src/images/products/game-guard-monotone.svg';
import imgMatchmakerWhite from '@/images/products/matchmaker-white.svg';
import imgMatchmakerColor from '@/images/products/matchmaker-monotone.svg';
import imgAnalyticsWhite from '@/images/products/analytics-white.svg';
import imgAnalyticsColor from '@/images/products/analytics-monotone.svg';
import imgCdnWhite from '@/images/products/cdn-white.svg';
import imgCdnColor from '@/images/products/cdn-monotone.svg';
import imgSocialWhite from '@/images/products/friend-white.svg';
import imgSocialColor from '@/images/products/friend-monotone.svg';
import imgOssWhite from '@/images/products/rocket-white.svg';
import imgOssColor from '@/images/products/rocket-monotone.svg';

import imgApesScreenshot from '@/images/case-studies/screenshots/apes.png';
import imgApesLogo from '@/images/case-studies/logos/apes.png';
import imgDiepScreenshot from '@/images/case-studies/screenshots/diep.jpg';
import imgDiepLogo from '@/images/case-studies/logos/diep.webp';
import imgEvScreenshot from '@/images/case-studies/screenshots/ev.png';
import imgEvLogo from '@/images/case-studies/logos/ev.png';
import { RainbowBar } from '../components/RainbowBar';

const featurePages = [
  {
    name: 'Game Servers',
    description: 'Deploy your game on on Rivet, scale globally in seconds',
    color: 'blue',
    image: [imgComputeWhite, imgComputeColor],
    screenshot: imgLobbies,
    learnHref: '/docs/dynamic-servers',
    features: [
      {
        name: 'Cost effective auto-scaling',
        icon: faPiggyBank
      },
      {
        name: 'Scales to meet player spikes',
        icon: faChartWaterfall
      },
      {
        name: 'Fast & no downtime deploys (< 5 second boot times)',
        icon: faBolt
      },
      {
        name: 'Streamlined team collaboration',
        icon: faCodeBranch
      },
      {
        name: 'Unified logging & monitoring',
        icon: faMonitorWaveform
      },
      {
        name: 'Customize hardware, regions, & providers',
        icon: faWrench
      }
    ]
  },
  {
    name: 'DDoS Mitigation',
    description: 'Protect your game servers from DDoS attacks with Game Guard',
    color: 'purple',
    image: [imgGameGuardWhite, imgGameGuardColor],
    screenshot: imgGameGuard,
    learnHref: '/docs/dynamic-servers/concepts/game-guard',
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
    color: 'pink',
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
    name: 'CDN',
    description: 'Serve game assets & web pages',
    color: 'red',
    image: [imgCdnWhite, imgCdnColor],
    screenshot: imgCdn,
    learnHref: '/docs/cdn',
    features: [
      { name: 'Free rivet.game subdomain', icon: faHome },
      { name: 'Bring your own domain', icon: faFileImport },
      { name: 'Managed SSL for custom domains', icon: faFileCertificate },
      { name: 'Customize headers & routing rules', icon: faWrench }
      // { name: 'Powered by Cloudflare', icon: faCloudflare }
    ]
  },
  {
    name: 'Analytics',
    description: 'Understand your players & game servers',
    color: 'blue',
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
  {
    name: 'Open Source',
    description: 'Source code available to read, modify, and self-host',
    color: 'green',
    image: [imgOssWhite, imgOssColor],
    screenshot: imgOss,
    learnHref: 'https://github.com/rivet-gg/rivet',
    learnName: 'GitHub',
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
    name: 'Godot',
    href: '/learn/godot',
    styles: engineStyles.godot,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'Unity',
    href: '/learn/unity',
    styles: engineStyles.unity,
    join: <span>,&nbsp;</span>,
  },
  {
    name: 'Unreal Engine',
    href: '/learn/unreal',
    styles: engineStyles.unreal,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'HTML5',
    href: '/learn/html5',
    styles: engineStyles.html5,
    join: <span>,&nbsp;and&nbsp;</span>
  },
  {
    name: 'Custom',
    href: '/learn/custom',
    styles: engineStyles.custom,
    join: null
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
      <div className='absolute bottom-2 flex w-full items-center justify-center gap-4 text-white'>
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

          <RainbowBar className='w-full h-1'/>

          <Features />

          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <CaseStudies />
          </div>
         
          {/* <DemoSection /> */}

          {/* <EngineGrid /> */}

          <UpAndRunning />

          {/* <LevelUpSection />*/}
        </div>
      </div>
    </div>
  );
}

function Background({ props }) {
  const canvasRef = useRef(null);

  const bg = '9, 9, 9';
  const fg = '255, 124, 0';

  useEffect(() => {
    let lastUpdate = Date.now();
    let offsetX = 0;
    let offsetY = 0;
    let active = true;

    function drawCanvas() {
      if (!active) return;

      let now = Date.now();
      let delta = now - lastUpdate;

      // Cap FPS to reduce overhead
      if (delta < 1000 / 35) return requestAnimationFrame(drawCanvas);

      lastUpdate = now;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      let pixelRatio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * pixelRatio;
      canvas.height = canvas.clientHeight * pixelRatio;

      // offsetX = Math.pow(Math.sin((now / 1000) * 0.6), 2) * 0.1;
      offsetY += (delta / 1000) * 0.03;

      ctx.save();

      // Fill background
      ctx.fillStyle = `rgb(${bg})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      let size = 0.1;
      let xRange = 4;
      let yRange = 3;
      ctx.strokeStyle = `rgba(${fg}, 1)`; // color of the grid lines
      ctx.lineWidth = 2 * pixelRatio;

      // X
      for (let x = -xRange / 2 - size + (offsetX % size); x <= xRange / 2; x += size) {
        ctx.beginPath();
        ctx.moveTo(...psp(x, 0));
        ctx.lineTo(...psp(x, yRange));
        ctx.stroke();
      }

      // Y
      for (let y = -size + (offsetY % size); y <= yRange; y += size) {
        ctx.beginPath();
        ctx.moveTo(...psp(-xRange / 2, y));
        ctx.lineTo(...psp(xRange / 2, y));
        ctx.stroke();
      }

      // Fill overlay
      let xPos = canvas.width * 0.5;
      let yPos = canvas.width * 0.25;
      const radGrd = ctx.createRadialGradient(xPos, yPos, canvas.width * 0.1, xPos, yPos, canvas.width / 2);
      radGrd.addColorStop(0, `rgba(${bg}, 1)`);
      radGrd.addColorStop(1, `rgba(${bg}, 0)`);
      ctx.fillStyle = radGrd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fill gradient
      const fadeGrd = ctx.createLinearGradient(0, 0, 0, canvas.height);
      fadeGrd.addColorStop(0, `rgba(${bg}, 1)`);
      fadeGrd.addColorStop(1, `rgba(${bg}, 0.8)`);
      ctx.fillStyle = fadeGrd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.restore();

      requestAnimationFrame(drawCanvas);

      // Apply perspective
      function psp(x, y, perspective = 1.5) {
        const distance = perspective;
        const z = y; // We can consider the y coordinate to be our z depth.
        const factor = distance / (distance + z);

        // Create a new 2D point transformed by the perspective factor
        let newX = x * factor;
        let newY = y * factor;

        newX = (newX + 0.5) * canvas.width;
        newY = canvas.height - newY * canvas.height;

        return [newX, newY];
      }
    }

    drawCanvas();

    // window.addEventListener('resize', drawCanvas);

    return () => {
      active = false;
      // window.removeEventListener('resize', drawCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 -z-10 h-full w-full' {...props} />;
}

function Title() {
  return (
    <div className='relative flex w-full flex-wrap items-center justify-center gap-8 px-2 pb-16 pt-12'>
      {/* Background */}
      <Background />

      {/* Text */}
      <div className='flex flex-col items-center justify-center text-center'>
        {/* Title */}
        <h1 className='font-display mt-8 text-6xl font-extrabold tracking-tight text-white sm:text-7xl text-cream-100'>
          Multiplayer Made Simple
        </h1>

        {/* Subtitle */}
        <div className='mt-6 text-lg text-cream-100 leading-8'>
          <p>Open-source solution to deploy, scale, and operate your multiplayer game</p>
          <p className='md:mt-0 mt-4'>
            Supports&nbsp;
            {supportedEngines.map(({ name, image, href, styles, join }, i) => (
              <span key={name}>
                <Link
                  href={href}
                  className={clsx(
                    'inline font-semibold transition hover:scale-110',
                    styles.text,
                  )}>
                  {name}
                </Link>
                {join}
              </span>
            ))}
          </p>
        </div>

        {/* Engines */}
        {/* <div className='mt-6 w-fit rounded-xl bg-white/[0.02] px-6 pb-1 pt-4 ring-1 ring-inset ring-white/10'>
          <div className='font-bold text-white'>Supports</div>
          <div className='mt-0 flex gap-5'>
            {supportedEngines.map(({ name, image, href, gradient }) => (
              <Link
                key={name}
                href={href}
                className={clsx(
                  'flex shrink-0 items-center justify-center gap-1 rounded-xl',
                  'py-4 font-semibold transition transition hover:scale-110',
                  'bg-gradient-to-r bg-clip-text text-transparent',
                  gradient[0],
                  gradient[1]
                )}>
                <div>{name}</div>
              </Link>
            ))}
          </div>
        </div> */}

        {/* CTA */}
        <div className='justify-center mt-10 flex flex-wrap items-center gap-x-6 gap-y-8'>
           <a href="https://b8v8449klvp.typeform.com/rivet">
            <Button variant='juicy'>Sign Up for Beta</Button>
            </a>

          <Link href='/learn' className='text-sm font-semibold leading-6 text-white hover:after:content-[""] hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-rainbow-gradient' >
            5 minute crash course <span aria-hidden='true'>→</span>
          </Link>
        </div>

        <div className='mt-9 flex sm:flex-row flex-col items-center justify-center'>
          {/* YC */}
          <Link
            href='https://www.ycombinator.com/'
            target='_blank'
            className='margin-auto block w-max opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0'>
            <div className='flex items-center justify-center gap-2 text-2xs font-semibold text-white'>
              <div>Backed by</div>
              <YCLogo className='h-[1.7em]' white={true} />
            </div>
          </Link>

          {/* Separator */}
          <div className='sm:block hidden mx-4 h-4 w-[1px] bg-white/50'></div>
          <div className='sm:hidden block my-4 w-4 h-[1px] bg-white/50'></div>

          {/* GitHub */}
          <div className='h-[28px]'>
            <GitHubButton
              href='https://github.com/rivet-gg/rivet'
              data-color-scheme='no-preference: dark_dimmed; light: dark_dimmed; dark: dark_dimmed;'
              data-size='large'
              data-show-count='true'
              aria-label='Star rivet-gg/rivet on GitHub'>
              Star
            </GitHubButton>
          </div>
        </div>
      </div>

      {/* Demo */}
      {/* <Demo /> */}
    </div>
  );
}

function DemoSection() {
  return (
    <div className='mt-24 flex flex-col items-center justify-center'>
      {/* <h2 className='text-xl font-bold tracking-tight text-white sm:text-3xl text-center'>Try it yourself</h2> */}
      <RainbowBar className='w-full h-1'/>
      <Demo />
    </div>
  );
}

function Demo() {
  return (
    
    <div className='relative w-full'>
      <div className='relative w-auto h-auto'>
        <Image
          src={imgComputerFrame}
          alt='Rivet'
          className='w-full h-auto'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-10' style={{
          backgroundImage: 'linear-gradient(0deg, transparent, #00000030 50%, transparent)',
          backgroundSize: '100% 20px',
          animation: 'moveVerticalLines 5s linear infinite'
        }}></div>
      </div>
      {/* Text and New Grid Layout */}
      <div className='absolute bottom-0 left-0 p-4'>
        <h2 className='text-xl font-display font-bold tracking-tight text-cream-100 sm:text-7xl'>Build Riveting Experiences</h2>
        
        {/* Grid Container for Bullet Points */}
        <div className='grid grid-cols-2 gap-4 mt-4'>
          {/* First Column */}
          <div>
            <ul className='list-disc list-inside text-cream-100'>
              <li>Game servers launch & scale in minutes </li>
              <li>Built in analytics & team management for your whole game studio</li>
            </ul>
          </div>

          {/* Second Column */}
          <div>
            <ul className='list-disc list-inside text-cream-100'>
              <li>Quickstart game templates for most engines</li>
              <li>Module marketplace to plugin game features & services</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function EngineGrid() {
  return (
    <div className="bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 auto-rows-fr text-center">
          {/* Grid Item 1 */}
          <div className="p-4 border border-white flex flex-col justify-center">
            <h3 className="mt-2 font-display text-5xl">Unity</h3>
          </div>

          {/* Grid Item 2 */}
          <div className="p-4 border border-white flex flex-col justify-center">
            <h3 className='text-purple-800 font-display sm:text-7xl'>
            <FontAwesomeIcon icon={faAlien8bit}/>
            </h3>
          </div>

          {/* Grid Item 3 */}
          <div className="">
            <h2 className="text-left font-display text-5xl font-bold">Get started with Your Engine.</h2>
          </div>

          {/* Grid Item 4 */}
          <div className="p-4 border border-white flex flex-col justify-center">
            <h3 className='text-purple-800 sm:text-7xl font-display'>
            <FontAwesomeIcon icon={faAlien8bit}/>
            </h3>
          </div>

          {/* Grid Item 5 */}
          <div className="p-4 border border-white flex flex-col justify-center">
            <h3 className="mt-2 text-5xl font-display">Godot</h3>
          </div>

          {/* Grid Item 6 */}
          <div className="p-4 border border-white flex flex-col justify-center">
            <h3 className='text-purple-800 sm:text-7xl font-display'>
            <FontAwesomeIcon icon={faAlien8bit}/>
            </h3>
          </div>

           {/* Grid Item 7 */}
           <div className="p-4 border border-white flex flex-col justify-center flex flex-col justify-center">
            <h3 className="mt-2 text-5xl font-display">Unreal</h3>
          </div>

           {/* Grid Item 8 */}
           <div className="p-4 border border-white flex flex-col justify-center">
            <h3 className="mt-2 text-5xl font-display">HTML5</h3>
          </div>

           {/* Grid Item 9 */}
           <div className="p-4 border border-white flex flex-col justify-center">
            <h3 className="mt-2 text-5xl font-display">Custom</h3>
          </div>

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
  if (newPage < 0) return { index: featurePages.length - (-newPage % featurePages.length), dir };
  return { index: newPage % featurePages.length, dir };
}

function Features() {
  const [page, setPage] = React.useState({ index: 0, dir: 1 });
  
  return (
    <div className='mx-auto w-full max-w-7xl'>
      <Tabs index={page.index} onChangeTab={i => setPage({ index: i, dir: i > page.index ? 1 : -1 })} />
      <Pages page={page} onChangePage={setPage} />
    </div>
  );
}

function Tabs({ index, onChangeTab }) {
  return (
    <div>
      <nav className={clsx(
        '-mb-px flex',
        'sm:gap-x-4 sm:px-4 sm:pt-4',
        'gap-x-2 px-2 pt-2',
       )} aria-label='Tabs'>
        {featurePages.map((tab, i) => {
          let isCurrent = i == index;
          return (
            <PatternButton
              key={tab.name}
              className={clsx(
                'group/tab flex w-1/4 transition'
              )}
              pattern={{ color: tab.color }}
              highlight={isCurrent ? 1 : 0}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() => onChangeTab(i)}>
              <div className={clsx('py-2', 'flex flex-col items-center', 'text-center text-xs md:text-sm font-bold text-white grow')}>
                <div className='relative h-10 w-10 md:h-16 md:w-16'>
                  <Image
                    src={tab.image[0]}
                    alt='Tab image'
                    className={clsx(
                      'absolute h-full w-full opacity-100 transition',
                      'drop-shadow-[0_0_10px_rgba(24,24,27,0.8)]',
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
                <div className='hidden text-white sm:block'>{tab.name}</div>
              </div>
            </PatternButton>
          );
        })}
      </nav>
    </div>
  );
}

function Pages({ page, onChangePage }) {
  // TODO: Is this SEO friendly?
  return (
    <div className='relative flex md:h-[600px] h-[550px] w-full overflow-hidden'>
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
          <PageContents page={featurePages[page.index]} />
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
            <h2 className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display'>{page.name}</h2>
            <p className='text-m mt-4 text-gray-300'>{page.description}</p>

            {/* Features */}
            <div className='mt-6 flex w-full flex-col items-stretch gap-4'>
              {page.features.map((feature, i) => (
                <div
                  key={i}
                  className='flex flex-row items-center gap-3 rounded-md font-semibold text-white transition'>
                  <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/[4%] outline outline-1 outline-white/[8%]'>
                    <FontAwesomeIcon icon={feature.icon} className='w-4' />
                  </div>
                  {feature.name}
                </div>
              ))}
            </div>

            {/* Learn more */}
            {page.learnHref && (
              <div className='mt-5'>
                <Button href={page.learnHref} arrow='right' variant='juicy'>
                  {page.learnName ?? 'Documentation'}
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
    <div className='md:mt-40 mt-20'>
      {/* Title */}
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='font-display text-xl font-bold tracking-tight text-cream-100 sm:text-7xl'>
          Serving millions of players <FontAwesomeIcon icon={faAlien8bit} className='text-xl font-bold tracking-tight sm:text-5xl text-violet-400'/><br/>
          at scale around the globe <FontAwesomeIcon icon={faGlobe} className='text-xl font-bold tracking-tight sm:text-5xl text-blue-400' />
        </h2>  
      </div>

      {/* Separator */}
      <div className='sm:block hidden mx-8 h-8 w-[1px]'></div>

      {/* Grid */}
      <div className={clsx(
        'mt-6 grid  gap-4 overflow-hidden ring-1 ring-inset ring-white/10',
        'sm:mx-0 md:grid-cols-3',
        '-mx-6 grid-cols-1'

      )}>
        {caseStudies.map((study, i) => (
          <Link
            key={i}
            href={study.href}
            className='group relative flex h-[575px] border-2 items-center justify-center p-8 sm:p-10'>
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

      {/* Separator */}
      <div className='sm:block hidden mx-8 h-8 w-[1px]'></div>

      {/* sub-text */}
      <div className='mx-auto max-w-1xl text-center'>
        <h3 className='font-display tracking-tight text-cream-100 sm:text-5xl'>
          Some of the games that <FontAwesomeIcon icon={faHeart} className='tracking-tight sm:text-5xl text-red-500'/> Rivet
        </h3>  
      </div>
    </div>
  );
}

function UpAndRunning() {
  return (
    <div className='relative isolate mt-28'>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 border-2 b-white ring-inset sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20'>
          {/* Image */}
          <div className='h-96 w-full flex-none overflow-hidden object-cover lg:aspect-video lg:h-auto lg:max-w-sm border-2 b-white'>
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
            <h2 className='font-display text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Launch your game in <span className='text-violet-300'>minutes</span>
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-300'>
              {`Just 5 lines of code and have AAA game scale.`}
            </p>

            <div className='not-prose mt-4 grid grid-cols-1 gap-8 border-t border-charcole-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3'>
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

{/* function LevelUpSection() {
  return (
    <div className="w-full bg-white text-black p-8">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center text-center">
       
      //<ColoredBlocksComponent />

        <h1 className="font-display text-6xl font-bold mt-4">
          Level Up With Rivet
        </h1>
        <h2 className="text-2xl mt-2 italic">
          And Get Back To Game Development
        </h2>

        <div className='justify-center mt-10 flex flex-wrap items-center gap-x-6 gap-y-8'>
          <Button variant='juicy'>Sign Up for Beta</Button>

          <button className="text-black underline">
            5 minute crash course →
          </button>
        </div>
      </div>
    </div>
  );
  */}

 {/*function ColoredBlocksComponent() {
  // Replace with actual SVG or component that renders the colored blocks
  return <div className="flex justify-center space-x-2">
    <div className="w-12 h-12 bg-red-500"></div>
    <div className="w-12 h-12 bg-blue-500"></div>
    <div className="w-12 h-12 bg-green-500"></div>
  </div>;
}*/} 

Index.description = 'Open-source solution to deploy, scale, and operate your multiplayer game';
Index.prose = false;
