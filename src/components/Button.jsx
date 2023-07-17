import Link from 'next/link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ArrowIcon(props) {
  return (
    <svg viewBox='0 0 20 20' fill='none' aria-hidden='true' {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9'
      />
    </svg>
  );
}

const variantStyles = {
  primary:
    'rounded-full bg-violet-500 py-1 px-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400',
  secondary:
    'rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300',
  filled:
    'rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-violet-500 dark:text-white dark:hover:bg-violet-400',
  outline:
    'rounded-full py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
  text: 'text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-500'
};

export function ButtonGroup({ children }) {
  return <div className='not-prose mb-16 mt-6 flex gap-3'>{children}</div>;
}

export function Button({ variant = 'primary', className, children, arrow, icon, ...props }) {
  let Component = props.href ? Link : 'button';

  className = clsx(
    'inline-flex items-center justify-center gap-0.5 overflow-hidden text-sm font-semibold transition',
    variantStyles[variant],
    className
  );

  let arrowIcon = (
    <ArrowIcon
      className={clsx(
        'h-5 w-5',
        variant === 'text' && 'relative top-px',
        arrow === 'left' && '-ml-1 rotate-180',
        arrow === 'right' && '-mr-1'
      )}
    />
  );

  return (
    <Component className={className} {...props}>
      {icon ? <FontAwesomeIcon icon={icon} className='-ml-1 h-5 w-5' /> : null}
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </Component>
  );
}
