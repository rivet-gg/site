'use client';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { PatternButton } from '@/components/PatternButton';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Resource } from '@/components/Resources';
import IncludedSection from '@/components/Included';
import YCLogo from '@/components/YCLogo';
import A16ZLogo from '@/components/A16ZLogo';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import engineStyles from '../lib/engineStyles.json';
import GitHubButton from 'react-github-btn';
import { Game } from '@/components/Game';
import LevelUpSection from '@/components/LevelUpSection';
import IncludedHighlights from '@/components/highlights';
import grainDark from '@/images/effects/grain-dark.png';
import grid from '@/images/effects/grid.png';
import egg from '@/images/graphics/egg.png';
import {
  faBallotCheck,
  faDatabase,
  faEngine,
  faSignInAlt,
  faSquare1,
  faUserFriends,
  faSwap,
  faArrowRight,
  faArrowLeft,
  faCheck,
  faCaretLeft,
  faCaretRight,
  faBolt,
  faBook,
  faGraduationCap,
  faBooks,
  faChessKnight,
  faGameConsoleHandheld,
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
  faShieldAlt,
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
  faSkullCrossbones,
  faHeart,
  faLineChart,
  faSkull,
  faCogs,
  faCircleCheck,
  faDumbbell,
  faWallet,
  faGamepad,
  faEthernet,
  faLightbulb,
  faUser,
  faCircleDot,
  faMedal,
  faChartLine,
  faSyncAlt,
  faBug,
  faCoin,
  faGaugeCircleMinus,
  faFileArrowUp,
  faEnvelope,
} from '@fortawesome/sharp-solid-svg-icons';
import { Tooltip } from '@/components/mdx';
import imgMultiplayerCallout from '@/images/effects/multiplayer-callout.svg';
import imgLobbies from '@/images/screenshots/lobbies.png';
import imgOss from '@/images/screenshots/oss.png';
import imgMatchmaker from '@/images/screenshots/matchmaker.png';
import imgGameGuard from '@/images/screenshots/gameGuard.png';
import imgSocial from '@/images/screenshots/social.png';
import imgAnalytics from '@/images/screenshots/analytics.png';
import imgCdn from '@/images/screenshots/cdn.png';
import img551Regions from '@/images/effects/551 regions.png';

import imgComputerFrame from '@/images/effects/computer-frame.png';
import imgComputerOverlay from '@/images/effects/computer-overlay.png';
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
import { RainbowBarAnimated } from '../components/RainbowBarAnimated';

import imgTanks from '@/images/examples/tanks.png';
import imgAstro from '@/images/examples/astro.png';
import imgBomber from '@/images/examples/bomber.png';
import imgCli from '@/images/examples/cli.png';
import imgCol from '@/images/examples/col.png';
import imgProp from '@/images/examples/prop.png';
import imgUnityTanks from '@/images/examples/unitytanks.png';
import imgWeb from '@/images/examples/web.png';
import imgJS from '@/images/examples/JS.png';

import imgStepsGodot from '@/images/engine-integration/godot.png';
import imgStepsUnity from '@/images/engine-integration/unity.png';
import imgStepsUnreal from '@/images/engine-integration/unreal.png';
import imgStepsHtml5 from '@/images/engine-integration/html5.png';
import imgStepsCustom from '@/images/engine-integration/custom.png';
import { faPuzzle, faPlus, faGears, faQuestion } from '@fortawesome/sharp-solid-svg-icons';
import { Ferris } from '../components/icons/Ferris';

import opengbMeta from '@/generated/meta.json' assert { type: "json" };

// TODO: This probably balloons sizes
import * as allFas from '@fortawesome/sharp-solid-svg-icons';

function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function kebabToUpperCamel(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}


let supportedEngines = [
  {
    name: 'Godot',
    href: '/learn/godot',
    // styles: engineStyles.godot,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'Unity',
    href: '/learn/unity',
    // styles: engineStyles.unity,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'Unreal Engine',
    href: '/learn/unreal',
    // styles: engineStyles.unreal,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'HTML5',
    href: '/learn/html5',
    // styles: engineStyles.html5,
    join: <span>,&nbsp;and&nbsp;</span>
  },
  {
    name: 'Custom',
    href: '/learn/custom',
    // styles: engineStyles.custom,
    join: null
  }
];

let caseStudies = [
  {
    name: 'Apes.io',
    href: 'https://apes.io',
    logo: imgApesLogo,
    screenshot: grid
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
    logo: imgEvLogo,
    screenshot: grid
  },

  {
    name: 'Diep.io',
    href: 'https://diep.io',
    logo: imgDiepLogo,
    screenshot: grid
  }
];

