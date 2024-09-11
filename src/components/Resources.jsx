import clsx from 'clsx';
import React from 'react';

import { Heading } from '@/components/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATTERNS, PatternButton } from '@/components/PatternButton';

function ResourceIcon({ icon }) {
  return (
    <div
      className={clsx(
        'flex h-7 w-7 items-center justify-center',
        'transition duration-300',
        'group-hover:ring-white-400 rounded-full bg-charcole-950/5 ring-1 ring-charcole-900/25 ring-white/15',
        ':bg-white/7.5 group-hover:bg-white-300/10'
      )}
    >
      <FontAwesomeIcon
        icon={icon}
        className='text-white-400 group-hover:text-white-400 h-5 w-5 transition duration-300'
      />
    </div>
  );
}

export function Resource({ children, ...props }) {
  // Adds line break opportunities after periods
  let splitTitle = props.title.split(/\./);
  let titleSegments = React.Children.map(splitTitle, (child, i) => {
    return (
      <div>
        {child}
        {i != splitTitle.length - 1 ? '.' : ''}
        {i != splitTitle.length - 1 ? <wbr></wbr> : null}
      </div>
    );
  });

  return (
    <PatternButton href={props.href} key={props.href} {...props}>
      <div className='relative flex grow flex-col rounded-2xl px-4 pb-4 pt-16'>
        <div className='grow' />
        {props.icon && <ResourceIcon icon={props.icon} />}
        <div className='mt-1 font-display text-xl font-semibold leading-7 text-charcole-900 [word-break:break-word] dark:text-white'>
          <span className='absolute inset-0 rounded-2xl' />
          {titleSegments}
        </div>
        {children && <div className='mt-2 text-sm leading-5 text-white/75'>{children}</div>}
      </div>
    </PatternButton>
  );
}

export function ResourceGroup({ title = 'Resources', columns = 2, children }) {
  let clonedChildren = React.Children.map(children, (child, i) => {
    // if (React.isValidElement(child)) {
    //   return React.cloneElement(child, { pattern: PATTERNS[i % PATTERNS.length] });
    // }
    return child;
  });

  return (
    <div className='my-16'>
      {title && (
        <Heading level={2} id='resources'>
          {title}
        </Heading>
      )}
      <div
        className={clsx(
          'not-prose mt-4 grid gap-8 pt-6',
          'grid-cols-1',
          columns >= 2 && 'sm:grid-cols-2',
          columns == 3 && 'xl:grid-cols-3',
          columns == 4 && 'xl:grid-cols-4'
        )}
      >
        {clonedChildren}
      </div>
    </div>
  );
}
