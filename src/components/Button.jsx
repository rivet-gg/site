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
    'rounded-full bg-cream-100 py-1 px-3 text-sm text-charcole-900 hover:bg-cream-200 dark:bg-charcole-800/40 dark:text-cream-400 dark:ring-1 dark:ring-inset dark:ring-charcole-800 dark:hover:bg-charcole-800 dark:hover:text-cream-300',
  filled:
    'rounded-full bg-charcole-950 py-1 px-3 text-sm text-white hover:bg-charcole-700 dark:bg-violet-500 dark:text-white dark:hover:bg-violet-400',
  outline:
    'rounded-full py-1 px-3 text-sm text-charcole-700 ring-1 ring-inset ring-charcole-900/10 hover:bg-charcole-950/2.5 hover:text-charcole-900 dark:text-cream-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
  text: 'text-sm text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-500',
  juicy: clsx(
    'button rounded-lgbg-violet-500 select-none, box-border cursor-pointer rounded-lg border-violet-400 bg-violet-500',
    'px-3.5 py-2.5',
    'text-sm font-semibold text-white',
    'transition-all duration-150 ',
    'border-b-[1px] active:border-b-[0px]',
    'mb-[0px] active:mb-[1px]',
    '[box-shadow:0_4px_0_0_#7c3aed] hover:[box-shadow:0_5px_0_0_#7c3aed] active:[box-shadow:0_0px_0_0_#7c3aed]',
    'hover:translate-y-[-1px] active:translate-y-[4px]'
  )
};

export function ButtonGroup({ children }) {
  return <div className='not-prose mb-16 mt-6 flex gap-3'>{children}</div>;
}

export function Button({ variant = 'primary', className, children, arrow, icon, ...props }) {
  let Component = props.href ? Link : 'button';

  className = clsx(
    'inline-flex items-center justify-center gap-0.5 overflow-hidden font-semibold transition',
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