let TEMPLATES = [
  {
    href: '/learn/html5/tutorials/tanks-canvas-socketio',
    screenshot: imgAstro,
    subtext: 'Canvas & Socket.IO'
  },
  {
    href: '/learn/godot/tutorials/bomber-demo',
    screenshot: imgBomber,
    subtext: 'Godot'
  },
  {
    href: '/learn/html5/tutorials/tanks-canvas-socketio',
    screenshot: imgTanks,
    subtext: 'Canvas & Socket.IO'
  },
  {
    href: '/learn/unity/tutorials/fishnet/crash-course',
    screenshot: imgUnityTanks,
    subtext: 'Unity & Fish-Net'
  },
  {
    href: 'https://github.com/rivet-gg/examples/tree/main/rust/pixelprop',
    screenshot: imgProp,
    subtext: 'Rust Prop Hunt'
  },
  {
    href: 'https://github.com/rivet-gg/examples/tree/main/javascript/webrtc',
    screenshot: imgWeb,
    subtext: 'WebRTC'
  },
  {
    href: 'https://github.com/rivet-gg/examples/tree/main/javascript/sandbox',
    screenshot: imgJS,
    subtext: 'JS Sandbox'
  },
  {
    href: 'https://github.com/rivet-gg/examples/tree/main/javascript/colyseus',
    screenshot: imgCol,
    subtext: 'Colyseus Template'
  }
];

const ALL_MODULES = Object.entries(opengbMeta.modules).sort((a, b) => (a[1].config.name ?? "").localeCompare(b[1].config.name));

export default function Index() {
  return (
    <div>
      <div className='relative isolate overflow-x-hidden'>
        <Title />

        {/* <div className='relative max-w-7xl mx-auto h-0 overflow-visible opacity-75'>
          <Image
            alt='This game is multiplayer!'
            src={imgMultiplayerCallout}
            className='absolute right-6 top-4 hidden sm:block'
          />
        </div> */}

        <Subtitle />
        {/* <div className='h-16'></div> */}

        {/* <RainbowBar className='max-w-5xl mx-auto h-1' /> */}
        {/* <RainbowBar className='w-full h-1' /> */}

        <div className='h-32'/>

        <MainFeatures />

        <div className='h-16'/>

        <AllModules />

        <div className='h-60'/>

        <IncludedSection />

        <div className='h-40'/>

        {/* <div className='px-6 py-40 lg:px-8'>
          <IncludedHighlights />
        </div> */}

        <div className='main-content-container mx-auto px-6 py-40 md:py-48 lg:px-8'>
          <CaseStudies />
        </div>

        <CodeSection />

        <TemplateSection />

        <Philosophy />
        <div className='h-32'></div>

        {/*<DemoSection /> */}

        {/* <EngineGrid /> */}

        {/* <UpAndRunning />*/}

        <LevelUpSection />
      </div>
    </div>
  );
}

function Title() {
  return (
    <div
      className={clsx(
        // ' mx-auto relative flex flex-wrap items-center justify-center border-2 border-cream-100 box-border',
        'relative mx-auto box-border flex flex-wrap items-center justify-center',
        'lg:h-[400px] lg:max-w-4xl',
        'md:h-[357px] md:max-w-3xl',
        // 'sm:max-w-2xl sm:h-[285px]',
        'h-[45vw] w-full'
      )}>
      <GlowVideo className='pointer-events-none absolute inset-0 z-50 h-full w-full object-cover mix-blend-screen' />

      <div className={clsx('absolute inset-x-[52px] inset-y-[24px]')}>
        {/* Game Background */}
        <Game className='absolute inset-0 z-10 h-full w-full' />

        {/* Content */}
        <div className='pointer-events-none z-10 flex select-none flex-col items-center justify-center text-center'>
          {' '}
        </div>

        {/* Multiplayer note */}
        {/* <div className='absolute bottom-2 right-2 flex items-center justify-center z-20 border border-cream-100 px-2.5 py-1 text-cream-100 font-semibold bg-charcole-950'> */}
        {/* <div className='absolute bottom-2 right-2 flex items-center justify-center z-20 border border-cream-100 px-2.5 py-1 text-xs text-charcole-950 font-bold bg-cream-100 uppercase'> */}
        <div className='pointer-events-none absolute bottom-2 right-2 z-20 flex select-none items-center justify-center px-2.5 py-1 text-xs font-bold uppercase text-cream-100/50 opacity-60'>
          <span>This game is multiplayer</span>
          {/* <span className='hidden md:block'>This game is multiplayer</span>
          <span className='block md:hidden'>Play game in a larger window</span> */}
        </div>

        {/* <div className='absolute bottom-2 right-2 flex items-center justify-center z-20 px-2.5 py-1 text-md font-semibold text-green-400'>
          <OnlineIndicator />
          <span>8 Players Online</span>
        </div> */}
      </div>
    </div>
  );
}

