'use client';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import CodeSection from '@/components/CodeSection';
import ProductSection from '@/components/ProductSection';
import MainFeatures from '@/components/MainFeatures';
import Earth from '@/components/Earth';
import { Button } from '@/components/Button';
import clsx from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IncludedSection from '@/components/Included';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Game } from '@/components/Game';
import LevelUpSection from '@/components/LevelUpSection';
import grainDark from '@/images/effects/grain-dark.png';
import RotatingText from '@/components/RotatingText';
import {
  faArrowRight,
  faBook,
  faLock,
  faServer,
  faFileCertificate,
  faCodeBranch,
  faAlien8bit,
  faSkullCrossbones,
  faSkull
} from '@fortawesome/sharp-solid-svg-icons';
import { faPlus, faGears } from '@fortawesome/sharp-solid-svg-icons';
import { Ferris } from '../components/icons/Ferris';

import opengbMeta from '@/generated/meta.json' assert { type: 'json' };

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

const ALL_MODULES = Object.entries(opengbMeta.modules).sort((a, b) =>
  (a[1].config.name ?? '').localeCompare(b[1].config.name)
);

export default function Index() {
  const restOfPageControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      restOfPageControls.start({ opacity: 1 });
    }, 300); // Start fading in the rest of the page 0.65 seconds after component mount

    return () => clearTimeout(timer);
  }, [restOfPageControls]);

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

        <div className='h-32' />

        <motion.div initial={{ opacity: 0 }} animate={restOfPageControls} transition={{ duration: 0.325 }}>
          <div className='relative border-t-2 border-cream-100/10 py-16'>
            {/* Background */}
            <div
              style={{ backgroundImage: `url(${grainDark.src})`, opacity: 0.4 }}
              className='pointer-events-none absolute inset-0 -z-20 bg-repeat transition'></div>
            <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#090909] opacity-100'></div>

            <MainFeatures />

            <div className='h-44' />

            <AllModules />
          </div>

          <PoweringPlay />

          <div className='h-40' />

          <ProductSection />

          <CodeSection />

          <div className='h-48' />

          <IncludedSection />

          <div className='h-64' />

          <div className='main-content-container mx-auto px-6'>
            <AdaptableSection />
          </div>

          <div className='h-48' />

          <Philosophy />
          <div className='h-32'></div>

          <LevelUpSection />
        </motion.div>
      </div>
    </div>
  );
}

function Title() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: 0.09 }}
      className={clsx(
        'relative mx-auto box-border flex flex-wrap items-center justify-center',
        'lg:h-[400px] lg:max-w-4xl',
        'md:h-[357px] md:max-w-3xl',
        'h-[45vw] w-full'
      )}>
      <GlowVideo className='pointer-events-none absolute inset-0 z-50 h-full w-full object-cover mix-blend-screen hue-rotate-[145deg]' />

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
    </motion.div>
  );
}

function Subtitle() {
  return (
    <div className='mt-20 flex w-full flex-col items-center justify-center px-2 text-center'>
      <motion.h1
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.325, delay: 0.135 }}
        className={clsx(
          'mb-2 mt-8 font-display font-extrabold tracking-tight text-cream-100',
          'gap-3 text-3xl sm:text-5xl md:text-6xl'
        )}>
        The Only Backend Your Game Needs
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.325, delay: 0.27 }}
        className='mt-4 text-center font-display text-3xl tracking-tight text-cream-100/80'>
        Supports Godot, Unity, Unreal Engine, HTML5, and Custom Engines.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.325, delay: 0.405 }}
        className={clsx(
          'text-2xl',
          'italic text-orange-500',
          'text-center font-display tracking-tight text-cream-100/80',
          'mt-3'
        )}>
        Open-Source & Self-Hostable.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.325, delay: 0.54 }}
        className='pointer-events-auto mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-8'>
        <Button variant='primaryJuicy' href='https://hub.rivet.gg'>
          Get Started
        </Button>
        <Button variant='juicy' href='https://rivet.gg/learn'>
          <FontAwesomeIcon icon={faBook} className='mr-2' />
          Documentation
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.325, delay: 0.675 }}
        className='mt-6'>
        <GitHubStars className='flex items-center justify-center gap-1 text-center text-xs font-bold text-cream-100/80 hover:text-orange-500 sm:text-sm' />
      </motion.div>
    </div>
  );
}

