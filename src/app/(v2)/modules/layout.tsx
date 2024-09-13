import { Toaster } from '@rivet-gg/components';

export default function Layout({ children }) {
  return (
    <main className=' mx-auto max-w-6xl'>
      {children}

      <Toaster />
    </main>
  );
}