function Subtitle() {
  return (
    <div className='mt-20 flex w-full flex-col items-center justify-center px-2 text-center'>
      {/* <p>Open-source solution to deploy, scale, and operate your multiplayer game</p> */}
      {/* <p className='text-xl font-semibold'>Open-source solution to deploy & scale multiplayer game servers</p> */}
      {/* Title */}
      <h1
        className={clsx(
          'mb-2 mt-8 font-display font-extrabold tracking-tight text-cream-100',
          'gap-3 text-3xl sm:text-5xl md:text-6xl'
        )}>
        The Only Backend Your Game Needs
      </h1>
      <div className='text-center font-display text-3xl tracking-tight text-cream-100/80 mt-4'>Supports Godot, Unity, Unreal Engine, HTML5, and Custom Engines.</div>
      <div className={clsx(
        'text-2xl',
        'text-orange-500 italic',
        'text-center font-display tracking-tight text-cream-100/80',
        'mt-3'
      )}>Open-Source & Self-Hostable.</div>

      {/* CTA */}
      <div className='pointer-events-auto mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-8'>
        <Button variant='primaryJuicy' href='https://hub.rivet.gg'>
          Get Started
        </Button>
        <Button variant='juicy' href='https://rivet.gg/learn'>
          <FontAwesomeIcon icon={faBook} className='mr-2' />
          Documentation
        </Button>
      </div>

      <GitHubStars className='mt-6 flex items-center justify-center gap-1 text-center text-xs font-bold text-wistful-400 hover:text-wistful-300 sm:text-sm' />
      {/* <a
        href='https://github.com/rivet-gg/rivet'
        target='_blank'
        rel='noreferrer'
        className='pointer-events-auto mt-6 flex items-center justify-center gap-1 text-center text-xs font-bold text-wistful-400 hover:text-wistful-300 sm:text-sm'>
        <GitHubStarsRaw />
        <FontAwesomeIcon icon={faArrowRight} className='h-6 w-6' />
      </a> */}
    </div>
  );
}

function MainFeatures() {
  return (
    <div className={clsx(
      'mx-auto w-full max-w-[1800px] px-4 gap-4 sm:px-8 sm:gap-8',
      'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
    )}>
      <MainFeatureColumn
        icon={faServer}
        title='Game Servers & Peer-to-Peer'
        features={[
          // { icon: faChessKnight, name: "Easy to set up" },
          // { icon: faChessKnight, name: "Global low-latency network" },
          // { icon: faChessKnight, name: "DDoS mitigation & SSL (no added latency)" },
          // { icon: faChessKnight, name: "DDoS mitigation (no added latency)" },
          // { icon: faShieldAlt, name: <span><Tooltip tip={<>Read more about Game Guard <a href="/docs/dynamic-servers/concepts/game-guard">here</a>.</>}>DDoS mitigation</Tooltip></span> },
          { icon: faShieldAlt, name: "Low-latency, free DDoS mitigation" },
          { icon: faChartLine, name: <>Autoscaling & <Tooltip tip="Boot servers on-demand in less than 5 seconds">instant servers</Tooltip></> },
          // { icon: faSyncAlt, name: "No-downtime deploys & instant rollbacks" },
          { icon: faBug, name: "Monitoring & crash reporting" },
          { icon: faPlug, name: <>Supports TCP, UDP, WebSockets, & <Tooltip tip="WebRTC, ENet, KPC">more</Tooltip></> },
          // { icon: faChessKnight, name: "Automatic SSL for WebSockets & TCP+TLS" },
        ]}
        buttons={[
          { name: "Documentation", href: "/docs/dynamic-servers" },
          { name: "Get up to $120,000 in server credits", href: "https://b8v8449klvp.typeform.com/to/ZtMjRE7f", target: "_blank" },
        ]}
      />
      <MainFeatureColumn
        icon={faChessKnight}
        title='Matchmaking, Lobbies, & Parties'
        features={[
          // TODO: Add back once implemented
          // { icon: faSquare1, name: <>Get started with <Tooltip tip="1 line of code specifically in Godot & Unity">1 line of code</Tooltip></> },
          { icon: faChessKnight, name: "Supports casual, competitive, MMO, and turn-based" },
          { icon: faGameConsoleHandheld, name: "Supports server-authoritative, P2P, and async multiplayer" },
          { icon: faSwap, name: "Works with existing multiplayer" },
        ]}
        buttons={[{ name: "Documentation", href: "/docs/matchmaker" }]}
      />
      <MainFeatureColumn
        icon={faUser}
        title='Accounts, Friends, & Presence'
        features={[
          { icon: faEnvelope, name: "Email, username, and OAuth support" },
          { icon: faSignInAlt, name: "Support social logins including Google, Twitch, Discord, and more" },
          { icon: faUserFriends, name: "Display friends online & join lobbies" },
        ]}
        buttons={[{ name: "Documentation", href: "https://opengb.dev/modules/auth/overview", target: "_blank" }]}
      />
      <MainFeatureColumn
        icon={faPuzzle}
        title='100% Modular & Scriptable'
        features={[
          // { icon: faCode, name: "Write server-side logic in TypeScript (or use your own API server)" },
          { icon: faPuzzle, name: "Pick and choose modules to use" },
          { icon: faCode, name: "Easily write server-side logic" },
          { icon: faDatabase, name: <><Tooltip tip="Powered by Postgres">Database</Tooltip> included for free</> },
          // TODO: Add WebSockets when ready
          { icon: faBolt, name: <>Realtime functionality with actors</> },
          { icon: faEngine, name: <>Powered by <a href="https://opengb.dev" target="_blank" rel="noreferrer" className='text-orange-400 hover:text-orange-300'>Open Game Backend</a></> },
        ]}
        buttons={[{ name: "Documentation", href: "https://opengb.dev", target: "_blank" }]}
      />
    </div>
  );
}

