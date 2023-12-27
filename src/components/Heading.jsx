import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';

import { useSectionStore } from '@/components/SectionProvider';
import { Tag } from '@/components/Tag';
import { remToPx } from '@/lib/remToPx';

function AnchorIcon(props) {
  return (
    <svg viewBox='0 0 20 20' fill='none' strokeLinecap='round' aria-hidden='true' {...props}>
      <path d='m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3' />
    </svg>
  );
}

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
      {inView && (
        <div className='absolute ml-[calc(-1*var(--width))] mt-1 hidden w-[var(--width)] opacity-0 transition [--width:calc(2.625rem+0.5px+50%-min(50%,calc(theme(maxWidth.lg)+theme(spacing.8))))] group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50 2xl:[--width:theme(spacing.10)]'>
          <div className='group/anchor block h-5 w-5 rounded-lg bg-gray-50 ring-1 ring-inset ring-gray-300 transition hover:ring-charcole-500 dark:bg-charcole-800 dark:ring-charcole-700 dark:hover:bg-charcole-700 dark:hover:ring-charcole-600'>
            <AnchorIcon className='h-5 w-5 stroke-charcole-500 transition dark:stroke-gray-400 dark:group-hover/anchor:stroke-white' />
          </div>
        </div>
      )}
      {children}
    </Link>
  );
}

export function Heading({ level = 2, children, id, tag, label, anchor = true, ...props }) {
  let Component = `h${level}`;
  let ref = useRef();
  let registerHeading = useSectionStore(s => s.registerHeading);

  let inView = useInView(ref, {
    margin: `${remToPx(-3.5)}px 0px 0px 0px`,
    amount: 'all'
  });

  useEffect(() => {
    if (level === 2 || level == 3) {
      registerHeading({ id, ref, offsetRem: tag || label ? 8 : 6 });
    }
  });

  return (
    <>
      {level == 2 && <hr/>}
      <Eyebrow tag={tag} label={label} />
      <Component
        ref={ref}
        id={anchor ? id : undefined}
        className={tag || label ? 'mt-2 scroll-mt-32' : 'scroll-mt-24'}
        {...props}
      >
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
