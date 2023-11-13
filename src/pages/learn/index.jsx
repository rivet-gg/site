import clsx from 'clsx';
import Link from 'next/link';
import { HeroPattern } from '@/components/HeroPattern';
import { engineStyles } from '../../lib/engineStyles';
import { PatternButton } from '@/components/PatternButton';

let supportedEngines = [
  {
    name: 'Unreal Engine',
    href: '/learn/unreal/tutorials/crash-course',
    gradient: engineStyles.unreal.gradient,
    shadow: engineStyles.unreal.shadow,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'Unity',
    href: '/learn/unity/tutorials/fishnet/crash-course',
    gradient: engineStyles.unity.gradient,
    shadow: engineStyles.unity.shadow,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'Godot',
    href: '/learn/godot/tutorials/crash-course',
    gradient: engineStyles.godot.gradient,
    shadow: engineStyles.godot.shadow,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'HTML5',
    href: '/learn/html5/tutorials/crash-course',
    gradient: engineStyles.html5.gradient,
    shadow: engineStyles.html5.shadow,
    join: <span>,&nbsp;and&nbsp;</span>
  },
  {
    name: 'Custom',
    href: '/learn/custom',
    gradient: engineStyles.custom.gradient,
    shadow: engineStyles.custom.shadow,
    join: null
  }
];

export default function LearnIndex() {
  return (
    <>
      <HeroPattern />

      <div className='flex h-[calc(100vh-180px)] flex-col items-stretch justify-center'>
        <div className='text-center font-display text-3xl text-white'>Pick Your Engine</div>
        <div className='mt-10 grid grid-cols-6 gap-4'>
          {supportedEngines.map((engine, i) => (
            <GameEngine key={engine.name} engine={engine} long={i >= 3} />
          ))}
        </div>
      </div>
    </>
  );
}

function GameEngine({ engine, long } = { long: false }) {
  let textClasses = clsx(
    'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center',
    'font-display text-3xl',
    'drop-shadow-[0_0_10px_rgba(24,24,27,0.5)]'
  );
  return (
    <PatternButton
      href={engine.href}
      className={clsx(
        'group relative flex items-center justify-center rounded-lg',
        'h-[150px]',
        long ? 'col-span-3' : 'col-span-2'
      )}>
      <span className={clsx(textClasses, 'text-white opacity-100 hover:opacity-0')}>{engine.name}</span>
      <span
        className={clsx(
          textClasses,
          'opacity-0 transition group-hover:opacity-100',
          'bg-gradient-to-r bg-clip-text text-transparent',
          engine.gradient[0],
          engine.gradient[1]
        )}>
        {engine.name}
      </span>
    </PatternButton>
  );
}
