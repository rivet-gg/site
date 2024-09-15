import { H1, Text } from '@rivet-gg/components';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

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

      <div className='my-8 flex flex-wrap gap-4'>
        <EngineCard href='/docs/godot'>Godot</EngineCard>
        <EngineCard href='/docs/unity'>Unity</EngineCard>
        <EngineCard href='/docs/unreal'>Unreal Engine</EngineCard>
        <EngineCard href='/docs/html5'>HTML5</EngineCard>
      </div>

      <Link href='/docs/custom'>
        <Text>You can also integrate Rivet into your own custom engine, read more about it here.</Text>
      </Link>
    </div>
  );
}
