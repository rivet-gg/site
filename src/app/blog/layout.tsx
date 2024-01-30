import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className='relative px-4 pt-14 sm:px-6 lg:px-8 xl:px-0'>
        <div className='mx-auto flex w-full max-w-screen-xl flex-col-reverse lg:flex-row'>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
