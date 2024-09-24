import { H1, Text } from '@rivet-gg/components';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Docs - Rivet',
  description: "Build your game's backend with open-source modules."
};

function EngineCard({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      className='hover:bg-card hover:border-primary text-nowrap rounded-md border px-10 py-5 text-2xl transition-colors'>
      {children}
    </Link>
  );
}

export default function DocsPage() {
  return (
    <div className='col-span-3 flex min-h-screen w-full flex-col items-center justify-center px-8 py-10'>
      <H1 className='text-center'>Choose your engine</H1>

      <div className='my-8 grid grid-cols-2 flex-wrap gap-4 text-center lg:grid-cols-4'>
        <EngineCard href='/docs/godot'>Godot</EngineCard>
        <EngineCard href='/docs/unity'>Unity</EngineCard>
        <EngineCard href='/docs/unreal'>Unreal Engine</EngineCard>
        <EngineCard href='/docs/html5'>HTML5</EngineCard>
      </div>

      <Link href='/docs/custom'>
        <Text>
          You can also integrate Rivet into your own custom engine,{' '}
          <span className='underline'>read more about it here.</span>
        </Text>
      </Link>
    </div>
  );
}
