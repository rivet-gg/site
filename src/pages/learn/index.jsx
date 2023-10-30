import clsx from 'clsx';
import Link from 'next/link';
import { HeroPattern } from '@/components/HeroPattern';
import { engineStyles } from '../../lib/engineStyles';

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

      <div className='h-[calc(100vh-180px)] flex flex-col items-stretch justify-center'>
        <div className='text-center font-display text-2xl text-white'>Pick Your Engine</div>
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
  let textClasses = clsx('absolute inset-0 flex items-center justify-center text-center', 'font-display text-3xl');
  return (
    <Link
      href={engine.href}
      className={clsx(
        'group relative flex items-center justify-center rounded-lg bg-zinc-800',
        'border-1 border border-white/10',
        'transition',
        'opacity-50 hover:scale-[102%] hover:border-white/20 hover:opacity-100 hover:shadow-xl',
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
    </Link>
  );
}
