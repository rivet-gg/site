import Link from 'next/link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import grainDark from '@/images/effects/grain-dark.png';
import grainLight from '@/images/effects/grain-light.png';

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
  text: { base: 'text-sm text-orange-500 hover:text-orange-600', highlight: '' },
  'text-subtle': { base: 'text-sm text-charcole-400 hover:text-charcole-300', highlight: '' },
  juicy: {
    base: clsx(
      'font-sm text-semibold',
      'border-2 border-cream-100',
      'px-3.5 py-2.5',
      'text-cream-100',
      'hover:text-charcole-950',
      'aria-selected:text-charcole-950'
    )
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

  let useGrain = variant == 'juicy';

  return (
    <Component aria-selected={highlight} className={className} {...props}>
      {useGrain ? (
        <>
          <div
            style={{ backgroundImage: `url(${grainDark.src})`, zIndex: -2 }}
            className='pointer-events-none absolute inset-0 bg-repeat transition'></div>
          <div
            style={{ backgroundImage: `url(${grainLight.src})`, zIndex: -1, opacity: highlight ? 1 : 0 }}
            className='pointer-events-none absolute inset-0 bg-repeat transition'></div>
        </>
      ) : null}
      {icon ? <FontAwesomeIcon icon={icon} className='-ml-1 h-5 w-5' /> : null}
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </Component>
  );
}