function MainFeatureColumn({ icon, title, features, buttons }) {
  return (
    <div
      className={clsx(
        'relative',
        `p-10 text-left`,
        'flex flex-col items-start justify-start',
        'border-2 border-cream-100/20',
        'col-span-1'
      )}>
      {/* Background */}
      <div
        style={{ backgroundImage: `url(${grainDark.src})`, opacity: 0.3 }}
        className='pointer-events-none absolute inset-0 bg-repeat transition'></div>

      <div className='flex flex-col h-full z-50'>
        {/* Icon */}
        {/* <FontAwesomeIcon icon={icon} className='pb-3 text-4xl text-cream-100' /> */}
        {/* <div className='flex justify-center items-center'>
          <Image src={egg} style='mx-auto' height={120} />
        </div> */}

        {/* Title */}
        <h2 className='font-display text-3xl font-semibold text-cream-100'>{title}</h2>
        <div className='mt-8 flex max-w-2xl flex-col items-stretch gap-4'>
          {features.map((item, i) => (
            <div key={i} className='flex flex-row items-center gap-3 font-semibold text-cream-100/90'>
              {/* <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/[4%] outline outline-1 outline-white/[8%]'>
                {item.icon && <FontAwesomeIcon icon={item.icon} className='w-4' />}
              </div> */}
              <div className='flex flex-shrink-0 h-9 w-9 items-center justify-center rounded-lg bg-white/[4%] outline outline-1 outline-white/[8%]'>
                {item.icon && <FontAwesomeIcon icon={item.icon} className='w-4' />}
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className='grow min-h-4'></div>

        {/* Buttons */}
        <div className='flex flex-col gap-2 mt-6'>
          {
            buttons.map((button, i) => (
              <a
                key={i}
                href={button.href}
                target={button.target}
                rel='noreferrer'
                className={clsx('flex items-center justify-left gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 sm:text-sm', button.classes)}>
                {button.name}
                <FontAwesomeIcon icon={faArrowRight} className='h-6 w-6' />
              </a>
            ))
          }
        </div>
      </div>
    </div>
  );
}

function AllModules() {
  return (
    <div className="mx-auto">
      <h2 className='font-display text-4xl font-bold tracking-tight text-cream-100 sm:text-5xl text-center'>...and so much more</h2>
      <div className='flex flex-row flex-wrap justify-center gap-4 mt-12 max-w-4xl mx-auto'>
        {
          ALL_MODULES
            .map(([key, x]) => (
              <div key={key} className='group/tooltip relative inline'>
                <Button variant="juicySubtle" href={`https://opengb.dev/modules/${key}/overview`} target="_blank">
                  {x.config.icon && <FontAwesomeIcon icon={allFas[`fa${kebabToUpperCamel(x.config.icon)}`]} />}
                  {x.config.name}
                </Button>
                <div className={clsx(
                  'absolute top-[calc(100%+10px)] left-1/2 z-40',
                  'hidden w-max max-w-[16rem] -translate-x-1/2',
                  'border border-cream-100 bg-charcole-950',
                  'px-1.5 py-1 pb-1 text-center text-xs text-gray-50 opacity-100',
                  'group-hover/tooltip:flex leading-tight'
                )}>
                  {x.config.description}
                </div>
              </div>
            ))
        }
      </div>
      <div className='flex flex-row flex-wrap justify-center gap-4 mt-12 max-w-4xl mx-auto'>
        <Button variant="juicy" href="https://opengb.dev/build/overview" target="_blank">
          <FontAwesomeIcon icon={faPlus} />
          Build Your Own Modules
        </Button>
        <Button variant="juicy" href="https://github.com/rivet-gg/opengb-modules" target="_blank">
          <FontAwesomeIcon icon={faGears} />
          Modify Existing Modules
        </Button>
      </div>
    </div>
  );
}

function GlowVideo({ style, ...props }) {
  const videoRef = useRef(null);
  return (
    <video autoPlay loop muted playsInline ref={videoRef} {...props}>
      <source src='https://assets.rivet.gg/effects/glow.webm' type='video/webm' />
    </video>
  );
}

function GitHubStars({ repo = 'rivet-gg/rivet', ...props }) {
  const [stars, setStars] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (err) {
        console.error('Failed to fetch stars', err);
      }
    };

    fetchData();
  }, [repo]);

  return (
    <a
      href={`https://github.com/${repo}`}
      target='_blank'
      rel='noreferrer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}>
      {isHovered ? (
        <>
          <FontAwesomeIcon icon={faSkullCrossbones} /> Pirate our source code <FontAwesomeIcon icon={faArrowRight} className='h-6 w-6' />
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faGithub} /> {stars ? <>{formatNumber(stars)} stars</> : <>GitHub</>} <FontAwesomeIcon icon={faArrowRight} className='h-6 w-6' />
        </>
      )}
    </a>
  );
}

