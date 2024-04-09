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
import YCLogo from '@/components/YCLogo';
import A16ZLogo from '@/components/A16ZLogo';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import engineStyles from '../lib/engineStyles.json';
import GitHubButton from 'react-github-btn';
import { Game } from '@/components/Game';
import grainDark from '@/images/effects/grain-dark.png';
import {
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
  faEngine,
  faEthernet,
  faLightbulb,
  faUser,
  faCircleDot,
  faMedal
} from '@fortawesome/sharp-solid-svg-icons';
import { Tooltip } from "@/components/mdx";
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
import imgBlockLeft from '@/images/effects/leftBlock.png';
import imgBlockRight from '@/images/effects/rightBlock.png';
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
import imgCore from '@/images/examples/core.png';
import imgUnityTanks from '@/images/examples/unitytanks.png';
import imgWeb from '@/images/examples/web.png';

import imgStepsGodot from '@/images/engine-integration/godot.png';
import imgStepsUnity from '@/images/engine-integration/unity.png';
import imgStepsUnreal from '@/images/engine-integration/unreal.png';
import imgStepsHtml5 from '@/images/engine-integration/html5.png';
import imgStepsCustom from '@/images/engine-integration/custom.png';
import { faPuzzle, faPlus, faQuestion } from '@fortawesome/sharp-solid-svg-icons';
import { Ferris } from '../components/icons/Ferris';

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
    href: 'https://github.com/rivet-gg/examples/tree/main/html5/colyseus',
    screenshot: imgCol,
    subtext: 'Colyseus Template'
  },
  {
    href: 'https://github.com/rivet-gg/examples/tree/main/html5/webrtc',
    screenshot: imgWeb,
    subtext: 'WebRTC'
  },
  {
    href: 'https://github.com/rivet-gg/examples/tree/main/rust/cli-websocket',
    screenshot: imgCli,
    subtext: 'CLI WebSocket'
  },
  {
    href: 'https://github.com/rivet-gg/examples/tree/main/c/coredump',
    screenshot: imgCore,
    subtext: 'Core Dump'
  }
];

export default function Index() {
  return (
    <div>
      {/* Hero */}
      {/* <GridPattern className='absolute right-12 top-[600px] -z-10 m-0 w-[300px] max-w-[50%]'></GridPattern>
      <GridPattern className='absolute left-12 top-[600px] -z-10 m-0 w-[300px] max-w-[50%] -scale-x-100'></GridPattern> */}

      {/* Header */}
      <div className='relative isolate overflow-x-hidden'>
        <div>
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

          <div className='px-6 pt-16 pb-40 lg:px-8'>
            <Infrastructure />
          </div>

          <div className='max-w-6xl mx-auto px-6 md:py-48 lg:px-8'>
            <Modules />
          </div>

          <div className='main-content-container mx-auto px-6 py-32 md:py-48 lg:px-8'>
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
    </div>
  );
}

