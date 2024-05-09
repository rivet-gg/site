'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';

import { Tag } from '@/components/Tag';
import { remToPx } from '@/lib/remToPx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/sharp-solid-svg-icons';

function Eyebrow({ tag, label }) {
  if (!tag && !label) {
    return null;
  }

  return (
    <div className='flex items-center gap-x-3'>
      {tag && <Tag>{tag}</Tag>}
      {tag && label && <span className='h-0.5 w-0.5 rounded-full bg-cream-300 dark:bg-charcole-600' />}
      {label && <span className='font-mono text-xs text-cream-400'>{label}</span>}
    </div>
  );
}

function Anchor({ id, inView, children }) {
  return (
    <Link href={`#${id}`} className='group text-inherit no-underline hover:text-inherit'>
      {children}
      {inView && (
        <div className='ml-2 inline-block text-base'>
          <FontAwesomeIcon
            className=' text-charcole-600 opacity-0 transition-opacity group-hover:opacity-100'
            icon={faLink}
          />
        </div>
      )}
    </Link>
  );
}

export function Heading({ level = 2, children, id, tag, label, anchor = true, ...props }) {
  let Component = `h${level}`;
  let ref = useRef();

  let inView = useInView(ref, {
    margin: `${remToPx(-3.5)}px 0px 0px 0px`,
    amount: 'all'
  });

  return (
    <>
      {level == 2 && <hr />}
      <Eyebrow tag={tag} label={label} />
      <Component
        ref={ref}
        id={anchor ? id : undefined}
        className={tag || label ? 'mt-2 scroll-mt-32' : 'scroll-mt-header-offset'}
        {...props}>
        {anchor ? (
          <Anchor id={id} inView={inView}>
            {children}
          </Anchor>
        ) : (
          children
        )}
      </Component>
    </>
  );
}
