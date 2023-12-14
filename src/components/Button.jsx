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
  primary: clsx(
    'text-charcole-950 text-sm font-semibold',
    'bg-cream-100',
    'px-3 py-1',
  ),
  secondary: clsx(
    'text-cream-100 text-sm font-semibold',
    'border-2 border-cream-100',
    'px-3 py-1',
  ),
  text: 'text-sm text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500',
  juicy: clsx(
    'text-cream-100 font-sm text-semibold',
    'border-2 border-cream-100',
    'bg-transparent hover:bg-cream-100 hover:text-charcole-950',
    'px-3.5 py-2.5',
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
