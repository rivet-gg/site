import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
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
    base: clsx(
      'text-charcole-950 text-sm font-semibold',
      'bg-cream-100',
      'px-3 py-1',
    ),
  },
  secondary: {
    base: clsx(
      'text-cream-100 text-sm font-semibold',
      'border-2 border-cream-100',
      'bg-transparent hover:bg-cream-100 hover:text-charcole-950',
      'px-3 py-1',
    ),
  },
  text: { base: 'text-sm text-orange-500 hover:text-orange-600' },
  'text-subtle': { base: 'text-sm text-charcole-400 hover:text-charcole-300' },
  juicy: {
    base: clsx(
      'font-sm text-semibold',
      'border-2 border-cream-100',
      'px-3.5 py-2.5',
    ),
    normal: 'text-cream-100',
    highlight: 'text-charcole-950',
  },
  blackJuicy: {
    base: clsx(
      'text-black font-sm text-semibold',
      'border-2 border-black',
      'bg-transparent hover:bg-black hover:text-cream-100',
      'px-3.5 py-2.5',
    )
  }
};

export function ButtonGroup({ children }) {
  return <div className='not-prose mb-16 mt-6 flex gap-3'>{children}</div>;
}

export function Button({ variant = 'primary', highlight = false, styles, className, children, arrow, icon, onMouseEnter, onMouseLeave, ...props }) {
  let Component = props.href ? Link : 'button';

  const [hover, setHover] = useState(false);

  highlight = highlight || hover;

  className = clsx(
    'relative inline-flex items-center justify-center gap-0.5 overflow-hidden font-semibold transition',
    variantClasses[variant].base,
    highlight ? variantClasses[variant].highlight : variantClasses[variant].normal,
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
    <Component
      className={className}
      onMouseEnter={ev => { setHover(true); if (onMouseEnter) { onMouseEnter(ev); } }}
      onMouseLeave={ev => { setHover(false); if (onMouseLeave) { onMouseLeave(ev); } }}
      {...props}>
      {useGrain ? (<>
        <div style={{ backgroundImage: `url(${grainDark.src})`, zIndex: -2 }} className='absolute inset-0 bg-repeat transition pointer-events-none'></div>
        <div style={{ backgroundImage: `url(${grainLight.src})`, zIndex: -1, opacity: highlight ? 1 : 0 }} className='absolute inset-0 bg-repeat transition pointer-events-none'></div>
      </>): null}
      {icon ? <FontAwesomeIcon icon={icon} className='-ml-1 h-5 w-5' /> : null}
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </Component>
  );
}
