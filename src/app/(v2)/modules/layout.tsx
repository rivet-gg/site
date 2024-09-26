import { EmbedDetector } from '@/components/EmbedDetector';
import { Header } from '@/components/v2/Header';
import { Suspense } from 'react';

export default function Layout({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <EmbedDetector />
      </Suspense>
      <Header active='modules' />
      <main className='mx-auto max-w-6xl px-8'>{children}</main>
    </>
  );
}
