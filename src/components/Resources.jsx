import Link from 'next/link';
import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

import { GridPattern } from '@/components/GridPattern';
import { Heading } from '@/components/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const patterns = [
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

function ResourceIcon({ icon }) {
  return (
    <div className='flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-violet-300/10 dark:group-hover:ring-violet-400'>
      <FontAwesomeIcon
        icon={icon}
        className='h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-violet-300/10 dark:group-hover:stroke-violet-400'
      />
    </div>
  );
}

function ResourcePattern({ mouseX, mouseY, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  let gridWidth = 50;
  let gridHeight = 30;

  return (
    <div className='pointer-events-none'>
      <div className='absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50'>
        <GridPattern
          width={gridWidth}
          height={gridHeight}
          x='50%'
          className='absolute inset-x-0 inset-y-[-30%] h-[160%] w-full fill-black/[0.02] stroke-black/5 opacity-10 saturate-0 dark:fill-white/1 dark:stroke-white/2.5'
          {...gridProps}
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
          className='absolute inset-x-0 inset-y-[-30%] h-[160%] w-full fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10'
          {...gridProps}
        />
      </motion.div>
    </div>
  );
}

export function Resource({ children, ...props }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link
      href={props.href}
      key={props.href}
      onMouseMove={onMouseMove}
      className='group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5'>
      <ResourcePattern {...props.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20' />
      <div className='relative rounded-2xl px-4 pb-4 pt-16'>
        <ResourceIcon icon={props.icon} />
        <h3 className='mt-4 font-display text-sm font-semibold leading-7 text-zinc-900 dark:text-white'>
          <span className='absolute inset-0 rounded-2xl' />
          {props.title}
        </h3>
        {/* TODO: This is causing an error */}
        {/* <p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>{children}</p> */}
      </div>
    </Link>
  );
}

export function ResourceGroup({ children }) {
  let clonedChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { pattern: patterns[i % patterns.length] });
    }
    return child;
  });

  return (
    <div className='my-16 xl:max-w-none'>
      <Heading level={2} id='resources'>
        Resources
      </Heading>
      <div className='not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4'>
        {clonedChildren}
      </div>
    </div>
  );
}
