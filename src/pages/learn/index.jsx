import clsx from 'clsx';
import Link from 'next/link';
import { HeroPattern } from '@/components/HeroPattern';
import engineStyles from '../../lib/engineStyles.json';
import { PatternButton } from '@/components/PatternButton';

let supportedEngines = [
  {
    id: 'godot',
    name: 'Godot',
    href: '/learn/godot/tutorials/crash-course'
  },
  {
    id: 'unity',
    name: 'Unity',
    href: '/learn/unity/tutorials/fishnet/crash-course'
  },
  {
    id: 'unreal',
    name: 'Unreal Engine',
    href: '/learn/unreal/tutorials/crash-course'
  },
  {
    id: 'html5',
    name: 'HTML5',
    href: '/learn/html5/tutorials/crash-course'
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
      <div className='mx-auto flex h-[calc(100vh-180px)] max-w-6xl flex-col items-stretch justify-center'>
        <div className='text-center font-display text-5xl font-bold text-cream-100'>Pick Your Engine</div>
        <div className='mt-14 flex flex-row flex-wrap justify-center gap-4'>
          {supportedEngines.map((engine, i) => (
            <GameEngine key={engine.name} engine={engine} long={i < 3} />
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
        'w-[200px] h-[100px] md:w-[350px] md:h-[175px]',
        long ? 'col-span-2' : 'col-span-1'
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
    </PatternButton>
  );
}

LearnIndex.fullWidth = true;
