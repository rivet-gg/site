import { EmbedDetector } from '@/components/EmbedDetector';
import { Header } from '@/components/v2/Header';

export default function Layout({ children }) {
  return (
    <>
      <EmbedDetector />
      <Header active='modules' />
      <main className='mx-auto max-w-6xl px-8'>{children}</main>
    </>
  );
}