function AllModules() {
  return (
    <div className='mx-auto'>
      <h2 className='text-center font-display text-4xl font-bold tracking-tight text-cream-100 sm:text-5xl'>
        ...and so much more
      </h2>
      <div className='mx-auto mt-12 flex max-w-4xl flex-row flex-wrap justify-center gap-4'>
        {ALL_MODULES.map(([key, x]) => (
          <div key={key} className='group/tooltip relative inline'>
            <Button variant='juicySubtle' href={`https://opengb.dev/modules/${key}/overview`} target='_blank'>
              {x.config.icon && <FontAwesomeIcon icon={allFas[`fa${kebabToUpperCamel(x.config.icon)}`]} />}
              {x.config.name}
            </Button>
            <div
              className={clsx(
                'absolute left-1/2 top-[calc(100%+10px)] z-40',
                '-translate-x-1/2',
                'w-max max-w-[16rem]',
                'border border-charcole-950/20 bg-cream-100',
                'text-center text-xs text-charcole-950',
                'px-1.5 py-1.5',
                'leading-tight',
                'rounded',
                'invisible group-hover/tooltip:visible',
                'shadow-[0_4px_16px_0_rgba(0,0,0,0.7)]',
                'transition-all duration-300 ease-in-out',
                'opacity-0 group-hover/tooltip:opacity-100',
                'scale-95 transform group-hover/tooltip:scale-100',
                'pointer-events-none'
              )}>
              {x.config.description}
            </div>
          </div>
        ))}
      </div>
      <div className='mx-auto mt-12 flex max-w-4xl flex-row flex-wrap justify-center gap-4'>
        <Button variant='juicy' href='https://opengb.dev/build/overview' target='_blank'>
          <FontAwesomeIcon icon={faPlus} />
          Build Your Own Modules
        </Button>
        <Button variant='juicy' href='https://github.com/rivet-gg/opengb-modules' target='_blank'>
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
          <FontAwesomeIcon icon={faSkullCrossbones} /> Pirate our source code{' '}
          <FontAwesomeIcon icon={faArrowRight} className='h-6 w-6' />
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faGithub} /> {stars ? <>{formatNumber(stars)} stars</> : <>GitHub</>}{' '}
          <FontAwesomeIcon icon={faArrowRight} className='h-6 w-6' />
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
          'relative',
          'border-4 border-cream-100/5',
          'mx-4',
          'sm:px-16 sm:pb-14 sm:pt-16',
          'px-6 pb-6 pt-6',
          'rounded-md'
        )}>
        {/* BG */}
        <div
          style={{ backgroundImage: `url(${grainDark.src})`, opacity: 0.2 }}
          className='pointer-events-none absolute inset-0 -z-20 bg-repeat transition'></div>

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
          <GitHubStars className='font-semibold text-white/50 hover:text-white' />
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

// const PlayHoursCounter = () => {
//   const [currentTime, setCurrentTime] = useState(Date.now());
//   const [hasMounted, setHasMounted] = useState(false);

//   const updateClock = () => {
//     let time = (2400 / 60 / 60 / 1000) * (Date.now() - 1640995200000);
//     setCurrentTime(Math.round(time));
//   };

//   useEffect(() => {
//     setHasMounted(true);

//     updateClock();

//     const interval = setInterval(() => {
//       updateClock();
//     }, 100);

//     return () => clearInterval(interval);
//   }, []);

//   if (!hasMounted) {
//     return null;
//   }

//   const formattedTime = currentTime.toLocaleString();
//   const timeElements = formattedTime.split('').map((char, index) => {
//     const spanClass = isDigit(char) ? 'inline-block w-[0.52em]' : 'inline-block';
//     return (
//       <span key={index} className={`${spanClass} inline-block text-right`}>
//         {char}
//       </span>
//     );
//   });

//   return <span>{timeElements}</span>;
// };

