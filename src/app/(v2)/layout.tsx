import { Footer } from '@/components/Footer';
import { Toaster } from '@rivet-gg/components';
import '@/styles/v2.css';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster />
      <Footer />
    </>
  );
}