function Background({ props }) {
  const canvasRef = useRef(null);

  const bg = '9, 9, 9';
  // const fg = '255, 124, 0';
  const fg = '200, 200, 200';

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
    <div className={clsx(
      ' mx-auto relative flex flex-wrap items-center justify-center border-2 border-cream-100 box-border',
      'lg:max-w-4xl lg:h-[400px]',
      'md:max-w-3xl md:h-[357px]',
      // 'sm:max-w-2xl sm:h-[285px]',
      'w-full h-[45vw]',
    )}>
      {/* Background */}
      {/* <Background /> */}

      {/* Game Background */}
      <Game className='absolute inset-0 z-10 h-full w-full' />

      {/* Content */}
      <div className='pointer-events-none z-10 flex select-none flex-col items-center justify-center text-center'>
        {/* Title */}
        <h1 className={clsx(
          'mt-8 font-display font-extrabold tracking-tight text-cream-100',
          'text-3xl sm:text-5xl md:text-6xl'
        )}>
          Multiplayer Made Simple
          {/* Multiplayer Tooling<br/>Made Simple */}
          {/* Multiplayer Infrastructure<br/>Made Simple */}
        </h1>
      </div>

      {/* Multiplayer note */}
      {/* <div className='absolute bottom-2 right-2 flex items-center justify-center z-20 border border-cream-100 px-2.5 py-1 text-cream-100 font-semibold bg-charcole-950'> */}
      {/* <div className='absolute bottom-2 right-2 flex items-center justify-center z-20 border border-cream-100 px-2.5 py-1 text-xs text-charcole-950 font-bold bg-cream-100 uppercase'> */}
      <div className='absolute bottom-2 right-2 flex items-center justify-center z-20 px-2.5 py-1 text-xs text-cream-100 font-bold uppercase opacity-60 pointer-events-none select-none'>
        <FontAwesomeIcon icon={faGamepad} className='text-lg mr-2' />
        <span>This game is multiplayer</span>
        {/* <span className='hidden md:block'>This game is multiplayer</span>
        <span className='block md:hidden'>Play game in a larger window</span> */}
      </div>

      {/* <div className='absolute bottom-2 right-2 flex items-center justify-center z-20 px-2.5 py-1 text-md font-semibold text-green-400'>
        <OnlineIndicator />
        <span>8 Players Online</span>
      </div> */}
    </div>
  );
}

function Subtitle() {
  return (
    <div className='flex w-full flex-col items-center justify-center px-2 mt-20 text-center'>
      {/* <p>Open-source solution to deploy, scale, and operate your multiplayer game</p> */}
      {/* <p className='text-xl font-semibold'>Open-source solution to deploy & scale multiplayer game servers</p> */}

      <p className="font-display tracking-tight text-cream-100 text-center flex flex-row gap-3 text-4xl italic">
        <span className='underline decoration-green-500'>Easy.</span>
        <span className='underline decoration-orange-500'>Flexible.</span>
        <span className='underline decoration-blue-500'>Affordable.</span>
      </p>

      <p className='mt-6 text-lg opacity-90 text-cream-100'>
        Supports&nbsp;
        {supportedEngines.map(({ name, image, href, styles, join }, i) => (
          <span key={name}>
            <Link
              href={href}
              className={clsx(
                'pointer-events-auto inline font-semibold transition hover:scale-110',
                'hover:underline',
                // styles.text
              )}>
              {name}
            </Link>
            {join}
          </span>
        ))}.
        <br/>
        Open-source and self-hostable.
      </p>

      {/* GitHub */}
      <div className='mt-4'>
        <GitHubStars />
      </div>

      {/* Investors */}
      {/* <div className='mt-6 block w-max flex items-center justify-center gap-2 text-2xs font-semibold text-white'> */}
      {/*   <div className='opacity-75'>Backed by</div> */}
      {/*   <Link */}
      {/*     href='https://www.ycombinator.com/' */}
      {/*     target='_blank' */}
      {/*     className=' opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0'> */}
      {/*     <YCLogo className='h-[1.7em]' white={true} /> */}
      {/*   </Link> */}
      {/*   <div className='opacity-75'>&</div> */}
      {/*   <Link */}
      {/*     href='https://a16z.com/games/' */}
      {/*     target='_blank' */}
      {/*     className='argin-auto block w-max opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0'> */}
      {/*     <A16ZLogo className='h-[1.7em]' white={true} /> */}
      {/*   </Link> */}
      {/* </div> */}

      {/* CTA */}
      <div className='pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-8'>
        <Button variant='primaryJuicy' href='https://hub.rivet.gg'>
          Get Started
        </Button>
        <Button variant='juicy' href='https://rivet.gg/learn'>
          <FontAwesomeIcon icon={faBook} className='mr-2' />
          Documentation
        </Button>

        {/* <Link href='/learn' className='text-sm font-semibold leading-6 text-white'>
          Documentation <span aria-hidden='true'>→</span>
        </Link> */}
      </div>

      <a
        href='https://b8v8449klvp.typeform.com/to/ZtMjRE7f'
        target='_blank'
        rel='noreferrer'
        className='mt-6 pointer-events-auto flex items-center justify-center gap-1 text-center text-xs sm:text-sm font-bold text-cream-100/80 hover:text-cream-100'>
        Announcing up to $120k credits with Akamai RISE
        <FontAwesomeIcon icon={faArrowRight} className='h-6 w-6' />
      </a>
    </div>
  );
}

