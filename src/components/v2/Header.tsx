import Link from 'next/link';
import Image from 'next/image';
import logoUrl from '@/images/rivet-logos/icon-text-white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBooks, faNewspaper, faPuzzle } from '@fortawesome/pro-solid-svg-icons';
import { faCoin } from '@fortawesome/pro-regular-svg-icons';
import { Header as RivetHeader } from '@rivet-gg/components/header';
import { ReactNode } from 'react';
import { DocsMobileNavigation } from '@/components/DocsMobileNavigation';

interface HeaderProps {
  active: 'docs' | 'modules' | 'blog' | 'pricing';
  subnav?: ReactNode;
  mobileBreadcrumbs?: ReactNode;
}

export function Header({ active, subnav }: HeaderProps) {
  return (
    <RivetHeader
      logo={
        <Link href='/'>
          <Image {...logoUrl} className='w-20' alt='Rivet logo' />
        </Link>
      }
      subnav={subnav}
      support={
        <RivetHeader.NavItem asChild>
          <Link href='/support'>Support</Link>
        </RivetHeader.NavItem>
      }
      mobileBreadcrumbs={<DocsMobileNavigation />}
      breadcrumbs={
        <div className='flex items-center gap-5'>
          <RivetHeader.NavItem asChild className='flex items-center gap-1 py-2'>
            <Link href='/docs' aria-current={active === 'docs' ? 'page' : undefined}>
              <FontAwesomeIcon icon={faBooks} />
              Docs
            </Link>
          </RivetHeader.NavItem>
          <RivetHeader.NavItem asChild className='flex items-center gap-1'>
            <Link href='/modules' aria-current={active === 'modules' ? 'page' : undefined}>
              <FontAwesomeIcon icon={faPuzzle} />
              Modules
            </Link>
          </RivetHeader.NavItem>
          <RivetHeader.NavItem asChild className='flex items-center gap-1'>
            <Link href='/blog' aria-current={active === 'blog' ? 'page' : undefined}>
              <FontAwesomeIcon icon={faNewspaper} />
              Blog
            </Link>
          </RivetHeader.NavItem>
          <RivetHeader.NavItem asChild className='flex items-center gap-1'>
            <Link href='/pricing' aria-current={active === 'pricing' ? 'page' : undefined}>
              <FontAwesomeIcon icon={faCoin} />
              Pricing
            </Link>
          </RivetHeader.NavItem>
        </div>
      }
    />
  );
}
