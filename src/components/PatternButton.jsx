import clsx from 'clsx';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import grainDark from '@/images/effects/grain-dark.png';
import grainLight from '@/images/effects/grain-light.png';

export function PatternButton({ children, onMouseEnter, onMouseLeave, ...props }) {
  let Component = props.href ? Link : 'button';

  const [hover, setHover] = useState(false);

  let highlight = props.highlight || hover;

  return (
    <Component
      onMouseEnter={ev => { setHover(true); if (onMouseEnter) { onMouseEnter(ev); } }}
      onMouseLeave={ev => { setHover(false); if (onMouseLeave) { onMouseLeave(ev); } }}
      {...props}
      className={clsx(
        'group relative transition',
        'flex',
        'text-cream-100 text-sm font-semibold',
        'border-2',
        'bg-charcole-950',
        highlight ? 'border-cream-100' : 'border-cream-100/50 hover:border-cream-100',
        props.className,
      )}>

      {/* Background */}
      <div style={{ backgroundImage: `url(${grainDark.src})`, opacity: highlight ? 1 : 0 }} className='absolute inset-0 bg-repeat transition pointer-events-none'></div>
      {/* <div style={{ backgroundImage: `url(${grainLight.src})`, zIndex: -1, opacity: hover ? 1 : 0 }} className='absolute inset-0 bg-repeat transition pointer-events-none'></div> */}

      {/* Children */}
      <div className={clsx('w-full h-full z-10', highlight ? 'opacity-100' : 'opacity-75 group-hover:opacity-100')}>
        {children}
      </div>
    </Component>
  );
}