// function GitHubStarsRaw({ repo = 'rivet-gg/rivet' }) {
//   const [stars, setStars] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://api.github.com/repos/${repo}`);
//         const data = await response.json();
//         setStars(data.stargazers_count);
//       } catch (err) {
//         console.error('Failed to fetch stars', err);
//       }
//     };

//     fetchData();
//   }, [repo]);

//   return (
//     <>
//       <FontAwesomeIcon icon={faGithub} /> {stars ? <>{formatNumber(stars)} stars</> : <>GitHub</>}
//     </>
//   );
// }

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num.toString();
  }
}

// function DemoSection() {
//   return (
//     <div className='mt-24 flex flex-col items-center justify-center bg-black'>
//       {' '}
//       {/* Added bg-black */}
//       <br></br>
//       <Demo />
//       <br></br>
//     </div>
//   );
// }
// function Demo() {
//   return (
//     <div className='relative flex w-full justify-center bg-black'>
//       <div className='flex max-w-7xl flex-col p-4 sm:flex-row'>
//         {/* Text and Bullet Points */}
//         <div className='p-4' style={{ maxWidth: '50%' }}>
//           <h2 className='font-display text-xl font-bold tracking-tight text-cream-100 sm:text-7xl'>
//             <div>Build</div>
//             <div>Riveting</div>
//             <div>Experiences</div>
//           </h2>

//           <RainbowBarAnimated className='relative mt-0 h-1 w-[75%]' />

//           {/* Grid Container for Bullet Points */}
//           <div className='mt-8 grid grid-cols-1 gap-4'>
//             <div>
//               <ul
//                 className='list-outside list-disc space-y-6 font-bold text-cream-100'
//                 style={{ paddingLeft: '1.25em' }}>
//                 <li>Your whole multiplayer experience on one game development platform</li>
//                 <li>Use any engine, networking framework, or language</li>
//                 <li>{`We'll get you started on your first project or your major AAA global launch`}</li>
//                 <li>
//                   Join our open source community on the Discord, building the future for game developers
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Image */}
//         <div className='relative h-auto w-full overflow-hidden sm:h-full sm:flex-1'>
//           <Image
//             src={imgComputerFrame}
//             alt='Rivet'
//             className='h-auto w-full object-cover sm:h-full sm:w-full'
//           />
//           <div
//             className='absolute left-0 top-0 h-full w-full'
//             style={{
//               backgroundImage: 'linear-gradient(0deg, transparent, #00000030 50%, transparent)',
//               backgroundSize: '100% 20px',
//               animation: 'moveVerticalLines 5s linear infinite',
//               zIndex: 10
//             }}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

const ENGINE_PAGES = [
  {
    name: 'Godot',
    image: imgStepsGodot,
    learnUrl: '/learn/godot'
  },
  {
    name: 'Unity',
    image: imgStepsUnity,
    learnUrl: '/learn/unity',
    preview: true
  },
  {
    name: 'Unreal',
    image: imgStepsUnreal,
    learnUrl: '/learn/unreal',
    preview: true
  },
  {
    name: 'HTML5',
    image: imgStepsHtml5,
    learnUrl: '/learn/html5'
  },
  {
    name: 'Custom',
    image: imgStepsCustom,
    learnUrl: '/learn/custom'
  }
];