function GitHubStars({ repo = 'rivet-gg/rivet'}) {
  const [stars, setStars] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (err) {
        console.error("Failed to fetch stars", err);
      }
    };

    fetchData();
  }, [repo]);

  return (
    <a className='text-white/50 hover:text-white' href={`https://github.com/${repo}`} target="_blank" rel="noreferrer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isHovered
        ? <><FontAwesomeIcon icon={faSkullCrossbones} /> Pirate our source code</>
        : <><FontAwesomeIcon icon={faGithub} /> {stars ? <>{formatNumber(stars)} stars</> : <>GitHub</>}</>
      }
    </a>
  );
};

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num.toString();
  }
};



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
    <div className='flex flex-col items-center gap-12 px-4 py-30 md:py-48'>
      {/* <BigAssIcon icon={faEngine} color='text-cream-100' /> */}

      {/* <h2 className='text-center font-display text-5xl font-extrabold tracking-tight text-cream-100 sm:text-5xl'>
        Rivet works with your <span className='underline'>game engine</span> and <span className='underline'>networking framework</span>
      </h2> */}

      <h2 className='text-center font-display text-5xl font-extrabold tracking-tight text-cream-100 sm:text-5xl'>
        Rivet works with your <span className='underline decoration-orange-500'>game engine</span> and <span className='underline decoration-blue-500'>networking framework</span>
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
    <div className='flex flex-col items-center px-2 py-20 md:py-52'>
      {/* Title */}
      {/* <BigAssIcon icon={faCode} color="text-orange-500" /> */}
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='font-display font-bold tracking-tight text-cream-100 text-5xl mt-8'>
          Get started with an example <FontAwesomeIcon icon={faCode} className='ml-3 text-orange-500' />
        </h2>
      </div>

      {/* Grid with Increased Margins */}
      <div
        className={clsx('mx-auto mt-16 grid gap-12 px-4 sm:px-8', 'max-w-5xl', 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4')}>
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
                'text-center font-semibold text-cream-100 whitespace-nowrap',
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
  { icon: faFileCertificate, title: "Permissive License (Apache 2.0)" },
  { icon: faLock, title: "Audit security" },
  { icon: faServer, title: "Optionally self-host on-premise" },
  { iconEl: <Ferris className="w-6 h-6" />, title: "100% crustacean-certified Rust" },
  { icon: faSkull, title: "Trust no-one, own your backend", classes: 'font-psychotic' },
];

function Philosophy() {
  return (
    <div className='main-content-container flex flex-col items-center py-20 md:py-52'>
      <div className={clsx(
        'border-2 border-cream-100/25',
        'mx-4',
        'sm:px-16 sm:pt-16 sm:pb-14',
        'px-6 pt-6 pb-6',
      )}>
        {/* Title */}
        {/* <BigAssIcon icon={faCodeBranch} color='text-cream-100' /> */}

        <div className='mx-auto max-w-4xl'>
          <h2 className='font-display font-bold tracking-tight text-cream-100 text-5xl'>
            Our commitment to open-source <FontAwesomeIcon icon={faCodeBranch} className='ml-3 text-4xl' />
          </h2>
        </div>

        {/* Details */}
        <div className='flex flex-col gap-4 text-cream-100/80 text-center max-w-2xl mt-8 text-justify'>
          <p>
            {/* <div className='float-left text-5xl mr-2'>E</div> */}
            Everyone who works at Rivet has shipped a multiplayer game. We{"'"}ve all experienced how much time & money is required to ship a game, and how much harder it is to maintain it.
          </p>
          <p>
            We refused to use closed-source solutions that locked us in and failed to grow alongside our use cases, so we always opted to build solutions ourselves. To build the tool we needed, we knew it had to make it radically open-source.
          </p>
          <p>
            The future of game development is open-source and we{"'"}re here to lead the way.
          </p>
        </div>


        <div className='max-w-2xl flex flex-col gap-4 items-stretch mt-8'>
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

        <div className='mt-8 sm:mt-12 flex justify-center'>
          <GitHubStars />
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

function Infrastructure() {
  return (
    <div className="flex flex-col items-center">
      {/* <h3 className="font-display tracking-tight text-cream-100 sm:text-5xl">Infrastructure</h3>
      <p className="text-white/80 text-center max-w-2xl mt-8">
        Flexible, open-source, & cost-effective infrastructure for multiplayer games.
      </p> */}

      {/* <h3 className="font-display tracking-tight text-cream-100 sm:text-5xl">Easy. Flexible. Affordable.</h3> */}
      {/* <h3 className="font-display tracking-tight text-cream-100 sm:text-5xl">
        Easy.<br/>
        Flexible.<br/>
        Affordable.
      </h3> */}
      {/* <h3 className="font-display tracking-tight text-cream-100 sm:text-5xl"> */}

      {/* <h3 className="font-display tracking-tight text-cream-100 sm:text-5xl text-center flex flex-row gap-3">
        <span className='underline decoration-green-500'>Easy.</span>
        <span className='underline decoration-orange-500'>Flexible.</span>
        <span className='underline decoration-blue-500'>Affordable.</span>
      </h3> */}

      {/* <h3 className="font-display tracking-tight text-cream-100 sm:text-6xl text-center">
        Multiplayer Infrastructure
      </h3>
      <p className="font-display tracking-tight text-cream-100 text-center flex flex-row gap-3 text-3xl italic mt-4">
        <span className='underline decoration-green-500'>Easy.</span>
        <span className='underline decoration-orange-500'>Flexible.</span>
        <span className='underline decoration-blue-500'>Affordable.</span>
      </p> */}

      {/* <h3 className="font-display tracking-tight text-cream-100 sm:text-5xl">
        Easy. <FontAwesomeIcon icon={faCircleCheck} className='text-green-500' /><br/>
        Flexible. <FontAwesomeIcon icon={faDumbbell} className='text-orange-500' /><br/>
        Affordable. <FontAwesomeIcon icon={faWallet} className='text-blue-500' />
      </h3> */}
      {/* <h3 className="font-display tracking-tight text-cream-100 sm:text-5xl">
        Easy. <FontAwesomeIcon icon={faCircleCheck} className='text-green-500' /> Flexible. <FontAwesomeIcon icon={faDumbbell} className='text-orange-500' /> Affordable. <FontAwesomeIcon icon={faWallet} className='text-blue-500' />
      </h3> */}

      {/* <h3 className="font-display tracking-tight text-cream-100 sm:text-5xl">
        <span>
          Easy. <FontAwesomeIcon icon={faCircleCheck} className='text-4xl text-green-500 ml-2' />
        </span><br/>
        <span className='pl-8'>
          Flexible. <FontAwesomeIcon icon={faDumbbell} className='text-4xl text-orange-500 ml-2' />
        </span><br/>
        <span className='pl-16'>
        Affordable. <FontAwesomeIcon icon={faWallet} className='text-4xl text-blue-500 ml-2' />
        </span><br/>
      </h3> */}

      {/* <p className="text-white/80 text-center max-w-2xl mt-8">
        Flexible, open-source, & cost-effective infrastructure for multiplayer games.
      </p> */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 mt-16">
        <InfrastructureCard
          className="md:col-span-7"
          href="/docs/dynamic-servers"
          icon={faServer}
          title="Dedicated Game Servers"
          // description="Run your game servers on a global multi-cloud network"
          // description="Run game servers across multiple regions & clouds providers"
          // description="game servers across multiple regions & clouds providers"
          description="Deploy game servers in minutes across multiple regions & clouds providers"
          features={[
            // <>Dedicated, cost-effective servers <Tooltip tip="Shared CPU core similar to VPS providers, see pricing page for details">starting at $2.85/mo</Tooltip></>,
            <>Optimize for performance or cost, servers <Tooltip tip="Shared CPU core similar to VPS providers, see pricing page for details">starting at $2.85/mo</Tooltip></>,
            <>Auto-scales <Tooltip tip="Benchmark coming soon to our blog">90% faster</Tooltip> than AWS GameLift</>,
            "No-downtime deploys & instant rollbacks",
            "Monitoring & crash reporting",
          ]}
          bgColor="bg-blue-500/[0.01]"
        />
        <InfrastructureCard
          className="md:col-span-5"
          href="/docs/dynamic-servers/concepts/game-guard"
          icon={faShieldAlt}
          title="DDoS Mitigation"
          // description="Protect your game servers from DDoS attacks"
          features={[
            "Included for free",
            "No added latency",
            "Supports UDP & TCP & WebSockets & WebRTC",
            "Automatic SSL for game servers (WebSockets & TCP+TLS)",
          ]}
          bgColor="bg-orange-500/[0.01]"
        />
        <InfrastructureCard
          className="md:col-span-5"
          href="/docs/cdn"
          icon={faGlobe}
          title="CDN"
          description="Asset delivery, game downloads, & website hosting"
          features={[
            "Custom domains",
            "Instant rollbacks",
            "Automatic SSL",
          ]}
          bgColor="bg-green-500/[0.01]"
        />
        <InfrastructureCard
          className="md:col-span-7"
          href="https://opengb.dev"
          target="_blank"
          // icon={faCogs}
          icon={faPuzzle}
          title="Backend Modules"
          // description="Extend with pre-built modules or write your own"
          // description="Extend Rivet with fully modular scripting to grow with your game"
          // description="Extend Rivet using TypeScript (or use your own API servers)"
          description="Write server-side logic using TypeScript (or use your own API server)"
          features={[
            // "Auto-scales to meet demand",
            // "Write server-side logic using TypeScript",
            "Modules include matchmaking, parties, authentication, & more",
            "Postgres database included for persistence",
            <>Powered by <a href="https://opengb.dev" target="_blank" rel="noreferrer" className='text-orange-300 hover:text-orange-500 hover:underline'>Open Game Backend</a></>,
            // "Fully modular, grows with your use cases",
            // "Global edge deployments",
          ]}
          bgColor="bg-purple-500/[0.01]"
        />
      </div>
    </div>
  );
};

function InfrastructureCard({ href, target, icon, title, description, features, className, bgColor }) {
  return (
    <div
      className={clsx(
        'relative',
        `md:h-[400px] text-left p-10`,
        'flex flex-col items-start justify-start',
        // 'border-2',


        // 'border-2 border-cream-100/80 hover:border-cream-100',
        'border-4 border-cream-100/10',
        // 'bg-white/10',

        'col-span-1',
        className
      )}>
      {/* Background */}
      <div
        style={{ backgroundImage: `url(${grainDark.src})`, opacity: 0.8 }}
        className='pointer-events-none absolute inset-0 bg-repeat transition'></div>
      {/* <div className={clsx('z-10 pointer-events-none absolute inset-0', bgColor)}></div> */}

      {/* Title */}
      <div className='z-50'>
        {/* Icon */}
        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[4%] outline outline-1 outline-white/[8%]'>
          <FontAwesomeIcon icon={icon} className='text-2xl text-cream-100' />
        </div>

        <h3 className="mt-4 font-display text-3xl font-semibold text-cream-100">{title}</h3>

        {description && <p className="mt-2 text-md text-cream-100/80"> {description}</p>}

        {features &&
          <ul className="mt-2 text-md text-cream-100/80">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        }
      </div>

      {/* Separator */}
      <div className='flex-grow'></div>

      {/* Documentation */}
      <div className={clsx(
        'flex flex-row justify-end z-10',
        'mt-6 md:mt-0',
      )}>
        <Button variant='juicy' href={href} target={target}>Documentation</Button>
        {/* <Button variant='juicy' href='https://rivet.gg/learn'>
          <FontAwesomeIcon icon={faBook} className='mr-2' />
          Documentation
        </Button> */}
      </div>
    </div>
  );
}

const MODULE_FEATURES = [
  <>Write server-side logic using TypeScript (or use your own API server)</>,
  <>Launch quickly by using existing modules</>,
  // <>Launch quickly by using existing modules to build your game backend</>,
  // <>Easily modify & create new modules with game-like scripting</>,
  <>Postgres database included for persistence</>,
  <>Open-source & self-hostable</>,
  // <>Secure, load-tested, & resilient </>,
  // <>Powered by <a href="https://opengb.dev" target="_blank" rel="noreferrer" className='text-orange-300 hover:text-orange-500 hover:underline'>Open Game Backend Engine</a></>,
];

function BigAssIcon({ icon, color }) {
  return (
    <div className='flex items-center justify-center rounded-[2rem] bg-white/[4%] outline outline-1 outline-white/[8%] w-[136px] h-[136px] mb-14'>
      <FontAwesomeIcon icon={icon} className={clsx('text-7xl', color)} />
    </div>
  );
}

function Modules() {
  return (
    <div className="flex flex-col items-center">
      <BigAssIcon icon={faPuzzle} color="text-purple-500" />
      <h3 className="font-display tracking-tight text-cream-100 text-5xl text-center">Extend with backend modules</h3>
      {/* Simple to write & adapt modules for your backend that work alongside Rivet. */}
      <ul className="text-cream-100/80 mt-8">
        {MODULE_FEATURES.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCheck} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {/* <p className="text-cream-100/80 mt-8 max-w-2xl text-center">
        {MODULE_FEATURES.map((feature, i) => <span key={i}>{feature}<br/></span>)}
      </p> */}
      {/* <p className="text-cream-100/80 mt-8 max-w-xl text-center">
        Import, modify, & create modules to fit your unique requirements.<br/>
        Scriptable like a game engine using TypeScript.<br/>
        Persist data using Postgres.<br/>
        Secure, load-tested, & resilient. <br/>
        Powered by <a href="https://opengb.dev" target="_blank" className='text-orange-300 hover:text-orange-500 hover:underline'>Open Game Backend Engine</a>.
      </p> */}

      <div className='text-lg text-bold'>Available Modules</div>
      <div className={clsx(
        "w-full grid gap-4 mt-8",
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
      )}>
        <ModuleCard title="Build your own" icon={faPlus} href="https://opengb.dev/build/overview" />
        <ModuleCard title="Matchmaker" icon={faChessKnight} href="/docs/matchmaker" />
        <ModuleCard title="Parties" icon={faPartyHorn} href="https://github.com/rivet-gg/opengb-registry/issues/5" comingSoon={true} />
        <ModuleCard title="Presence" icon={faCircleDot} href="https://github.com/rivet-gg/opengb-registry/issues/2" comingSoon={true} />
        <ModuleCard title="Auth" icon={faKey} href="https://opengb.dev/modules/auth/overview" />
        <ModuleCard title="Users" icon={faUser} href="https://opengb.dev/modules/users/overview" />
        <ModuleCard title="Friends" icon={faUserGroup} href="https://opengb.dev/modules/friends/overview" />
        <ModuleCard title="Leaderboards" icon={faMedal} href="https://github.com/rivet-gg/opengb-registry/issues/3" comingSoon={true} />
      </div>
      <Button variant="text-subtle" href="https://opengb.dev/modules" target="_blank" className="mt-8">See all modules →</Button>
    </div>
  );
}

function ModuleCard({ title, icon, href, comingSoon }) {
  return (
    <PatternButton href={href} target={href.startsWith("/") ? null : "_blank"}>
      <div className='flex flex-row items-center justify-start justify-between h-full px-5 py-4'>
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/[8%] outline outline-1 outline-white/[16%]'>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="inline-flex flex-col ml-4 flex-grow">
          <span className="text-lg font-semibold text-left leading-tight">{title}</span>
          {comingSoon && <span className="text-xs font-semibold text-cream-100/50 text-sm leading-tight">Coming mid-2024</span>}
        </div>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </PatternButton>
  );
}

function CaseStudies({ props }) {
  let [hoverIdx, setHoverIdx] = useState(null);

  return (
    <div className='flex flex-col'>
      {/* Title */}
      <div className='max-w-1xl mx-auto text-center'>
        <h3 className='font-display tracking-tight text-cream-100 text-5xl'>
          Some of the games that{' '}
          <FontAwesomeIcon icon={faHeart} className='tracking-tight text-red-500 sm:text-5xl' /> Rivet
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
            <div className={clsx('absolute inset-0 -z-10 bg-gradient-to-br opacity-70', study.gradient)} />
            <Image className='h-14 w-32 object-contain transition' src={study.logo} alt={study.name} />
            {study.badge && study.badge()}
          </Link>
        ))}
      </div>

      {/* Play hours */}
      <div className='w-full flex flex-row items-center justify-center text-white text-sm font-bold mt-10 uppercase'>
        <OnlineIndicator />
        <span><PlayHoursCounter /> play hours{' '}</span>
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

function LevelUpSection() {
  return (
    <div className='w-full bg-white p-8 text-black md:h-[600px]'>
      <div className='mx-auto flex h-full max-w-screen-xl flex-row items-center justify-between'>
        {/* Left Image Container */}
        <div className='flex h-full flex-1 items-center justify-end'>
          <Image
            src={imgBlockLeft}
            alt='Left Image'
            className='h-auto w-full' // Adjust size as necessary
          />
        </div>

        {/* Text Container - Centered Vertically and Horizontally */}
        <div className='mx-8 flex h-full flex-col items-center justify-center text-center'>
          <div className='mb-5 font-display text-6xl font-bold md:text-8xl'>Level Up With Rivet</div>
          <div className='mb-5 mt-2 font-display text-2xl font-bold italic md:text-4xl'>
            and get back to game development
          </div>

          <div className='mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-8'>
            <Button variant='blackJuicy' href='https://hub.rivet.gg'>
              Get Started
            </Button>
            <Link href='/learn' className='text-sm font-semibold leading-6 text-black'>
              5 minute crash course <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>

        {/* Right Image Container */}
        <div className='flex h-full flex-1 items-center justify-start'>
          <Image
            src={imgBlockRight}
            alt='Right Image'
            className='h-auto w-full' // Adjust size as necessary
          />
        </div>
      </div>
    </div>
  );
}

function OnlineIndicator() {
  return (
    <div className="inline-block w-3.5 h-3.5 mr-2.5 bg-green-400 rounded-full relative before:content-[''] before:absolute before:inset-0 before:w-3.5 before:h-3.5 before:bg-green-400 before:opacity-70 before:rounded-full before:animate-ping"></div>
  );
}

Index.description = 'Open-source multiplayer infrastructure. Easy, flexible, and affordable.';
Index.prose = false;
Index.fullWidth = true;
