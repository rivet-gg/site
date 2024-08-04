import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEngine, faEthernet } from '@fortawesome/sharp-solid-svg-icons';

import imgStepsGodot from '@/images/engine-integration/godot.png';
import imgStepsUnity from '@/images/engine-integration/unity.png';
import imgStepsUnreal from '@/images/engine-integration/unreal.png';
import imgStepsHtml5 from '@/images/engine-integration/html5.png';
import imgStepsCustom from '@/images/engine-integration/custom.png';

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

export default function CodeSection() {
  const [page, setPage] = useState({ index: 0, dir: 1 });

  const changePage = i => setPage({ index: i, dir: i > page.index ? 1 : -1 });

  return (
    <div className='py-30 flex flex-col items-center gap-12 px-4 md:py-48'>
      <h2 className='text-center font-display text-5xl font-extrabold tracking-tight text-cream-100 sm:text-5xl'>
        Rivet Works with Your Game Engine
      </h2>

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
