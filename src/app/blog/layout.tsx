import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className='relative pt-14'>
        <div className='main-content-container flex w-full flex-col-reverse px-6 lg:flex-row'>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
