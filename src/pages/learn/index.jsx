import clsx from 'clsx';
import Link from 'next/link';
import { HeroPattern } from '@/components/HeroPattern';
import engineStyles from '../../lib/engineStyles.json';
import { PatternButton } from '@/components/PatternButton';

let supportedEngines = [
  {
    id: 'godot',
    name: 'Godot',
    href: '/learn/godot'
  },
  {
    id: 'unity',
    name: 'Unity',
    href: '/learn/unity',
    status: 'alpha'
  },
  {
    id: 'unreal',
    name: 'Unreal Engine',
    href: '/learn/unreal',
    status: 'beta'
  },
  {
    id: 'html5',
    name: 'HTML5',
    href: '/learn/html5'
  },
  {
    id: 'custom',
    name: 'Custom',
    href: '/learn/custom'
  }
];

export default function LearnIndex() {
  return (
    <>
      <div className='mx-auto flex h-[calc(100vh-180px)] max-w-5xl flex-col items-stretch justify-center'>
        <div className='text-center font-display text-5xl font-bold text-white'>Pick Your Engine</div>
        <div className='mt-14 grid grid-cols-6 gap-4'>
          {supportedEngines.map((engine, i) => (
            <GameEngine key={engine.name} engine={engine} status={engine.status} long={i >= 3} />
          ))}
        </div>
      </div>
    </>
  );
}

const StatusBadge = ({ status }) => {
  if (!status) {
    return;
  }

  return (
    <div
      className={clsx(
        'absolute right-2 top-2 border border-solid bg-cream-100 px-1.5 py-1 text-xs font-bold lowercase leading-none text-charcole-900'
      )}>
      {status}
    </div>
  );
};

function GameEngine({ engine, long, status } = { long: false }) {
  return (
    <PatternButton
      href={engine.href}
      pattern={{ color: engineStyles[engine.id].patternColor }}
      className={clsx(
        'group relative flex items-center justify-center',
        'h-[175px]',
        long ? 'col-span-3' : 'col-span-2'
      )}>
      <span
        className={clsx(
          clsx(
            'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center text-center',
            'font-display text-3xl',
            'text-white',
            'drop-shadow-[0_0_10px_rgba(24,24,27,0.5)]'
          )
        )}>
        {engine.name}
      </span>
      <StatusBadge status={status} />
    </PatternButton>
  );
}
