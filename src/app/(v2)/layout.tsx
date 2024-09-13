import { Header } from '@rivet-gg/components/header';
import { Footer } from '@/components/Footer';
import '@/styles/v2.css';
import Link from 'next/link';
import Image from 'next/image';
import logoUrl from '@/images/rivet-logos/icon-white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBooks, faNewspaper, faPuzzle } from '@fortawesome/pro-solid-svg-icons';
import { faCoin } from '@fortawesome/pro-regular-svg-icons';

export default function Layout({ children }) {
  return (
    <>
      <Header
        logo={
          <Link href='/'>
            <Image {...logoUrl} className='h-6' alt='OpenGB Logo' />
          </Link>
        }
        breadcrumbs={
          <div className='flex items-center gap-4'>
            <Header.NavItem asChild className='flex items-center gap-1'>
              <Link href='/docs'>
                <FontAwesomeIcon icon={faBooks} />
                Docs
              </Link>
            </Header.NavItem>
            <Header.NavItem asChild className='flex items-center gap-1'>
              <Link href='/modules' data-active>
                <FontAwesomeIcon icon={faPuzzle} />
                Modules
              </Link>
            </Header.NavItem>
            <Header.NavItem asChild className='flex items-center gap-1'>
              <Link href='/blog'>
                <FontAwesomeIcon icon={faNewspaper} />
                Blog
              </Link>
            </Header.NavItem>
            <Header.NavItem asChild className='flex items-center gap-1'>
              <Link href='/pricing'>
                <FontAwesomeIcon icon={faCoin} />
                Pricing
              </Link>
            </Header.NavItem>
          </div>
        }
      />
      {children}
      <Footer />
    </>
  );
}
