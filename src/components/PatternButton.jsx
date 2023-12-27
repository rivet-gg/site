import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import cloud from 'src/images/effects/cloud.png';

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

let COLOR_HUES = {
  'blue': 'hue-rotate-[0deg]',
  'purple': 'hue-rotate-[45deg]',
  'red': 'hue-rotate-[90deg]',
  'orange': 'hue-rotate-[135deg]',
  'yellow': 'hue-rotate-[180deg]',
  'greenish': 'hue-rotate-[225deg]',
  'green': 'hue-rotate-[270deg]',
  'turquoise': 'hue-rotate-[315deg]',
  'gray': null,
};

function ResourcePattern({ color, mouseX, mouseY, highlight, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  let gridWidth = 50;
  let gridHeight = 30;

  let hue = COLOR_HUES[color];
  let saturate = 'saturate-100';
  if (color == 'gray') {
    saturate = 'saturate-0';
  }

  return (
    <div className={clsx('pointer-events-none transition duration-300 -z-20', gridProps.className)}>
      <div className={clsx(
        'absolute inset-0 transition duration-300 [mask-image:linear-gradient(white,transparent)] ',
        highlight ? 'opacity-50' : 'group-hover:opacity-50'
      )}>
        <Image
          src={cloud}
          width={gridWidth}
          height={gridHeight}
          x='50%'
          {...gridProps}
          className={clsx('absolute inset-x-0 inset-y-[-30%] h-[160%] w-full opacity-20 saturate-0 fill-white/1 stroke-white/2.5', 'object-cover')}
        />
      </div>
      <motion.div
        className={clsx(
          'absolute inset-0 bg-gradient-to-r transition duration-300 from-[#202020] to-[#303030]',
          highlight ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
        style={style}
      />
      <motion.div
        className={clsx(
          'absolute inset-0 mix-blend-normal transition duration-300 ',
          highlight ? 'opacity-90' : 'opacity-0 group-hover:opacity-90'
        )}
        style={style}>
        <Image
          src={cloud}
          width={gridWidth}
          height={gridHeight}
          x='50%'
          {...gridProps}
          className={clsx('absolute inset-x-0 inset-y-[-30%] h-[160%] w-full', 'fill-white/2.5 stroke-white/10', 'object-cover', hue, saturate)}
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

  let highlight = props.highlight || false;

  return (
    <Component
      {...props}
      onMouseMove={onMouseMove}
      className={clsx(
        'group relative transition',
        'flex',
        'scale-[1.00] hover:scale-[1.00]',
        'text-cream-100 text-sm font-semibold',
        'border-2',
        'bg-charcole-950',
        highlight ? 'border-cream-100' : 'border-cream-100/50 hover:border-cream-100',
        props.className,
      )}>
      <ResourcePattern
        {...props.pattern}
        mouseX={mouseX} mouseY={mouseY}
        className={clsx(
          props.pattern?.className
        )} />
      <div className={clsx('w-full h-full', highlight ? 'opacity-100' : 'opacity-75 group-hover:opacity-100')}>
        {children}
      </div>
    </Component>
  );
}