function CodeSection() {
  const [page, setPage] = useState({ index: 0, dir: 1 });

  const changePage = i => setPage({ index: i, dir: i > page.index ? 1 : -1 });

  return (
    <div className='py-30 flex flex-col items-center gap-12 px-4 md:py-48'>
      {/* <BigAssIcon icon={faEngine} color='text-cream-100' /> */}

      {/* <h2 className='text-center font-display text-5xl font-extrabold tracking-tight text-cream-100 sm:text-5xl'>
        Rivet works with your <span className='underline'>game engine</span> and <span className='underline'>networking framework</span>
      </h2> */}

      <h2 className='text-center font-display text-5xl font-extrabold tracking-tight text-cream-100 sm:text-5xl'>
        Rivet works with your game engine and networking framework.
      </h2>

      {/* <h2 className='text-center font-display text-5xl font-extrabold tracking-tight text-cream-100 sm:text-5xl'>
        Rivet works with your <span className='underline'>game engine</span> <FontAwesomeIcon icon={faEngine} /> and{' '}
        <span className='underline'>networking framework</span> <FontAwesomeIcon icon={faEthernet} />
      </h2> */}

      {/* <h2 className='text-center font-display text-5xl font-extrabold tracking-tight text-cream-100 sm:text-5xl'>
        Works with your game engine <FontAwesomeIcon icon={faEngine} className='text-red-500 mx-2' /> and networking framework <FontAwesomeIcon icon={faEthernet} className='text-blue-500 mx-2' />
      </h2> */}

      <div className='flex w-full flex-col items-stretch gap-2'>
        {/* Engine tabs */}
        <div className='flex flex-wrap justify-center gap-2'>
          {ENGINE_PAGES.map((engine, i) => (
            <Button key={i} variant='juicy' highlight={i == page.index} onMouseEnter={() => changePage(i)}>
              {engine.name}
            </Button>
          ))}
        </div>

        {/* Current engine */}
        <EnginePages page={page} onChangePage={setPage} />
      </div>
    </div>
  );
}

function EnginePages({ page, onChangePage }) {
  // TODO: Is this SEO friendly?
  return (
    <div className='relative h-[300px] md:h-[580px]'>
      <AnimatePresence initial={false} custom={page.dir}>
        <motion.div
          key={page.index}
          className='absolute flex w-full flex-col items-center'
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
              onChangePage(paginate(page.index, 1, ENGINE_PAGES));
            } else if (swipe > swipeConfidenceThreshold) {
              onChangePage(paginate(page.index, -1, ENGINE_PAGES));
            }
          }}>
          <EnginePageContents page={ENGINE_PAGES[page.index]} scale={page.index === 3} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function EnginePageContents({ page, scale }) {
  return (
    <>
      <Image src={page.image} alt={`${page.name} Image`} className='mx-auto w-full max-w-7xl' />
      <Button href={page.learnUrl} variant='juicy' className='px-6'>
        Get started using {page.name} <span aria-hidden='true'>→</span>
      </Button>
    </>
  );
}

function TemplateSection() {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <div className='flex flex-col items-center px-2 py-20 md:py-40'>
      {/* Title */}
      {/* <BigAssIcon icon={faCode} color="text-orange-500" /> */}
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='mt-8 font-display text-5xl font-bold tracking-tight text-cream-100'>
          Get started with an example <FontAwesomeIcon icon={faCode} className='ml-2' />
        </h2>
      </div>

      {/* Grid  with Increased Margins */}
      <div
        className={clsx(
          'mx-auto mt-16 grid gap-12 px-4 sm:px-8',
          'max-w-5xl',
          'grid-cols-2 sm:grid-cols-2 md:grid-cols-4'
        )}>
        {TEMPLATES.map((template, i) => (
          <Link
            key={i}
            href={template.href}
            className={clsx(
              'flex flex-col gap-2',
              // 'group relative h-[275px] items-center justify-center ',
              'group relative items-center justify-center ',
              'origin-center transform transition duration-200 hover:scale-105',
              hoveredLink !== null && hoveredLink !== i && 'opacity-50'
            )}
            onMouseEnter={() => setHoveredLink(i)}
            onMouseLeave={() => setHoveredLink(null)}>
            <Image className='w-full' src={template.screenshot} alt={template.subtext} />
            <div
              className={clsx(
                'whitespace-nowrap text-center font-semibold text-cream-100',
                'opacity-0 transition duration-200',
                hoveredLink == i && 'opacity-100'
              )}>
              {template.subtext}
            </div>
          </Link>
        ))}
      </div>

      {/* Separator */}
      <div className='mx-8 hidden h-8 w-[1px] sm:block'></div>

      {/* All examples */}
      <Link
        href='https://github.com/rivet-gg/examples'
        target='_blank'
        className='text-sm font-semibold leading-6 text-black text-white'>
        See all examples <span aria-hidden='true'>→</span>
      </Link>

      {/* Separator */}
      <div className='mx-8 hidden h-8 w-[1px] sm:block'></div>
    </div>
  );
}

