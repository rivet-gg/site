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
