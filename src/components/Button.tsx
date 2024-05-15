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

const variantClasses = {
  primary: {
    base: clsx('text-sm font-semibold text-charcole-950', 'bg-cream-100', 'px-3 py-1'),
    highlight: ''
  },
  secondary: {
    base: clsx(
      'text-sm font-semibold text-cream-100',
      'border-2 border-cream-100',
      'bg-transparent hover:bg-cream-100 hover:text-charcole-950',
      'px-3 py-1'
    ),
    highlight: ''
  },
  text: { base: 'text-sm text-orange-300 hover:text-orange-500', highlight: '' },
  'text-subtle': { base: 'text-sm text-charcole-400 hover:text-charcole-300', highlight: '' },
  juicy: {
    base: clsx([
      'px-4 py-2 text-sm',
      'm min-w-30 aria-busy:cursor-default group inline-flex items-center gap-2 align-middle font-bold transition-all duration-100 will-change-transform disabled:opacity-60',
      'relative border-2 border-cream-100 text-cream-100 transition-all',
      "before:absolute before:inset-0 before:-z-10 before:opacity-0 before:bg-blend-multiply before:transition-all before:content-['']",
      "after:absolute after:inset-0 after:-z-10 after:opacity-100 after:transition-all after:content-['']",
      // hover
      'hover:border-orange-400',
      // selected
      'aria-selected:border-orange-400 aria-selected:text-cream-100 aria-selected:before:border-orange-400',
      // disabled
      'disabled:border-cream-100 disabled:hover:bg-transparent disabled:hover:text-cream-100',
      'disabled:hover:before:opacity-0 disabled:hover:after:opacity-100',
      // loading
      'aria-busy:border-neutral-300 aria-busy:hover:bg-transparent aria-busy:translate-y-0 aria-busy:hover:text-white'
    ]),
    normal: 'text-cream-100',
    highlight: 'text-charcole-950'
  },
  primaryJuicy: {
    base: clsx([
      'px-4 py-2 text-sm',
      'm min-w-30 aria-busy:cursor-default group inline-flex items-center gap-2 align-middle font-bold transition-all duration-100 will-change-transform disabled:opacity-60',
      'relative border-2 border-cream-100 transition-all',
      'bg-cream-100 before:bg-cream-100 after:bg-cream-100',
      // make it white
      'bg-cream-100 text-charcole-950 before:bg-cream-100',
      'before:opacity-100 after:opacity-0',
      // hover
      'hover:bg-cream-100 hover:text-charcole-950 hover:before:bg-cream-100',
      'hover:before:opacity-100 hover:after:opacity-0',
      // selected
      'aria-selected:bg-cream-100 aria-selected:text-charcole-950 aria-selected:before:bg-cream-100',
      'aria-selected:before:opacity-100 aria-selected:after:opacity-0',
      // active
      'active:bg-cream-50 aria-selected:bg-cream-50',
      // disabled
      'disabled:border-cream-100 disabled:hover:bg-transparent disabled:hover:text-cream-100',
      'disabled:hover:before:opacity-0 disabled:hover:after:opacity-100',
      // loading
      'aria-busy:border-neutral-300 aria-busy:hover:bg-transparent aria-busy:translate-y-0 aria-busy:hover:text-white'
    ]),
    normal: 'text-cream-100',
    highlight: 'text-charcole-950'
  },
  blackJuicy: {
    base: clsx(
      'font-sm text-semibold text-black',
      'border-2 border-black',
      'bg-transparent hover:bg-black hover:text-cream-100',
      'px-3.5 py-2.5'
    ),
    highlight: ''
  }
};

export function ButtonGroup({ children }) {
  return <div className='not-prose mb-16 mt-6 flex gap-3'>{children}</div>;
}

interface CommonButtonProps {
  variant?: keyof typeof variantClasses;
  highlight?: boolean;
  styles?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  arrow?: 'left' | 'right';
  icon?: any;
}

interface AnchorButtonProps extends CommonButtonProps {
  href: string;
  target?: string;
  rel?: string;
}

interface ButtonButtonProps extends CommonButtonProps {
  href: never;
}

type ButtonProps = AnchorButtonProps | ButtonButtonProps;

export function Button({
  variant = 'primary',
  highlight = false,
  styles,
  className,
  children,
  arrow,
  icon,
  ...props
}: ButtonProps) {
  let Component = 'href' in props && props.href ? Link : 'button';
  className = clsx(
    'relative inline-flex items-center justify-center gap-0.5 overflow-hidden font-semibold transition',
    variantClasses[variant].base,
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
    <Component aria-selected={highlight} className={className} {...props}>
      {icon ? <FontAwesomeIcon icon={icon} className='-ml-1 h-5 w-5' /> : null}
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </Component>
  );
}
