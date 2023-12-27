import clsx from 'clsx';
import Link from 'next/link';
import { HeroPattern } from '@/components/HeroPattern';
import engineStyles from '../../lib/engineStyles.json';
import { PatternButton } from '@/components/PatternButton';

let supportedEngines = [
  {
    id: 'godot',
    name: 'Godot',
    href: '/learn/godot/tutorials/crash-course',
    join: <span>,&nbsp;</span>
  },
  {
    id: 'unity',
    name: 'Unity',
    href: '/learn/unity/tutorials/fishnet/crash-course',
    join: <span>,&nbsp;</span>
  },
  {
    id: 'unreal',
    name: 'Unreal Engine',
    href: '/learn/unreal/tutorials/crash-course',
    join: <span>,&nbsp;</span>
  },
  {
    id: 'html5',
    name: 'HTML5',
    href: '/learn/html5/tutorials/crash-course',
    join: <span>,&nbsp;and&nbsp;</span>
  },
  {
    id: 'custom',
    name: 'Custom',
    href: '/learn/custom',
    join: null
  }
];

export default function LearnIndex() {
  return (
    <>
      <HeroPattern />

      <div className='flex h-[calc(100vh-180px)] flex-col items-stretch justify-center'>
        <div className='text-center font-display text-5xl text-white font-bold'>Pick Your Engine</div>
        <div className='mt-14 grid grid-cols-6 gap-4'>
          {supportedEngines.map((engine, i) => (
            <GameEngine key={engine.name} engine={engine} long={i >= 3} />
          ))}
        </div>
      </div>
    </>
  );
}

function GameEngine({ engine, long } = { long: false }) {
  return (
    <PatternButton
      href={engine.href}
      pattern={{ color: engineStyles[engine.id].patternColor }}
      className={clsx(
        'group relative flex items-center justify-center',
        'h-[175px]',
        long ? 'col-span-3' : 'col-span-2'
      )}>
      <span className={clsx(clsx(
          'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center',
          'font-display text-3xl',
          'text-white',
          'drop-shadow-[0_0_10px_rgba(24,24,27,0.5)]'
        ))}>{engine.name}</span>
    </PatternButton>
  );
}