const PHILOSOPHY_ITEMS = [
  { icon: faFileCertificate, title: 'Permissive License (Apache 2.0)' },
  { icon: faLock, title: 'Audit security' },
  { icon: faServer, title: 'Optionally self-host on-premise' },
  { iconEl: <Ferris className='h-6 w-6' />, title: '100% crustacean-certified Rust' },
  { icon: faSkull, title: 'Trust no-one, own your backend', classes: 'font-psychotic' }
];

function Philosophy() {
  return (
    <div className='main-content-container flex flex-col items-center py-20 md:py-40'>
      <div
        className={clsx(
          'border-2 border-cream-100/25',
          'mx-4',
          'sm:px-16 sm:pb-14 sm:pt-16',
          'px-6 pb-6 pt-6'
        )}>
        {/* Title */}
        {/* <BigAssIcon icon={faCodeBranch} color='text-cream-100' /> */}

        <div className='mx-auto max-w-4xl'>
          <h2 className='font-display text-5xl font-bold tracking-tight text-cream-100'>
            Our commitment to open-source <FontAwesomeIcon icon={faCodeBranch} className='ml-3 text-4xl' />
          </h2>
        </div>

        {/* Details */}
        <div className='mt-8 flex max-w-2xl flex-col gap-4 text-center text-justify text-cream-100/80'>
          <p>
            {/* <div className='float-left text-5xl mr-2'>E</div> */}
            Everyone who works at Rivet has shipped a multiplayer game. We{"'"}ve all experienced how much
            time & money is required to ship a game, and how much harder it is to maintain it.
          </p>
          <p>
            We refused to use closed-source solutions that locked us in and failed to grow alongside our use
            cases, so we always opted to build solutions ourselves. To build the tool we needed, we knew it
            had to make it radically open-source.
          </p>
          <p>The future of game development is open-source and we{"'"}re here to lead the way.</p>
        </div>

        <div className='mt-8 flex max-w-2xl flex-col items-stretch gap-4'>
          {PHILOSOPHY_ITEMS.map((item, i) => (
            <div key={i} className='flex flex-row items-center gap-3 font-semibold text-cream-100'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/[4%] outline outline-1 outline-white/[8%]'>
                {item.icon && <FontAwesomeIcon icon={item.icon} className='w-4' />}
                {item.iconEl && item.iconEl}
              </div>
              <span className={item.classes ?? ''}>{item.title}</span>
            </div>
          ))}
        </div>

        <div className='mt-8 flex justify-center sm:mt-12'>
          <GitHubStars className='text-white/50 hover:text-white font-semibold' />
        </div>
      </div>
    </div>
  );
}

