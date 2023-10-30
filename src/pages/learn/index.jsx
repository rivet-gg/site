import clsx from 'clsx';
import Link from 'next/link';
import { HeroPattern } from '@/components/HeroPattern';
import { engineStyles } from '../../lib/engineStyles';
import { PatternButton } from '@/components/PatternButton';

let supportedEngines = [
  {
    name: 'Unity',
    href: '/learn/unity',
    gradient: engineStyles.unity.gradient,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'Unreal Engine',
    href: '/learn/unreal',
    gradient: engineStyles.unreal.gradient,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'Godot',
    href: '/learn/godot',
    gradient: engineStyles.godot.gradient,
    join: <span>,&nbsp;</span>
  },
  {
    name: 'HTML5',
    href: '/learn/html5',
    gradient: engineStyles.html5.gradient,
    join: <span>,&nbsp;and&nbsp;</span>
  },
  {
    name: 'Custom',
    href: '/learn/custom',
    gradient: engineStyles.custom.gradient,
    join: null
  }
];

export default function LearnIndex() {
  return (
    <>
      <HeroPattern />

      {/* <ResourceGroup title={null}>
        <Resource title='Unity' icon={faBooks} href='/learn/unity/tutorials/crash-course' />
        <Resource title='Unreal Engine' icon={faBooks} href='/learn/unreal/tutorials/crash-course' />
        <Resource title='Godot' icon={faBooks} href='/learn/godot/tutorials/crash-course' />
        <Resource title='HTML5' icon={faBooks} href='/learn/html5/tutorials/crash-course' />
        <Resource title='Custom' icon={faBooks} href='/learn/custom/tutorials/crash-course' />
      </ResourceGroup> */}

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
    'absolute inset-0 flex items-center justify-center text-center',
    'font-display text-3xl',
    'drop-shadow-[0_0_10px_rgba(24,24,27,0.8)]'
  );
  return (
    <PatternButton
      href={engine.href}
      className={clsx(
        'group relative flex items-center justify-center rounded-lg',
        'h-[150px]',
        long ? 'col-span-3' : 'col-span-2'
      )}>
      <span className={clsx(textClasses, 'text-white')}>{engine.name}</span>
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
