import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { motion, AnimatePresence } from 'framer-motion';

// Import your new images here
import imgGameServerManagement from '@/images/product/game-server-management.png';
import imgBackendEditor from '@/images/product/backend-editor.png';
import imgBackendLogs from '@/images/product/backend-logs.png';
import imgVersionsRollback from '@/images/product/version-management.png';

const PRODUCT_PAGES = [
  {
    name: 'Game Server Management',
    image: imgGameServerManagement,
    learnUrl: '/learn/game-server-management'
  },
  {
    name: 'Versions & Rollback',
    image: imgVersionsRollback,
    learnUrl: '/learn/versions-rollback'
  },
  {
    name: 'Backend Editor',
    image: imgBackendEditor,
    learnUrl: '/learn/backend-editor'
  },
  {
    name: 'Backend Logs',
    image: imgBackendLogs,
    learnUrl: '/learn/versions-rollback'
  }
];

export default function ProductSection() {
  const [page, setPage] = useState({ index: 0, dir: 1 });

  const changePage = i => setPage({ index: i, dir: i > page.index ? 1 : -1 });

  return (
    <div className='py-30 flex flex-col items-center gap-12 px-4 md:py-48'>
      <h2 className='text-center font-display text-5xl font-extrabold tracking-tight text-cream-100 sm:text-5xl'>
        Single Platform to Manage Your Backend & Game Servers
      </h2>

      <div className='flex w-full flex-col items-stretch gap-2'>
        {/* Product tabs */}
        <div className='flex flex-wrap justify-center gap-2'>
          {PRODUCT_PAGES.map((product, i) => (
            <Button key={i} variant='juicy' highlight={i == page.index} onMouseEnter={() => changePage(i)}>
              {product.name}
            </Button>
          ))}
        </div>

        {/* Current product */}
        <ProductPages page={page} onChangePage={setPage} />
      </div>
    </div>
  );
}

function ProductPages({ page, onChangePage }) {
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
              onChangePage(paginate(page.index, 1, PRODUCT_PAGES));
            } else if (swipe > swipeConfidenceThreshold) {
              onChangePage(paginate(page.index, -1, PRODUCT_PAGES));
            }
          }}>
          <ProductPageContents page={PRODUCT_PAGES[page.index]} scale={page.index === 3} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ProductPageContents({ page, scale }) {
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
