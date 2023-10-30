import Link from 'next/link';
import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

import { Heading } from '@/components/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATTERNS, PatternButton } from '@/components/PatternButton';

function ResourceIcon({ icon }) {
  return (
    <div className='flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-violet-300/10 dark:group-hover:ring-violet-400'>
      <FontAwesomeIcon
        icon={icon}
        className='h-5 w-5 text-zinc-400 transition duration-300 group-hover:text-violet-400'
      />
    </div>
  );
}

export function Resource({ children, ...props }) {
  // Adds line break opportunities after periods
  let splitTitle = props.title.split(/\./);
  let titleSegments = React.Children.map(splitTitle, (child, i) => {
    return (
      <text>
        {child}
        {i != splitTitle.length - 1 ? '.' : ''}
        {i != splitTitle.length - 1 ? <wbr></wbr> : null}
      </text>
    );
  });

  return (
    <PatternButton
      href={props.href}
      key={props.href}>
      <div className='relative rounded-2xl px-4 pb-4 pt-16'>
        <ResourceIcon icon={props.icon} />
        <div className='mt-4 font-display text-xl font-semibold leading-7 text-zinc-900 [word-break:break-word] dark:text-white'>
          <span className='absolute inset-0 rounded-2xl' />
          {titleSegments}
        </div>
        <span className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>{children}</span>
      </div>
    </PatternButton>
  );
}

export function ResourceGroup({ title = 'Resources', children }) {
  let clonedChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { pattern: PATTERNS[i % PATTERNS.length] });
    }
    return child;
  });

  return (
    <div className='my-16'>
      <Heading level={2} id='resources'>
        {title}
      </Heading>
      <div className='not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4'>
        {clonedChildren}
      </div>
    </div>
  );
}