function EngineGrid() {
  return (
    <div className='bg-black p-8 text-white'>
      <div className='mx-auto max-w-4xl'>
        <div className='grid auto-rows-fr grid-cols-3 text-center'>
          {/* Grid Item 1 */}
          <div className='flex flex-col justify-center border border-white p-4'>
            <h3 className='mt-2 font-display text-5xl'>Unity</h3>
          </div>

          {/* Grid Item 2 */}
          <div className='flex flex-col justify-center border border-white p-4'>
            <h3 className='font-display text-purple-800 sm:text-7xl'>
              <FontAwesomeIcon icon={faAlien8bit} />
            </h3>
          </div>

          {/* Grid Item 3 */}
          <div className=''>
            <h2 className='text-left font-display text-5xl font-bold'>Get started with Your Engine.</h2>
          </div>

          {/* Grid Item 4 */}
          <div className='flex flex-col justify-center border border-white p-4'>
            <h3 className='font-display text-purple-800 sm:text-7xl'>
              <FontAwesomeIcon icon={faAlien8bit} />
            </h3>
          </div>

          {/* Grid Item 5 */}
          <div className='flex flex-col justify-center border border-white p-4'>
            <h3 className='mt-2 font-display text-5xl'>Godot</h3>
          </div>

          {/* Grid Item 6 */}
          <div className='flex flex-col justify-center border border-white p-4'>
            <h3 className='font-display text-purple-800 sm:text-7xl'>
              <FontAwesomeIcon icon={faAlien8bit} />
            </h3>
          </div>

          {/* Grid Item 7 */}
          <div className='flex flex flex-col flex-col justify-center justify-center border border-white p-4'>
            <h3 className='mt-2 font-display text-5xl'>Unreal</h3>
          </div>

          {/* Grid Item 8 */}
          <div className='flex flex-col justify-center border border-white p-4'>
            <h3 className='mt-2 font-display text-5xl'>HTML5</h3>
          </div>

          {/* Grid Item 9 */}
          <div className='flex flex-col justify-center border border-white p-4'>
            <h3 className='mt-2 font-display text-5xl'>Custom</h3>
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

function paginate(page, dir, arr) {
  const newPage = page + dir;
  if (newPage < 0) return { index: arr.length - (-newPage % arr.length), dir };
  return { index: newPage % arr.length, dir };
}

const PlayHoursCounter = () => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [hasMounted, setHasMounted] = useState(false);

  const updateClock = () => {
    let time = (2400 / 60 / 60 / 1000) * (Date.now() - 1640995200000);
    setCurrentTime(Math.round(time));
  };

  useEffect(() => {
    setHasMounted(true);

    updateClock();

    const interval = setInterval(() => {
      updateClock();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const formattedTime = currentTime.toLocaleString();
  const timeElements = formattedTime.split('').map((char, index) => {
    const spanClass = isDigit(char) ? 'inline-block w-[0.52em]' : 'inline-block';
    return (
      <span key={index} className={`${spanClass} inline-block text-right`}>
        {char}
      </span>
    );
  });

  return <span>{timeElements}</span>;
};

function isDigit(char) {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return digits.indexOf(char) !== -1;
}

function CaseStudies({ props }) {
  let [hoverIdx, setHoverIdx] = useState(null);

  return (
    <div className='flex flex-col'>
      {/* Title */}
      <div className='max-w-1xl mx-auto text-center'>
        <h3 className='font-display text-6xl tracking-tight text-cream-100'>
          Some of the games that{' '}
          <FontAwesomeIcon icon={faHeart} className='tracking-tight text-red-500 sm:text-4xl' /> Rivet
        </h3>
      </div>

      {/* Grid */}
      <div className={clsx('mt-14', 'group', 'grid  gap-12', 'sm:mx-0 md:grid-cols-3', '-mx-6 grid-cols-1')}>
        {caseStudies.map((study, i) => (
          <Link
            key={i}
            href={study.href}
            className={clsx(
              'relative flex items-center justify-center p-8 transition hover:translate-y-[-10px] sm:p-10',
              'h-[200px] md:h-[475px]',
              hoverIdx == null || hoverIdx == i ? 'opacity-100' : 'opacity-50'
            )}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}>
            <Image
              className='absolute inset-0 -z-20 h-full w-full w-full object-cover'
              src={study.screenshot}
              alt=''
            />
            <Image className='h-14 w-32 object-contain transition' src={study.logo} alt={study.name} />
            {study.badge && study.badge()}
          </Link>
        ))}
      </div>

      {/* Play hours */}
      <div className='mt-10 flex w-full flex-row items-center justify-center text-sm font-bold uppercase text-white'>
        <OnlineIndicator />
        <span>
          <PlayHoursCounter /> play hours{' '}
        </span>
      </div>
    </div>
  );
}

function UpAndRunning() {
  return (
    <div className='relative isolate mt-28'>
      <div className='main-content-container sm:px-6 lg:px-8'>
        <div className='relative mx-auto flex max-w-2xl flex-col gap-16 px-6 py-16 ring-inset sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20'>
          {/* Flex Container for Image and Text */}
          <div className='flex w-full flex-row items-center justify-start gap-4 lg:gap-12'>
            {' '}
            {/* Added gap for spacing */}
            {/* Overlay Image */}
            <div className='pointer-events-none z-10 flex-shrink-0' style={{ width: '50%' }}>
              {' '}
              {/* Adjust width as necessary */}
              <Image
                src={imgComputerOverlay}
                alt='Rivet'
                className='pointer-events-none h-auto w-full' // Adjust size as necessary
              />
            </div>
            {/* Body */}
            <div className='w-full flex-auto'>
              <h2 className='font-display text-4xl font-bold tracking-tight text-white sm:text-5xl'>
                Launch your game in <span className='text-orange-300'>minutes</span>
              </h2>
              <p className='mt-6 text-lg leading-8 text-gray-300'>
                Just 5 lines of code for AAA game server scale.
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
    </div>
  );
}

function OnlineIndicator() {
  return (
    <div className="relative mr-2.5 inline-block h-2.5 w-2.5 rounded-full bg-white before:absolute before:inset-0 before:h-2.5 before:w-2.5 before:animate-ping before:rounded-full before:bg-white before:opacity-70 before:content-['']"></div>
  );
}

Index.description = 'Open-Source game infrastructure. Multiplayer game servers and modular backend.';
Index.prose = false;
Index.fullWidth = true;