const PlaySessionsCounter = () => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [hasMounted, setHasMounted] = useState(false);

  const updateClock = () => {
    let time = (21126202 / 30 / 24 / 60 / 60 / 1000) * (Date.now() - 1640995200000);
    setCurrentTime(Math.round(time));
  };

  useEffect(() => {
    setHasMounted(true);

    updateClock();

    const interval = setInterval(() => {
      updateClock();
    }, 50);

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

const GAME_GENRES = [
  'FPS',
  'MOBA',
  'battle royale',
  'MMO',
  'racing',
  'RTS',
  'turn-based',
  'party',
  'mobile',
  'console',
  'web',
  'casual'
];

function PoweringPlay() {
  return (
    <div className={clsx('relative flex h-[80vh] items-center justify-center', 'border-b-2 border-cream-100/10')}>
      {/* Background earth */}
      <div className='absolute w-full h-full -z-10 transform'>
        <Earth className='h-full w-auto object-cover brightness-[0.4] contrast-[1.4] opacity-50 grayscale filter' />
      </div>

      {/* Content */}
      <h3
        className={clsx(
          'text-center font-display tracking-tight text-cream-100',
          'xs:text-2xl text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
          'drop-shadow-[0_0_25px_rgba(0,0,0,0.9)]'
        )}>
        {/* Online indicator */}
        <div
          className={clsx(
            'relative inline-block flex-none rounded-full bg-orange-500',
            "before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-orange-500 before:opacity-70 before:content-['']",
            'mb-0.5 mr-2.5 h-3 w-3',
            'xs:mb-0.5 xs:mr-3 xs:h-4 xs:w-4',
            'sm:mb-0.5 sm:mr-4 sm:h-5 sm:w-5',
            'md:mb-0.75 md:mr-5 md:h-6 md:w-6',
            'lg:mb-1.5 lg:mr-6 lg:h-7 lg:w-7',
            'xl:mb-2 xl:mr-7 xl:h-8 xl:w-8'
          )}></div>
        <span className='opacity-75'>Powering</span> <PlaySessionsCounter />{' '}
        <span className='opacity-75'>play sessions</span>
        <br className='sm:hidden' /> <span className='opacity-75'>for</span>{' '}
        <RotatingText texts={GAME_GENRES} /> <span className='opacity-75'>games</span>
      </h3>
    </div>
  );
}

function AdaptableSection() {
  return (
    <div className='mx-auto flex max-w-6xl flex-col px-6 lg:px-8'>
      <h2 className='text-center font-display text-4xl font-bold tracking-tight text-cream-100 sm:text-5xl'>
        {/* {'Built from the Ground Up to Grow with Your Needs'} */}
        {'Need even more customization?'}
      </h2>
      <div className={clsx('mt-16 grid w-full gap-4', 'grid-cols-1 sm:grid-cols-2')}>
        <AdaptableFeature
          title='Custom backend modules, no server hassels'
          description='Write backend modules with TypeScript, Postgres, and actors. Auto-generate SDKs for your module to use in engine. Reuse modules across multiple games with registries.'
          docsHref='https://opengb.dev/docs/build/overview'
        />
        <AdaptableFeature
          title='Access low-level APIs'
          description='Build with low-level APIs for highly custom use cases. Includes APIs for provisioning servers, customizing networking, managing builds, and tuning DDoS protection rules.'
        />
        <AdaptableFeature
          title='Automatable cloud'
          description="Build custom deploy pipelines using Rivet's cloud APIs. Anything you can do via a GUI is available as an API & CLI."
          docsHref='/docs/cloud'
        />
        <AdaptableFeature
          title='Integrate with existing tools'
          description='Works with your favorite tools & existing backends. Integrate Rivet incrementally without having to rewrite anything.'
          docsHref='https://opengb.dev/integrations/overview'
        />
      </div>
    </div>
  );
}

function AdaptableFeature({ title, description, docsHref, ...props }) {
  return (
    <div
      className={clsx(
        'relative border-4 border-cream-100/5 px-6 py-4 text-cream-100',
        'flex flex-col gap-4',
        'rounded-md'
      )}
      {...props}>
      {/* BG */}
      <div
        style={{ backgroundImage: `url(${grainDark.src})`, opacity: 0.2 }}
        className='pointer-events-none absolute inset-0 -z-20 bg-repeat transition'></div>

      {/* Content */}
      <div className='font-display text-3xl font-bold tracking-tight text-cream-100'>{title}</div>
      <p>{description}</p>
      <div className='flex-grow' />

      {/* Documentation */}
      {docsHref && (
        <a
          href={docsHref}
          target={docsHref.startsWith('http') ? '_blank' : undefined}
          rel={docsHref.startsWith('http') ? 'noreferrer' : undefined}
          className='flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 sm:text-sm'>
          Documentation
          <FontAwesomeIcon icon={faArrowRight} className='h-6 w-6' />
        </a>
      )}
    </div>
  );
}

Index.description = 'Open-Source game infrastructure. Multiplayer game servers and modular backend.';
Index.prose = false;
Index.fullWidth = true;
