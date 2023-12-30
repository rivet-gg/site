import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

import { GridPattern } from '@/components/GridPattern';
import { Heading } from '@/components/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PATTERNS = [
  {
    y: 16,
    squares: [
      [0, 1],
      [1, 3]
    ]
  },
  {
    y: -6,
    squares: [
      [-1, 2],
      [1, 3]
    ]
  },
  {
    y: 32,
    squares: [
      [0, 2],
      [1, 4]
    ]
  },
  {
    y: 22,
    squares: [[0, 1]]
  }
];

function ResourcePattern({ mouseX, mouseY, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  let gridWidth = 50;
  let gridHeight = 30;

  return (
    <div className={clsx('pointer-events-none transition duration-300 -z-20', gridProps.className)}>
      <div className='absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50'>
        <GridPattern
          width={gridWidth}
          height={gridHeight}
          x='50%'
          {...gridProps}
          className='absolute inset-x-0 inset-y-[-30%] h-[160%] w-full fill-black/[0.02] stroke-black/5 opacity-10 saturate-0 dark:fill-white/1 dark:stroke-white/2.5'
        />
      </div>
      <motion.div
        className='absolute inset-0 rounded-2xl bg-gradient-to-r from-[#f1f1f1] to-[#F4F4F4] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202020] dark:to-[#303030]'
        style={style}
      />
      <motion.div
        className='absolute inset-0 rounded-2xl opacity-0 mix-blend-normal transition duration-300 group-hover:opacity-100'
        style={style}>
        <GridPattern
          width={gridWidth}
          height={gridHeight}
          x='50%'
          {...gridProps}
          className='absolute inset-x-0 inset-y-[-30%] h-[160%] w-full fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10'
        />
      </motion.div>
    </div>
  );
}

export function PatternButton({ children, ...props }) {
  let Component = props.href ? Link : 'button';

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  let suppress = props.suppress || false;

  return (
    <Component
      {...props}
      onMouseMove={onMouseMove}
      className={clsx(
        'group relative flex rounded-2xl transition hover:scale-[1.03] active:scale-[0.95] hover:shadow-lg hover:shadow-black/10',
        suppress ? 'bg-transparent' : 'bg-white/2.5',
        suppress && 'opacity-50 hover:opacity-100',
        props.className,
      )}>
      <ResourcePattern
        {...props.pattern}
        mouseX={mouseX} mouseY={mouseY}
        className={clsx(
          suppress && 'opacity-0 group-hover:opacity-100',
          props.pattern?.className
        )} />
      <div className='-z-10 absolute inset-0 rounded-2xl ring-1 ring-inset ring-charcole-900/7.5 group-hover:ring-charcole-900/10 dark:ring-white/10 dark:group-hover:ring-white/20' />
      {children}
    </Component>
  );
}