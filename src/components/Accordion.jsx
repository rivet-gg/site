import { clsx } from 'clsx';
import React, { ReactNode, useState } from 'react';

function getAccordionStyleFromVariant(variant) {
  if (variant === 'minimalist') {
    // Minimal padding. Shows a border along the left when open.
    return {
      parentClass: '',
      coverClass:
        '[&>div]:ml-2 py-1 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200',
      contentClass: 'mt-2 pt-1 mb-4 mx-[7px] px-4 border-l border-zinc-100 dark:border-zinc-800'
    };
  }

  // Rounding is handled in Accordion by passing in isRounded to AccordionCover.
  return {
    parentClass: 'border dark:border-zinc-800 rounded-xl mb-3 overflow-hidden',
    coverClass: 'py-4 px-5 space-x-2 hover:bg-slate-100 hover:dark:bg-slate-800 rounded-t-xl',
    contentClass: 'mt-2 mb-4 mx-6'
  };
}

export function Accordion({
  title,
  description,
  defaultOpen = false,
  icon,
  onChange,
  variant = 'rounded',
  children
}) {
  const [open, setOpen] = useState(defaultOpen);

  const onClickOpen = open => {
    setOpen(open);
    if (onChange) {
      onChange(open);
    }
  };

  const { parentClass, coverClass, contentClass } = getAccordionStyleFromVariant(variant);

  return (
    <div key={title} role='listitem' className={parentClass}>
      <AccordionCover
        title={title}
        description={description}
        open={open}
        setOpen={onClickOpen}
        icon={icon}
        coverClass={coverClass}
      />
      <div className={clsx(contentClass, !open && 'hidden')}>{children}</div>
    </div>
  );
}

export function AccordionGroup({ children }) {
  // [&>div] modifies the Accordion's borders to only show divider borders.
  // We use border-0 instead of border-none because border-none turns off divide-y.
  // [&>div>button] modifies the button to not round the highlighted part
  // when inside of an Accordion group.
  return (
    <div
      className='prose-slate dark:prose-dark prose mb-3 mt-0 divide-y divide-inherit overflow-hidden rounded-xl border dark:border-zinc-800 [&>div>button]:rounded-none [&>div]:mb-0 [&>div]:rounded-none [&>div]:border-0'
      role='list'>
      {children}
    </div>
  );
}

function AccordionCover({ title, description, open, setOpen, icon, coverClass }) {
  // In rounded style, we round the button itself so when a web browser in keyboard navigation mode
  // highlights the button the highlight will follow the corners.
  return (
    <button
      onClick={() => setOpen(!open)}
      className={clsx('not-prose flex w-full flex-row content-center items-center', coverClass)}
      aria-controls={title + 'Children'}
      aria-expanded={open}>
      <div className='mr-0.5'>
        <ExpandableItemCoverIcon open={open} />
      </div>
      {icon ? (
        <div className='h-4 w-4 fill-slate-800 text-slate-800 dark:fill-slate-100 dark:text-slate-100'>
          {icon}
        </div>
      ) : null}
      <div className='text-left leading-tight'>
        <p className='m-0 font-medium text-slate-900 dark:text-slate-200'>{title}</p>
        {description ? <p className='m-0 text-slate-900 dark:text-slate-200'>{description}</p> : null}
      </div>
    </button>
  );
}

function ExpandableCover({ title, description, open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={`not-prose mt-1.5 flex w-full flex-row content-center items-center py-1 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 ${
        !open ? 'rounded-b-xl' : ''
      }`}
      aria-controls={title + 'Children'}
      aria-expanded={open}>
      <ExpandableItemCoverIcon open={open} />
      <div className='ml-2 text-left leading-tight'>
        <p className='m-0'>
          {open ? 'Hide' : 'Show'} {title}
        </p>
        {description ? <p className='m-0'>{description}</p> : null}
      </div>
    </button>
  );
}

function ExpandableItemCoverIcon({ open }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={clsx('h-3 w-3 transition', open && '-mt-1 rotate-90 duration-200', !open && 'duration-75')}
      viewBox='0 0 256 512'
      fill='currentColor'>
      <path d='M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z' />
    </svg>
  );
}
