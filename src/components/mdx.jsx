import Link from 'next/link';
export { default as Image } from 'next/image';
import clsx from 'clsx';
import { Heading } from '@/components/Heading';

export { ButtonGroup, Button } from '@/components/Button';
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code';
export { ResourceGroup, Resource } from '@/components/Resources';
export { Snippet } from '@/components/Snippet';
export { Summary } from '@/components/Summary';

export const a = Link;

// TODO: Phase this out with our own custom elements
export {
  Accordion,
  AccordionGroup
  // AppearFromTop,
  // Button,
  // Card,
  // CardGroup,
  // CodeBlock,
  // CodeGroup,
  // Check,
  // Expandable,
  // Frame,
  // Info,
  // Warning,
  // Note,
  // Param,
  // PillSelect,
  // Tabs,
  // Tip,
  // Tab,
  // Tooltip
} from '@mintlify/components';

export const h2 = function H2(props) {
  return <Heading level={2} {...props} />;
};

export function Tooltip({ tip, children }) {
  return (
    <span class='group relative z-10 inline'>
      <span class='underline decoration-zinc-400 decoration-dotted decoration-2 underline-offset-4 dark:decoration-zinc-500'>
      {children}
      </span>
      <span class='bg-black/50 absolute bottom-full left-1/2 z-40 mb-0.5 hidden w-max max-w-[16rem] -translate-x-1/2 rounded-lg border border-gray-50 px-1.5 py-1 pb-1 text-center text-xs text-gray-50 opacity-100 group-hover:flex dark:border-gray-500'>
      {tip}
      </span>
    </span>
  );
}

function InfoIcon(props) {
  return (
    <svg viewBox='0 0 16 16' aria-hidden='true' {...props}>
      <circle cx='8' cy='8' r='8' strokeWidth='0' />
      <path
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M6.75 7.75h1.5v3.5'
      />
      <circle cx='8' cy='4' r='.5' fill='none' />
    </svg>
  );
}

export function Tip({ children }) {
  return (
    <div className='my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]'>
      <InfoIcon className='mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200' />
      <div className='[&>:first-child]:mt-0 [&>:last-child]:mb-0'>{children}</div>
    </div>
  );
}

export function Note({ children }) {
  return (
    <div className='my-6 flex gap-2.5 rounded-2xl border border-violet-500/20 bg-violet-50/50 p-4 leading-6 text-violet-900 dark:border-violet-500/30 dark:bg-violet-500/5 dark:text-violet-200 dark:[--tw-prose-links:theme(colors.white)] dark:[--tw-prose-links-hover:theme(colors.violet.300)]'>
      <InfoIcon className='mt-1 h-4 w-4 flex-none fill-violet-500 stroke-white dark:fill-violet-200/20 dark:stroke-violet-200' />
      <div className='[&>:first-child]:mt-0 [&>:last-child]:mb-0'>{children}</div>
    </div>
  );
}

export function Info({ children }) {
  return (
    <div className='my-6 flex gap-2.5 rounded-2xl border border-cyan-500/20 bg-cyan-50/50 p-4 leading-6 text-cyan-900 dark:border-cyan-500/30 dark:bg-cyan-500/5 dark:text-cyan-200 dark:[--tw-prose-links:theme(colors.white)] dark:[--tw-prose-links-hover:theme(colors.cyan.300)]'>
      <InfoIcon className='mt-1 h-4 w-4 flex-none fill-cyan-500 stroke-white dark:fill-cyan-200/20 dark:stroke-cyan-200' />
      <div className='[&>:first-child]:mt-0 [&>:last-child]:mb-0'>{children}</div>
    </div>
  );
}

export function Warning({ children }) {
  return (
    <div className='my-6 flex gap-2.5 rounded-2xl border border-amber-500/20 bg-amber-50/50 p-4 leading-6 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/5 dark:text-amber-200 dark:[--tw-prose-links:theme(colors.white)] dark:[--tw-prose-links-hover:theme(colors.amber.300)]'>
      <InfoIcon className='mt-1 h-4 w-4 flex-none fill-amber-500 stroke-white dark:fill-amber-200/20 dark:stroke-amber-200' />
      <div className='[&>:first-child]:mt-0 [&>:last-child]:mb-0'>{children}</div>
    </div>
  );
}

export function Row({ children }) {
  return (
    <div className='grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2'>
      {children}
    </div>
  );
}

export function Col({ children, sticky = false }) {
  return (
    <div className={clsx('[&>:first-child]:mt-0 [&>:last-child]:mb-0', sticky && 'xl:sticky xl:top-24')}>
      {children}
    </div>
  );
}

export function Properties({ children }) {
  return (
    <div className='my-6'>
      <ul
        role='list'
        className='m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5'>
        {children}
      </ul>
    </div>
  );
}

export function Property({ name, type, children }) {
  return (
    <li className='m-0 px-0 py-4 first:pt-0 last:pb-0'>
      <dl className='m-0 flex flex-wrap items-center gap-x-3 gap-y-2'>
        <dt className='sr-only'>Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        <dt className='sr-only'>Type</dt>
        <dd className='font-mono text-xs text-zinc-400 dark:text-zinc-500'>{type}</dd>
        <dt className='sr-only'>Description</dt>
        <dd className='w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0'>{children}</dd>
      </dl>
    </li>
  );
}
