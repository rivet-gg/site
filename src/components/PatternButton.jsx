import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import cloud from 'src/images/effects/cloud.png';

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

const BACKGROUND_STYLES = {
  backgroundImage: `url(${cloud.src})`,
  backgroundRepeat: "repeat",
  // backgroundSize: `${cloud.width / 2}px ${cloud.height / 2}px`
  backgroundSize: `${cloud.width}px ${cloud.height}px`
}

function ResourcePattern({ color, mouseX, mouseY, highlight, image, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  let gridWidth = 50;
  let gridHeight = 30;

  return (
    <div className={clsx('pointer-events-none transition duration-300 -z-20', gridProps.className)}>
      <div className={clsx(
        'absolute inset-0 transition duration-300 [mask-image:linear-gradient(white,transparent)] ',
        highlight ? 'opacity-50' : 'group-hover:opacity-50'
      )}>
        <div
          width={gridWidth}
          height={gridHeight}
          x='50%'
          {...gridProps}
          style={BACKGROUND_STYLES}
          className={clsx('absolute inset-x-0 inset-y-[-30%] h-[160%] w-full opacity-20 saturate-0')}
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
        <div
          width={gridWidth}
          height={gridHeight}
          x='50%'
          {...gridProps}
          style={BACKGROUND_STYLES}
          className={clsx('absolute inset-x-0 inset-y-[-30%] h-[160%] w-full')}
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
      <div className={clsx('w-full h-full flex', highlight ? 'opacity-100' : 'opacity-75 group-hover:opacity-100')}>
        {children}
      </div>
    </Component>
  );
}
